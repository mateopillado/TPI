using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace trackerBack.Models;

public partial class Serie
{
    public int Id { get; set; }

    public int Orden { get; set; }

    public decimal Kilo { get; set; }

    public int Repeticion { get; set; }

    public int IdTipoSerie { get; set; }

    public int IdEjercicioEntrenamiento { get; set; }

    public decimal? Rer { get; set; }

    public decimal? Rpe { get; set; }
    [JsonIgnore]

    public virtual EjercicioEntrenamiento IdEjercicioEntrenamientoNavigation { get; set; } = null!;
    [JsonIgnore]

    public virtual TipoSerie IdTipoSerieNavigation { get; set; } = null!;
}
