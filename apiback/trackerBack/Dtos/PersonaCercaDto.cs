using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace trackerBack.Dtos
{
    public class PersonaCercaDto
    {
        public int Id { get; set; } 
        public string NombreCompleto { get; set; }  
        public string RedSocial { get; set; }
        public Double Distancia { get; set; }
    }
}
