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
    public interface ICoordenadaService : IGenericService<Coordenada>
    {
        Task<bool> CreateCoordenada(Coordenada coor);

    }
    public class CoordenadaService : GenericService<Coordenada>, ICoordenadaService
    {
        private readonly ICoordenadaRepository _CoordenadaRepository;
        public CoordenadaService(ICoordenadaRepository CoordenadaRepository) : base(CoordenadaRepository)
        {
            _CoordenadaRepository = CoordenadaRepository; 
        }

        public async Task<bool> CreateCoordenada(Coordenada coor)
        {
            return await _CoordenadaRepository.CreateCoordenada(coor);
        }
    }
}
