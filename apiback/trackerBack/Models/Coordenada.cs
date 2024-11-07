using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace trackerBack.Models;

public partial class Coordenada
{
    public int Id { get; set; }

    public double Latitud { get; set; }

    public double Longitud { get; set; }

    public DateTime Fecha { get; set; }

    public int? IdPersona { get; set; }
    [JsonIgnore]

    public virtual Persona? IdPersonaNavigation { get; set; }
}
