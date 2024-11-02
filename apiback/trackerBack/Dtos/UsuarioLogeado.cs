using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace trackerBack.Dtos
{
    public class UsuarioLogeado
    {
        public int Id { get; set; }
        public string Username {  get; set; }   
        public int CantidadEntrenamientos { get; set; }
        public List<EntrenamientoSemana> Entrenamientos { get; set; } = new List<EntrenamientoSemana>();    
        public List<GrupoMuscularDto> Musculos { get; set; }    
    }
    public class EntrenamientoSemana
    {
        public DateTime Desde { get; set; }
        public DateTime Hasta { get; set; }
        public int Cantidad { get; set; }

    }
}
