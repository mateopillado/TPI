using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace trackerBack.Dtos
{
    public class RegisterDto
    {
        public int Dni { get; set; }

        public string Nombre { get; set; } = null!;

        public string Apellido { get; set; } = null!;

        public DateTime FechaNacimiento { get; set; }
        public int IdGenero { get; set; }
        public int IdRol { get; set; }


        public string Username { get; set; } = null!;

        public string Contrasena { get; set; } = null!;
    }
}
