using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class Objetivo
{
    public int Id { get; set; }

    public string Objetivo1 { get; set; } = null!;

    public virtual ICollection<ControlPersona> ControlesPersonas { get; set; } = new List<ControlPersona>();

    public virtual ICollection<RecomendacionNutricional> RecomendacionesNutricionales { get; set; } = new List<RecomendacionNutricional>();
}
