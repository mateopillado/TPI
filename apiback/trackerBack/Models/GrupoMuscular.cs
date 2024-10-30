using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class GrupoMuscular
{
    public int Id { get; set; }

    public string Grupo { get; set; } = null!;

    public virtual ICollection<Musculo> Musculos { get; set; } = new List<Musculo>();
}
