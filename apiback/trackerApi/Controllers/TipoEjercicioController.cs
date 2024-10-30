using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Services.Common;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoEjercicioController : ControllerBase
    {
        private readonly IGenericService<TipoEjercicio> _service;

        public TipoEjercicioController(IGenericService<TipoEjercicio> service)
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
                var tipoejercicio = await _service.GetByIdAsync(id);

                if(tipoejercicio == null) { return NotFound(); }
                return Ok(tipoejercicio);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TipoEjercicio tipoejercicio)
        {
            try
            {
                await _service.AddAsync(tipoejercicio);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TipoEjercicio tipoejercicio)
        {
            try
            {
                await _service.UpdateAsync(id, tipoejercicio);
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


