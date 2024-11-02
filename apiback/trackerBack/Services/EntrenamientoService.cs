using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using trackerBack.Dtos;
using trackerBack.Models;
using trackerBack.Repositories;
using trackerBack.Repositories.Common;
using trackerBack.Services.Common;

namespace trackerBack.Services
{
    public interface IEntrenamientoService : IGenericService<Entrenamiento>
    {
        Task<List<EntrenamientoHistorialDto>> GetEntrenamientosHistorial(int userId);
        Task<Entrenamiento> GetById(int id);
    }
    public class EntrenamientoService : GenericService<Entrenamiento>, IEntrenamientoService
    {
        private readonly IEntrenamientoRepository _entrenamientoRepository;
        public EntrenamientoService(IEntrenamientoRepository entrenamientoRepository) : base(entrenamientoRepository)
        {
            _entrenamientoRepository = entrenamientoRepository; 
        }

        public async Task<Entrenamiento> GetById(int id)
        {
            return await _entrenamientoRepository.GetById(id);
        }

        public async Task<List<EntrenamientoHistorialDto>> GetEntrenamientosHistorial(int userId)
        {
           return await _entrenamientoRepository.GetEntrenamientoHistorial(userId);
        }
    }
}
