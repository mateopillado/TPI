using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Services.Common;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntrenamientosController : ControllerBase
    {
        private readonly IGenericService<Entrenamiento> _service;

        public EntrenamientosController(IGenericService<Entrenamiento> service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var entrenamiento = await _service.GetByIdAsync(id);

                if(entrenamiento == null) { return NotFound(); }
                return Ok(entrenamiento);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Entrenamiento entrenamiento)
        {
            try
            {
                await _service.AddAsync(entrenamiento);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
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
    }
}
