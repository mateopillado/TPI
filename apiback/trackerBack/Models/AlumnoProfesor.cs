using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class AlumnoProfesor
{
    public int Id { get; set; }

    public int IdAlumno { get; set; }

    public int IdProfesor { get; set; }

    public virtual Persona IdAlumnoNavigation { get; set; } = null!;

    public virtual Persona IdProfesorNavigation { get; set; } = null!;
}
