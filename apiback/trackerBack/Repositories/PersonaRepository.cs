using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;

using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using trackerBack.Data;
using trackerBack.Dtos;
using trackerBack.Models;
using trackerBack.Repositories;
using trackerBack.Repositories.Common;
using trackerBack.Utils;

namespace trackerBack.Repositories
{
    public interface IPersonaRepository : IGenericRepository<Persona>
    {
        Task<string> Login(LoginDto data);
        Task<RegisterResult> Register(RegisterDto data);
        Task<UsuarioLogeado> GetLoggedUser(int id);
    }
    public class PersonaRepository : GenericRepository<Persona>, IPersonaRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public PersonaRepository(ApplicationDbContext context, IConfiguration configuration) : base(context)
        {
            _context = context;
            _configuration = configuration;
        }
        private DateTime StartOfWeek(DateTime date, DayOfWeek startOfWeek)
        {
            int diff = (7 + (date.DayOfWeek - startOfWeek)) % 7;
            return date.AddDays(-1 * diff).Date;
        }
        public async Task<UsuarioLogeado> GetLoggedUser(int id)
        {
            var userLogged = new UsuarioLogeado();
            //var user = _context.Personas.Find(id);
            //userLogged.CantidadEntrenamientos = _context.Entrenamientos.Count(e => e.IdPersona == id);
            //userLogged.Id = id;
            //userLogged.Username = user.Nombre;

            var ahora = DateTime.Now;
            var inicioDeLaSemana = this.StartOfWeek(ahora,DayOfWeek.Monday);

            var entrenamientos =  _context.Entrenamientos
    .Where(e => e.IdPersona == id &&
                 e.Fecha >= DateTime.Now.AddDays(-35))
    .ToList();

            var entrenamientosPorSemana = entrenamientos
                .GroupBy(e => new
                {
                    SemanaDesde = StartOfWeek(e.Fecha, DayOfWeek.Monday),
                    SemanaHasta = StartOfWeek(e.Fecha, DayOfWeek.Monday).AddDays(6)
                })
                .Select(g => new EntrenamientoSemana
                {
                    Desde = g.Key.SemanaDesde,
                    Hasta = g.Key.SemanaHasta,
                    Cantidad = g.Count()
                })
                .ToList();

            var usuario = await _context.Personas
                .Where(u => u.Id == id)
                .Select(u => new { u.Username, CantidadEntrenamientos = u.Entrenamientos.Count() }) // Suponiendo que tienes una propiedad Entrenamientos en Usuario
                .FirstOrDefaultAsync();
            var musculos = await GetTrabajdoGrupoMuscular(id);

            return new UsuarioLogeado
            {
                Id = id,
                Username = usuario.Username,
                CantidadEntrenamientos = usuario.CantidadEntrenamientos,
                Entrenamientos = entrenamientosPorSemana,
                Musculos = musculos
            };

        }
       
          
        public async Task<string> Login(LoginDto data)
        {
            var user = await _context.Personas.FirstOrDefaultAsync(e => e.Username == data.Usuario);
            if (user == null)
            {
                throw new Exception("Nombre de usuario no existe");

            }
            if (!PasswordHelper.ValidatePassword(data.Contrasena, user.Contrasena))
            {
                throw new Exception("Contraseña incorrecta");

            }
            return GenerateJwtToken(data.Usuario, user.Id, _configuration);

        }
        public async Task<RegisterResult> Register(RegisterDto data)
        {
            try
            {
                var result = new RegisterResult();
                var existingPerson = _context.Personas
          .FirstOrDefault(e => e.Username == data.Username || e.Dni == data.Dni);

                if (existingPerson != null)
                {
                    result.Success = false;

                    if (existingPerson.Username == data.Username)
                    {
                        result.Errors.Add(new Errors { Message = "Usuario Existente" });
                    }

                    if (existingPerson.Dni == data.Dni)
                    {
                        result.Errors.Add(new Errors { Message = "Dni Existente" });
                    }
                }
                if (!result.Success)
                {
                    return result;
                }
                var newUser = new Persona
                {
                    Username = data.Username,
                    Dni = data.Dni,
                    FechaNacimiento = data.FechaNacimiento,
                    FechaRegistro = DateTime.Now,
                    Apellido = data.Apellido,
                    Nombre = data.Nombre,
                    Contrasena = PasswordHelper.HashPassword(data.Contrasena),
                    IdGenero = data.IdGenero,
                    IdRol = data.IdRol

                };
                _context.Add(newUser);
                await _context.SaveChangesAsync();
                return result;
            }
            catch (Exception e)
            {

                throw;
            }
            

        }
        
        private string GenerateJwtToken(string username, int userId, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("Jwt");

            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];

            var securityKey = new SymmetricSecurityKey(key);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var identificadorUnico = Guid.NewGuid().ToString();

            var claims = new[] {
        new Claim(JwtRegisteredClaimNames.Sub, username),
        new Claim("userId", userId.ToString()),  // Agrega el ID del usuario como un claim
        new Claim(JwtRegisteredClaimNames.Jti, identificadorUnico)
    };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(240),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<List<GrupoMuscularDto>> GetTrabajdoGrupoMuscular(int userId)
        {
            var totalEjercicios = await _context.EjerciciosEntrenamientos
    .Where(ee => ee.IdEntrenamientoNavigation.IdPersona == userId)
    .CountAsync();


            var resultado = await _context.EjerciciosEntrenamientos
                .Where(ee => ee.IdEntrenamientoNavigation.IdPersona == userId)
                .GroupBy(ee => ee.IdEjercicioNavigation.MusculosEjercicios
                                    .Select(me => me.IdMusculoNavigation.IdGrupoMuscularNavigation.Grupo) // Ajusta el nombre de la propiedad según tu modelo
                                    .FirstOrDefault())
                .Select(g => new
                {
                    GrupoMuscular = g.Key,
                    Cantidad = g.Count(),
                    Porcentaje = (g.Count() * 100.0) / totalEjercicios
                })
                .ToListAsync();
            return resultado.Select(m => new GrupoMuscularDto
            {
                GrupoMuscular = m.GrupoMuscular,
                Porcentaje = m.Porcentaje,
                Cant = m.Cantidad
            }).ToList();
        }

    }
}
