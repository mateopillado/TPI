using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace trackerBack.Models;

public partial class EjercicioEntrenamiento
{
    public int Id { get; set; }

    public int IdEjercicio { get; set; }

    public int IdEntrenamiento { get; set; }

    public string? Nota { get; set; }
    [JsonIgnore]
    public virtual Ejercicio IdEjercicioNavigation { get; set; } = null!;
    [JsonIgnore]

    public virtual Entrenamiento IdEntrenamientoNavigation { get; set; } = null!;

    public virtual ICollection<Serie> Series { get; set; } = new List<Serie>();
}
