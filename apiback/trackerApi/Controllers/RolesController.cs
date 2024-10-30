using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Services.Common;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IGenericService<Role> _service;

        public RolesController(IGenericService<Role> service)
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
                var role = await _service.GetByIdAsync(id);

                if(role == null) { return NotFound(); }
                return Ok(role);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
[Authorize]

        public async Task<IActionResult> Post([FromBody] Role role)
        {
            try
            {
                await _service.AddAsync(role);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
[Authorize]

        public async Task<IActionResult> Put(int id, [FromBody] Role role)
        {
            try
            {
                await _service.UpdateAsync(id, role);
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
