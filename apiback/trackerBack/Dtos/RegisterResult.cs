using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace trackerBack.Dtos
{
    public class RegisterResult
    {
        public bool Success { get; set; }   = true;
        public List<Errors> Errors { get; set; } = new List<Errors>();  
    }
    public class Errors
    {
        public string Message { get; set; }
    }
}
