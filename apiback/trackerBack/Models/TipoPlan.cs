using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class TipoPlan
{
    public int Id { get; set; }

    public string Tipo { get; set; } = null!;

    public virtual ICollection<Plan> Planes { get; set; } = new List<Plan>();
}
