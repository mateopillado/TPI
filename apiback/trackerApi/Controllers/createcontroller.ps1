param(
    [int]$controllerCount
)

# Función para crear un controlador para una entidad
function Create-Controller {
    param (
        [string]$entityName,
        [string]$entityNamePlural
    )
    
    # Nombre del controlador
    $controllerName = "${entityNamePlural}Controller"
    $serviceType = "IGenericService<$entityName>"

    # Ruta donde se creará el controlador
    $outputPath = "$PSScriptRoot\$controllerName.cs"

    # Contenido del controlador
    $controllerContent = @"
using Microsoft.AspNetCore.Mvc;
using trackerBack.Models;
using trackerBack.Services.Common;
using Microsoft.AspNetCore.Authorization;

namespace trackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class $controllerName : ControllerBase
    {
        private readonly $serviceType _service;

        public $controllerName($serviceType service)
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
                var $($entityName.ToLower()) = await _service.GetByIdAsync(id);

                if($($entityName.ToLower()) == null) { return NotFound(); }
                return Ok($($entityName.ToLower()));
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> Post([FromBody] $entityName $($entityName.ToLower()))
        {
            try
            {
                await _service.AddAsync($($entityName.ToLower()));
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]

        public async Task<IActionResult> Put(int id, [FromBody] $entityName $($entityName.ToLower()))
        {
            try
            {
                await _service.UpdateAsync(id, $($entityName.ToLower()));
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
"@

    # Crear el archivo con el contenido
    New-Item -Path $outputPath -ItemType File -Force
    Set-Content -Path $outputPath -Value $controllerContent

    Write-Host "Controller $controllerName created at $outputPath"
}

# Solicitar nombres de entidades
for ($i = 1; $i -le $controllerCount; $i++) {
    $entityName = Read-Host "Enter the name of entity $i"
    $entityNamePlural= Read-Host "Enter the name of controller $i"
    Create-Controller -entityName $entityName -entityNamePlural $entityNamePlural
}

