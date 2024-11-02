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
    public interface IEntrenamientoRepository : IGenericRepository<Entrenamiento>
    {
        Task<List<EntrenamientoHistorialDto>> GetEntrenamientoHistorial(int usuarioId);
        Task<Entrenamiento> GetById(int id);
    }
    public class EntrenamientoRepository : GenericRepository<Entrenamiento>, IEntrenamientoRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public EntrenamientoRepository(ApplicationDbContext context, IConfiguration configuration) : base(context)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<Entrenamiento> GetById(int id)
        {
            return await _context.Entrenamientos
                 .Include(e => e.EjerciciosEntrenamientos) // Incluye los EjerciciosEntrenamientos
                     .ThenInclude(ee => ee.Series) // Incluye el Ejercicio asociado
                 .Include(e => e.EjerciciosEntrenamientos) // Incluye de nuevo para acceder a Series
                     .ThenInclude(ee => ee.IdEjercicioNavigation) // Incluye las Series de cada EjercicioEntrenamiento
                 .FirstOrDefaultAsync(e => e.Id == id); // Busca el Entrenamiento por ID

        }
        public async Task<List<EntrenamientoHistorialDto>> GetEntrenamientoHistorial(int usuarioId)
        {
            var historial = await _context.Entrenamientos
             .Where(e => e.IdPersona == usuarioId)
             .Select(e => new EntrenamientoHistorialDto
             {
                 Id = e.Id,
                 Fecha = e.Fecha,
                 Tonelaje = (int)e.EjerciciosEntrenamientos
                     .SelectMany(ee => ee.Series)
                     .Sum(s => (s.Kilo) * (s.Repeticion)), // Manejar nulos
                 Ejercicios = e.EjerciciosEntrenamientos
                     .Select(ee => new EjercicioHistorialDto
                     {
                         CantidadSeries = ee.Series.Count(),
                         Nombre = ee.IdEjercicioNavigation.Nombre, // Asumiendo que `Nombre` está en `Ejercicio`
                         Kilos = ee.Series.OrderByDescending(s => s.Kilo).Select(s => s.Kilo).FirstOrDefault(), // Cambiar a FirstOrDefault
                         Repeticiones = ee.Series.OrderByDescending(s => s.Kilo).Select(s => s.Repeticion).FirstOrDefault() // Cambiar a FirstOrDefault
                     })
                     .ToList()
             })
             .ToListAsync();

            return historial;
        }
    }
}

