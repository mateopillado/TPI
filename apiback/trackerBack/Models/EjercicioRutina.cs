using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class EjercicioRutina
{
    public int Id { get; set; }

    public int IdEjercicio { get; set; }

    public int IdRutina { get; set; }

    public int? CantidadSeries { get; set; }

    public virtual Ejercicio IdEjercicioNavigation { get; set; } = null!;

    public virtual Rutina IdRutinaNavigation { get; set; } = null!;
}
