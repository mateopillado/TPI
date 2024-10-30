using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Services.Common;
using Microsoft.AspNetCore.Authorization;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeriesController : ControllerBase
    {
        private readonly IGenericService<Serie> _service;

        public SeriesController(IGenericService<Serie> service)
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
                var serie = await _service.GetByIdAsync(id);

                if(serie == null) { return NotFound(); }
                return Ok(serie);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> Post([FromBody] Serie serie)
        {
            try
            {
                await _service.AddAsync(serie);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]

        public async Task<IActionResult> Put(int id, [FromBody] Serie serie)
        {
            try
            {
                await _service.UpdateAsync(id, serie);
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
