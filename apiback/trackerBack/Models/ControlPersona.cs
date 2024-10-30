using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class ControlPersona
{
    public int Id { get; set; }

    public int IdPersona { get; set; }

    public decimal PesoCorporal { get; set; }

    public string? FotoPath { get; set; }

    public DateTime Fecha { get; set; }

    public int IdObjetivo { get; set; }

    public decimal? MasaMuscular { get; set; }

    public decimal? GrasaMuscular { get; set; }

    public string? Observacion { get; set; }

    public virtual Objetivo IdObjetivoNavigation { get; set; } = null!;

    public virtual Persona IdPersonaNavigation { get; set; } = null!;
}
