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
    public interface IPersonaService : IGenericService<Persona>
    {
        Task<string> Login(LoginDto data);Task<RegisterResult> Register(RegisterDto register);
    }
    public class PersonaService : GenericService<Persona>, IPersonaService
    {
        private readonly IPersonaRepository _personaRepository;
        public PersonaService(IPersonaRepository personaRepository) : base(personaRepository)
        {
            _personaRepository = personaRepository; 
        }

        public async Task<string> Login(LoginDto data)
        {
           return await _personaRepository.Login(data); 
        }
        public async Task<RegisterResult> Register(RegisterDto register)
        {
            return await _personaRepository.Register(register);
        }
    }
}
