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
    public interface IEjercicioService : IGenericService<Ejercicio>
    {
        Task<EjercicioDto> GetHistorialByEjercicio(int userId,int ejercicioId);

    }
    public class EjercicioService : GenericService<Ejercicio>, IEjercicioService
    {
        private readonly IEjercicioRepository _ejercicioRepository;
        public EjercicioService(IEjercicioRepository ejercicioRepository) : base(ejercicioRepository)
        {
            _ejercicioRepository = ejercicioRepository; 
        }

        public async Task<EjercicioDto> GetHistorialByEjercicio(int userId, int ejercicioId)
        {
            return await _ejercicioRepository.GetHistorialByEjercicio(userId, ejercicioId);
        }
    }
}
