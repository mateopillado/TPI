using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class RecomendacionNutricional
{
    public int Id { get; set; }

    public int IdObjetivo { get; set; }

    public int IdPersona { get; set; }

    public int? Caloria { get; set; }

    public decimal? Proteina { get; set; }

    public decimal? Grasa { get; set; }

    public decimal? Agua { get; set; }

    public decimal? Carbohidrato { get; set; }

    public virtual Objetivo IdObjetivoNavigation { get; set; } = null!;

    public virtual Persona IdPersonaNavigation { get; set; } = null!;
}
