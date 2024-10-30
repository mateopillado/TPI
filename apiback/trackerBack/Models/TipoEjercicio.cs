using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class TipoEjercicio
{
    public int Id { get; set; }

    public string Tipo { get; set; } = null!;

    public virtual ICollection<Ejercicio> Ejercicios { get; set; } = new List<Ejercicio>();
}
