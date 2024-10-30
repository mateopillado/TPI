using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class Rutina
{
    public int Id { get; set; }

    public int IdPlan { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<EjercicioRutina> EjerciciosRutinas { get; set; } = new List<EjercicioRutina>();

    public virtual Plan IdPlanNavigation { get; set; } = null!;
}
