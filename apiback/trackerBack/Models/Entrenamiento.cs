using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace trackerBack.Models;

public partial class Entrenamiento
{
    public int Id { get; set; }

    public int IdPersona { get; set; }

    public DateTime Fecha { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<EjercicioEntrenamiento> EjerciciosEntrenamientos { get; set; } = new List<EjercicioEntrenamiento>();
    [JsonIgnore]
    public virtual Persona IdPersonaNavigation { get; set; } = null!;
}
