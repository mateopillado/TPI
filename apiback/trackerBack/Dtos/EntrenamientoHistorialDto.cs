using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace trackerBack.Dtos
{
    public class EntrenamientoHistorialDto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } 
        public DateTime Fecha { get; set; }
        public int Tonelaje { get; set; }   
        public List<EjercicioHistorialDto> Ejercicios { get; set; }
        
    }
    public class EjercicioHistorialDto
    {
        public int CantidadSeries { get; set; }
        public string Nombre { get; set; }
        public decimal Kilos { get; set; }
        public int Repeticiones { get; set; }   

    }   
}
