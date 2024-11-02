﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Services.Common;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EjerciciosController : ControllerBase
    {
        private readonly IGenericService<Ejercicio> _service;
        public EjerciciosController(IGenericService<Ejercicio> service)
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
        public async  Task<IActionResult> GetById(int id)
        {
            try
            {
                var ejercicio = await _service.GetByIdAsync(id);

                if(ejercicio  == null) { return NotFound(); }  
                return Ok(ejercicio);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Ejercicio ejercicio)
        {
            try
            {
                await _service.AddAsync(ejercicio);
                return Ok();
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Ejercicio ejercicio)
        {
            try
            {
               
                await _service.UpdateAsync(id,ejercicio);
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