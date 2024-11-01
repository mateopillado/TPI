using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;

using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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




    }
}
