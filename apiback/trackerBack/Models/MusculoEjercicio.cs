using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class MusculoEjercicio
{
    public int Id { get; set; }

    public int IdMusculo { get; set; }

    public int IdEjercicio { get; set; }

    public virtual Ejercicio IdEjercicioNavigation { get; set; } = null!;

    public virtual Musculo IdMusculoNavigation { get; set; } = null!;
}
