using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class Contacto
{
    public int Id { get; set; }

    public string? Email { get; set; }

    public string? Telefono { get; set; }

    public string? RedSocial1 { get; set; }

    public string? RedSocial2 { get; set; }

    public int IdPersona { get; set; }

    public virtual Persona IdPersonaNavigation { get; set; } = null!;
}
