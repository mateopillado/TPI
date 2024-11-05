using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Services.Common;
using Microsoft.AspNetCore.Authorization;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposSeriesController : ControllerBase
    {
        private readonly IGenericService<TipoSerie> _service;

        public TiposSeriesController(IGenericService<TipoSerie> service)
        {
            _service = service;
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
                var tiposerie = await _service.GetByIdAsync(id);

                if(tiposerie == null) { return NotFound(); }
                return Ok(tiposerie);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> Post([FromBody] TipoSerie tiposerie)
        {
            try
            {
                await _service.AddAsync(tiposerie);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]

        public async Task<IActionResult> Put(int id, [FromBody] TipoSerie tiposerie)
        {
            try
            {
                await _service.UpdateAsync(id, tiposerie);
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
    }
}
