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
    public interface ICoordenadaRepository : IGenericRepository<Coordenada>
    {
        Task<bool> CreateCoordenada(Coordenada coor);
    }
    public class CoordenadaRepository : GenericRepository<Coordenada>, ICoordenadaRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public CoordenadaRepository(ApplicationDbContext context, IConfiguration configuration) : base(context)
        {
            _context = context;
            _configuration = configuration;
        }

       public async Task<bool> CreateCoordenada(Coordenada coor)
        {
            try
            {
                var coors = await FindAsync(e => e.IdPersona == coor.IdPersona);
                if (coors.Any())
                {
                    _context.RemoveRange(coors);

                }
                await AddAsync(coor);
                return true;
            }
            catch (Exception e)
            {

                return false;
            }
           
        }
    }
}

