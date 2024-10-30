using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class Plan
{
    public int Id { get; set; }

    public int? IdProfesor { get; set; }

    public int IdTipoPlan { get; set; }

    public int? IdAlumno { get; set; }

    public DateTime? FechaInicio { get; set; }

    public DateTime? FechaFin { get; set; }

    public virtual Persona? IdAlumnoNavigation { get; set; }

    public virtual Persona? IdProfesorNavigation { get; set; }

    public virtual TipoPlan IdTipoPlanNavigation { get; set; } = null!;

    public virtual ICollection<Rutina> Rutinas { get; set; } = new List<Rutina>();
}
