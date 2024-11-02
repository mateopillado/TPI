using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trackerBack.Dtos;
using trackerBack.Models;
using trackerBack.Services;
using trackerBack.Services.Common;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly IPersonaService _service;

        public PersonasController(IPersonaService service)
        {
            _service = service;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto data)
        {
            try
            {
                var token = await _service.Login(data);
                return Ok( new { token = token});
            }
            catch (Exception e)
            {
               Console.WriteLine(e.Message);
                throw new Exception(e.Message);
            }
        }
        [HttpPost("Registrar")]
        public async Task<IActionResult> Register([FromBody] RegisterDto data)
        {
            try
            {
                return Ok(await _service.Register(data));
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        [Authorize]

        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var persona = await _service.GetByIdAsync(id);

                if (persona == null) { return NotFound(); }
                return Ok(persona);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> Post([FromBody] Persona persona)
        {
            try
            {
                await _service.AddAsync(persona);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]

        public async Task<IActionResult> Put(int id, [FromBody] Persona persona)
        {
            try
            {
                await _service.UpdateAsync(id, persona);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]

        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        [HttpGet("UsuarioActual")]
        [Authorize]
        public async Task<IActionResult> GetUserInfo()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
            if (userId != null)
            {
                return Ok(await _service.GetLoggedUser(int.Parse(userId)));
            }

            return Unauthorized();
        }
    }
}
