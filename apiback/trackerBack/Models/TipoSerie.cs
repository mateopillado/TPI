using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class TipoSerie
{
    public int Id { get; set; }

    public string Tipo { get; set; } = null!;

    public virtual ICollection<Serie> Series { get; set; } = new List<Serie>();
}
