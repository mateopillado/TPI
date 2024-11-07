using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Services.Common;
using Microsoft.AspNetCore.Authorization;
using trackerBack.Services;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoordenadasController : ControllerBase
    {
        private readonly ICoordenadaService _service;

        public CoordenadasController(ICoordenadaService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.FindAsync(e => e.IdPersona == GetUserId()));
        }

        [HttpGet("{id}")]
        [Authorize]

        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var coordenada = await _service.GetByIdAsync(id);
                if(coordenada == null) { return NotFound(); }
                return Ok(coordenada);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> Post([FromBody] Coordenada coordenada)
        {
            try
            {
                coordenada.Fecha = DateTime.Now;
                coordenada.IdPersona = GetUserId();
                var res = await _service.CreateCoordenada(coordenada);
                return Ok( new {success = res });
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]

        public async Task<IActionResult> Put(int id, [FromBody] Coordenada coordenada)
        {
            try
            {
                await _service.UpdateAsync(id, coordenada);
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
        private int GetUserId()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;

            return int.Parse(userId);
        }
    }
}
