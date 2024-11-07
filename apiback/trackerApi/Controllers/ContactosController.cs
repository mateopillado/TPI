using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Services.Common;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactosController : ControllerBase
    {
        private readonly IGenericService<Contacto> _service;

        public ContactosController(IGenericService<Contacto> service)
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
                var contacto = await _service.GetByIdAsync(id);

                if(contacto == null) { return NotFound(); }
                return Ok(contacto);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] Contacto contacto)
        {
            try
            {
                contacto.IdPersona = GetUserId();
                await _service.AddAsync(contacto);
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] Contacto contacto)
        {
            try
            {
                contacto.IdPersona = GetUserId();

                await _service.UpdateAsync(id, contacto);
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
        private int GetUserId()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;

            return int.Parse(userId);
        }
    }
}
