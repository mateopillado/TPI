using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Repositories;
using trackerBack.Services;
using trackerBack.Services.Common;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntrenamientosController : ControllerBase
    {
        private readonly IEntrenamientoService _service;

        public EntrenamientosController(IEntrenamientoService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllAsync());
        }
        [HttpGet("Historial")]
        [Authorize]

        public async Task<IActionResult> GetHistorial()
        {
            return Ok(await _service.GetEntrenamientosHistorial(GetUserId()));
        }
        [HttpGet("{id}")]
        [Authorize]

        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var entrenamiento = await _service.GetById(id);

                if(entrenamiento == null) { return NotFound(); }
                return Ok(entrenamiento);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] Entrenamiento entrenamiento)
        {
            try
            {
                entrenamiento.IdPersona = GetUserId();
                await _service.AddAsync(entrenamiento);
                return Ok(new {success = true});
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]

        public async Task<IActionResult> Put(int id, [FromBody] Entrenamiento entrenamiento)
        {
            try
            {
                await _service.UpdateAsync(id, entrenamiento);
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
