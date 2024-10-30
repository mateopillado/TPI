using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace trackerBack.Models;

public partial class Persona
{
    public int Id { get; set; }

    public int Dni { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public DateTime? FechaNacimiento { get; set; }

    public int? IdGenero { get; set; }

    public DateTime FechaRegistro { get; set; }

    public string Username { get; set; } = null!;

    public string Contrasena { get; set; } = null!; 

    public int? Altura { get; set; }

    public bool Buscando { get; set; }

    public int IdRol { get; set; }
    [JsonIgnore]
    public virtual ICollection<AlumnoProfesor> AlumnosProfesoreIdAlumnoNavigations { get; set; } = new List<AlumnoProfesor>();
    [JsonIgnore]

    public virtual ICollection<AlumnoProfesor> AlumnosProfesoreIdProfesorNavigations { get; set; } = new List<AlumnoProfesor>();
    [JsonIgnore]

    public virtual ICollection<Contacto> Contactos { get; set; } = new List<Contacto>();
    [JsonIgnore]

    public virtual ICollection<ControlPersona> ControlesPersonas { get; set; } = new List<ControlPersona>();
    [JsonIgnore]

    public virtual ICollection<Coordenada> Coordenada { get; set; } = new List<Coordenada>();
    [JsonIgnore]

    public virtual ICollection<Entrenamiento> Entrenamientos { get; set; } = new List<Entrenamiento>();
    [JsonIgnore]

    public virtual Genero? IdGeneroNavigation { get; set; }

    public virtual Role IdRolNavigation { get; set; } = null!;
    [JsonIgnore]

    public virtual ICollection<Plan> PlaneIdAlumnoNavigations { get; set; } = new List<Plan>();
    [JsonIgnore]

    public virtual ICollection<Plan> PlaneIdProfesorNavigations { get; set; } = new List<Plan>();

    [JsonIgnore]
    public virtual ICollection<RecomendacionNutricional> RecomendacionesNutricionales { get; set; } = new List<RecomendacionNutricional>();
}
