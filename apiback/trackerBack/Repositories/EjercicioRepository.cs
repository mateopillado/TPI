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
    public interface IEjercicioRepository : IGenericRepository<Ejercicio>
    {
        Task<EjercicioDto> GetHistorialByEjercicio(int userId,int ejercicioId);
        Task<List<EjercicioHistorialDto>> GetRecordByEjercicio(int userId, int ejercicioId);
    }
    public class EjercicioRepository : GenericRepository<Ejercicio>, IEjercicioRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public EjercicioRepository(ApplicationDbContext context, IConfiguration configuration) : base(context)
        {
            _context = context;
            _configuration = configuration;
        }


        public async Task<List<EjercicioHistorialDto>> GetRecordByEjercicio(int userId, int ejercicioId)
        {
            var historial = await _context.Entrenamientos
                .Where(e => e.IdPersona == userId)
                .SelectMany(e => e.EjerciciosEntrenamientos
                    .Where(ee => ee.IdEjercicio == ejercicioId) // Filtrar por ejercicioId
                    .Select(ee => new EjercicioHistorialDto
                    {
                        CantidadSeries = ee.Series.Count(),
                        Nombre = ee.IdEjercicioNavigation.Nombre,
                        Kilos = ee.Series.OrderByDescending(s => s.Kilo).Select(s => s.Kilo).FirstOrDefault(),
                        Repeticiones = ee.Series.OrderByDescending(s => s.Kilo).Select(s => s.Repeticion).FirstOrDefault()
                    })
                )
                .ToListAsync();

            return historial;
        }
        public async Task<EjercicioDto> GetHistorialByEjercicio(int userId, int ejercicioId)
        {
            var historial = await _context.EjerciciosEntrenamientos
     .Where(ee => ee.IdEjercicio == ejercicioId && ee.IdEntrenamientoNavigation.IdPersona == userId)
     .Select(ee => new HistorialEjercicioDto
     {
         Fecha = ee.IdEntrenamientoNavigation.Fecha,
         Descripcion = ee.IdEntrenamientoNavigation.Nombre,
         Series = ee.Series.Select(s => new SerieHistorialDto
         {
             Orden = s.Orden,
             Repeticiones = s.Repeticion,
             Kilos = s.Kilo,
             TipoSerie = s.IdTipoSerieNavigation.Tipo
         }).ToList()
     })
     .ToListAsync();

            // Creando el EjercicioDto con el ejercicio específico y su historial
            var ejercicioDto = new EjercicioDto
            {
                Ejercicio = await _context.Ejercicios.FindAsync(ejercicioId), // Cargar el ejercicio específico
                Historial = historial
            };
            return ejercicioDto;
        }
    }
}

