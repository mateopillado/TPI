using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class Musculo
{
    public int Id { get; set; }

    public int IdGrupoMuscular { get; set; }

    public string Musculo1 { get; set; } = null!;

    public virtual GrupoMuscular IdGrupoMuscularNavigation { get; set; } = null!;

    public virtual ICollection<MusculoEjercicio> MusculosEjercicios { get; set; } = new List<MusculoEjercicio>();
}
