using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using trackerBack.Models;

namespace trackerBack.Dtos
{
    public class HistorialEjercicioDto
    {
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public List<SerieHistorialDto> Series { get; set; } = new List<SerieHistorialDto>();

    }
    public class SerieHistorialDto
    {
        public int Orden { get; set; }
        public Decimal Kilos { get; set; }
        public int Repeticiones { get; set; }
        public int? Rpe { get; set; }
        public string TipoSerie { get; set; }
    }
    public class EjercicioDto
    {
        public Ejercicio Ejercicio { get; set; }
        public List<HistorialEjercicioDto> Historial { get; set; }

    }
}

