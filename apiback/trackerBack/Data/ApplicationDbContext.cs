using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using trackerBack.Models;

namespace trackerBack.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AlumnoProfesor> AlumnosProfesores { get; set; }

    public virtual DbSet<Contacto> Contactos { get; set; }

    public virtual DbSet<ControlPersona> ControlesPersonas { get; set; }

    public virtual DbSet<Coordenada> Coordenadas { get; set; }

    public virtual DbSet<Ejercicio> Ejercicios { get; set; }

    public virtual DbSet<EjercicioEntrenamiento> EjerciciosEntrenamientos { get; set; }

    public virtual DbSet<EjercicioRutina> EjerciciosRutinas { get; set; }

    public virtual DbSet<Entrenamiento> Entrenamientos { get; set; }

    public virtual DbSet<Genero> Generos { get; set; }

    public virtual DbSet<GrupoMuscular> GruposMusculares { get; set; }

    public virtual DbSet<Musculo> Musculos { get; set; }

    public virtual DbSet<MusculoEjercicio> MusculosEjercicios { get; set; }

    public virtual DbSet<Objetivo> Objetivos { get; set; }

    public virtual DbSet<Persona> Personas { get; set; }

    public virtual DbSet<Plan> Planes { get; set; }

    public virtual DbSet<RecomendacionNutricional> RecomendacionesNutricionales { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Rutina> Rutinas { get; set; }

    public virtual DbSet<Serie> Series { get; set; }

    public virtual DbSet<TipoEjercicio> TiposEjercicios { get; set; }

    public virtual DbSet<TipoPlan> TiposPlanes { get; set; }

    public virtual DbSet<TipoSerie> TiposSeries { get; set; }

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //    => optionsBuilder.UseSqlServer("Data Source=DESKTOP-LG64KJU;Initial Catalog=grupo7_1w3_8;Integrated Security=True;Encrypt=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AlumnoProfesor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__alumnos___3213E83F3E9A6F9A");

            entity.ToTable("alumnos_profesores");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdAlumno).HasColumnName("id_alumno");
            entity.Property(e => e.IdProfesor).HasColumnName("id_profesor");

            entity.HasOne(d => d.IdAlumnoNavigation).WithMany(p => p.AlumnosProfesoreIdAlumnoNavigations)
                .HasForeignKey(d => d.IdAlumno)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_alumno_persona");

            entity.HasOne(d => d.IdProfesorNavigation).WithMany(p => p.AlumnosProfesoreIdProfesorNavigations)
                .HasForeignKey(d => d.IdProfesor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_profesor");
        });

        modelBuilder.Entity<Contacto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__contacto__3213E83F79D0133E");

            entity.ToTable("contactos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IdPersona).HasColumnName("id_persona");
            entity.Property(e => e.RedSocial1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("red_social_1");
            entity.Property(e => e.RedSocial2)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("red_social_2");
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("telefono");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.Contactos)
                .HasForeignKey(d => d.IdPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_contacto_personas");
        });

        modelBuilder.Entity<ControlPersona>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__controle__3213E83F60845798");

            entity.ToTable("controles_personas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.FotoPath)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("foto_path");
            entity.Property(e => e.GrasaMuscular)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("grasa_muscular");
            entity.Property(e => e.IdObjetivo).HasColumnName("id_objetivo");
            entity.Property(e => e.IdPersona).HasColumnName("id_persona");
            entity.Property(e => e.MasaMuscular)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("masa_muscular");
            entity.Property(e => e.Observacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("observacion");
            entity.Property(e => e.PesoCorporal)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("peso_corporal");

            entity.HasOne(d => d.IdObjetivoNavigation).WithMany(p => p.ControlesPersonas)
                .HasForeignKey(d => d.IdObjetivo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_objetivo");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.ControlesPersonas)
                .HasForeignKey(d => d.IdPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_persona");
        });

        modelBuilder.Entity<Coordenada>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__coordena__3213E83F412D8A41");

            entity.ToTable("coordenadas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.IdPersona).HasColumnName("id_persona");
            entity.Property(e => e.Latitud).HasColumnName("latitud");
            entity.Property(e => e.Longitud).HasColumnName("longitud");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.Coordenada)
                .HasForeignKey(d => d.IdPersona)
                .HasConstraintName("fk_personas_coordenadas");
        });

        modelBuilder.Entity<Ejercicio>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ejercici__3213E83F393E2F3A");

            entity.ToTable("ejercicios");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FotoPath)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("foto_path");
            entity.Property(e => e.IdTipoEjercicio).HasColumnName("id_tipo_ejercicio");
            entity.Property(e => e.Instruccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("instruccion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("nombre");

            entity.HasOne(d => d.IdTipoEjercicioNavigation).WithMany(p => p.Ejercicios)
                .HasForeignKey(d => d.IdTipoEjercicio)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tipo_ejercicio");
        });

        modelBuilder.Entity<EjercicioEntrenamiento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ejercici__3213E83F1671673C");

            entity.ToTable("ejercicios_entrenamientos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdEjercicio).HasColumnName("id_ejercicio");
            entity.Property(e => e.IdEntrenamiento).HasColumnName("id_entrenamiento");
            entity.Property(e => e.Nota)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("nota");

            entity.HasOne(d => d.IdEjercicioNavigation).WithMany(p => p.EjerciciosEntrenamientos)
                .HasForeignKey(d => d.IdEjercicio)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_ejercicio");

            entity.HasOne(d => d.IdEntrenamientoNavigation).WithMany(p => p.EjerciciosEntrenamientos)
                .HasForeignKey(d => d.IdEntrenamiento)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_entrenamiento");
        });

        modelBuilder.Entity<EjercicioRutina>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ejercici__3213E83F29349F3F");

            entity.ToTable("ejercicios_rutinas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CantidadSeries).HasColumnName("cantidad_series");
            entity.Property(e => e.IdEjercicio).HasColumnName("id_ejercicio");
            entity.Property(e => e.IdRutina).HasColumnName("id_rutina");

            entity.HasOne(d => d.IdEjercicioNavigation).WithMany(p => p.EjerciciosRutinas)
                .HasForeignKey(d => d.IdEjercicio)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_ejercicio_rutina");

            entity.HasOne(d => d.IdRutinaNavigation).WithMany(p => p.EjerciciosRutinas)
                .HasForeignKey(d => d.IdRutina)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_rutina");
        });

        modelBuilder.Entity<Entrenamiento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__entrenam__3213E83FB2F4578B");

            entity.ToTable("entrenamientos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.IdPersona).HasColumnName("id_persona");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("nombre");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.Entrenamientos)
                .HasForeignKey(d => d.IdPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_persona_entrenamiento");
        });

        modelBuilder.Entity<Genero>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__generos__3213E83FD4EF70A2");

            entity.ToTable("generos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("genero");
        });

        modelBuilder.Entity<GrupoMuscular>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__grupos_m__3213E83F5092B3F2");

            entity.ToTable("grupos_musculares");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Grupo)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("grupo_muscular");
        });

        modelBuilder.Entity<Musculo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__musculos__3213E83F5D420396");

            entity.ToTable("musculos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdGrupoMuscular).HasColumnName("id_grupo_muscular");
            entity.Property(e => e.Musculo1)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("musculo");

            entity.HasOne(d => d.IdGrupoMuscularNavigation).WithMany(p => p.Musculos)
                .HasForeignKey(d => d.IdGrupoMuscular)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_grupo_muscular");
        });

        modelBuilder.Entity<MusculoEjercicio>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__musculos__3213E83F9A4C1A3D");

            entity.ToTable("musculos_ejercicios");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdEjercicio).HasColumnName("id_ejercicio");
            entity.Property(e => e.IdMusculo).HasColumnName("id_musculo");

            entity.HasOne(d => d.IdEjercicioNavigation).WithMany(p => p.MusculosEjercicios)
                .HasForeignKey(d => d.IdEjercicio)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_ejercicio_musculo");

            entity.HasOne(d => d.IdMusculoNavigation).WithMany(p => p.MusculosEjercicios)
                .HasForeignKey(d => d.IdMusculo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_musculo_ejercicio");
        });

        modelBuilder.Entity<Objetivo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__objetivo__3213E83F5F33F078");

            entity.ToTable("objetivos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Objetivo1)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("objetivo");
        });

        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__personas__3213E83F8CDFA906");

            entity.ToTable("personas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Altura).HasColumnName("altura");
            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Buscando).HasColumnName("buscando");
            entity.Property(e => e.Contrasena)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("contrasena");
            entity.Property(e => e.Dni).HasColumnName("dni");
            entity.Property(e => e.FechaNacimiento)
                .HasColumnType("datetime")
                .HasColumnName("fecha_nacimiento");
            entity.Property(e => e.FechaRegistro)
                .HasColumnType("datetime")
                .HasColumnName("fecha_registro");
            entity.Property(e => e.IdGenero).HasColumnName("id_genero");
            entity.Property(e => e.IdRol).HasColumnName("id_rol");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Username)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.IdGeneroNavigation).WithMany(p => p.Personas)
                .HasForeignKey(d => d.IdGenero)
                .HasConstraintName("fk_genero_personas");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Personas)
                .HasForeignKey(d => d.IdRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_rol_personas");
        });

        modelBuilder.Entity<Plan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__planes__3213E83F097FAFFB");

            entity.ToTable("planes");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FechaFin)
                .HasColumnType("datetime")
                .HasColumnName("fecha_fin");
            entity.Property(e => e.FechaInicio)
                .HasColumnType("datetime")
                .HasColumnName("fecha_inicio");
            entity.Property(e => e.IdAlumno).HasColumnName("id_alumno");
            entity.Property(e => e.IdProfesor).HasColumnName("id_profesor");
            entity.Property(e => e.IdTipoPlan).HasColumnName("id_tipo_plan");

            entity.HasOne(d => d.IdAlumnoNavigation).WithMany(p => p.PlaneIdAlumnoNavigations)
                .HasForeignKey(d => d.IdAlumno)
                .HasConstraintName("fk_alumno");

            entity.HasOne(d => d.IdProfesorNavigation).WithMany(p => p.PlaneIdProfesorNavigations)
                .HasForeignKey(d => d.IdProfesor)
                .HasConstraintName("fk_profesor_plan");

            entity.HasOne(d => d.IdTipoPlanNavigation).WithMany(p => p.Planes)
                .HasForeignKey(d => d.IdTipoPlan)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tipo_plan");
        });

        modelBuilder.Entity<RecomendacionNutricional>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__recomend__3213E83FC75651F3");

            entity.ToTable("recomendaciones_nutricionales");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Agua)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("agua");
            entity.Property(e => e.Caloria).HasColumnName("caloria");
            entity.Property(e => e.Carbohidrato)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("carbohidrato");
            entity.Property(e => e.Grasa)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("grasa");
            entity.Property(e => e.IdObjetivo).HasColumnName("id_objetivo");
            entity.Property(e => e.IdPersona).HasColumnName("id_persona");
            entity.Property(e => e.Proteina)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("proteina");

            entity.HasOne(d => d.IdObjetivoNavigation).WithMany(p => p.RecomendacionesNutricionales)
                .HasForeignKey(d => d.IdObjetivo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_objetivo_recomendacion");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.RecomendacionesNutricionales)
                .HasForeignKey(d => d.IdPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_persona_recomendacion");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__roles__3213E83F39D7C7BF");

            entity.ToTable("roles");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Rol)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("rol");
        });

        modelBuilder.Entity<Rutina>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__rutinas__3213E83FE37F3F2C");

            entity.ToTable("rutinas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdPlan).HasColumnName("id_plan");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("nombre");

            entity.HasOne(d => d.IdPlanNavigation).WithMany(p => p.Rutinas)
                .HasForeignKey(d => d.IdPlan)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_plan");
        });

        modelBuilder.Entity<Serie>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__series__3213E83F44CE0CC3");

            entity.ToTable("series");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdEjercicioEntrenamiento).HasColumnName("id_ejercicio_entrenamiento");
            entity.Property(e => e.IdTipoSerie).HasColumnName("id_tipo_serie");
            entity.Property(e => e.Kilo)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("kilo");
            entity.Property(e => e.Orden).HasColumnName("orden");
            entity.Property(e => e.Repeticion).HasColumnName("repeticion");
            entity.Property(e => e.Rer)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("rer");
            entity.Property(e => e.Rpe)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("rpe");

            entity.HasOne(d => d.IdEjercicioEntrenamientoNavigation).WithMany(p => p.Series)
                .HasForeignKey(d => d.IdEjercicioEntrenamiento)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_ejercicio_entrenamiento");

            entity.HasOne(d => d.IdTipoSerieNavigation).WithMany(p => p.Series)
                .HasForeignKey(d => d.IdTipoSerie)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tipo_serie");
        });

        modelBuilder.Entity<TipoEjercicio>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tipos_ej__3213E83F53DAF16F");

            entity.ToTable("tipos_ejercicios");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Tipo)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("tipo_ejercicio");
        });

        modelBuilder.Entity<TipoPlan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tipos_pl__3213E83FF2BDAD66");

            entity.ToTable("tipos_planes");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Tipo)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("tipo_plan");
        });

        modelBuilder.Entity<TipoSerie>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tipos_se__3213E83FB9ABE30B");

            entity.ToTable("tipos_series");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Tipo)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("tipo_serie");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
