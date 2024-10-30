﻿using System;
using System.Collections.Generic;

namespace trackerBack.Models;

public partial class Ejercicio
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public int IdTipoEjercicio { get; set; }

    public string? FotoPath { get; set; }

    public string? Instruccion { get; set; }

    public virtual ICollection<EjercicioEntrenamiento> EjerciciosEntrenamientos { get; set; } = new List<EjercicioEntrenamiento>();

    public virtual ICollection<EjercicioRutina> EjerciciosRutinas { get; set; } = new List<EjercicioRutina>();

    public virtual TipoEjercicio IdTipoEjercicioNavigation { get; set; } = null!;

    public virtual ICollection<MusculoEjercicio> MusculosEjercicios { get; set; } = new List<MusculoEjercicio>();
}
