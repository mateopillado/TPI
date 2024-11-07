using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using trackerBack.Data;
using trackerBack.Repositories;
using trackerBack.Repositories.Common;
using trackerBack.Services;
using trackerBack.Services.Common;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConection")));


builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IPersonaRepository, PersonaRepository>();
builder.Services.AddScoped<IEntrenamientoRepository, EntrenamientoRepository>();
builder.Services.AddScoped<IEjercicioRepository, EjercicioRepository>();
builder.Services.AddScoped<ICoordenadaRepository, CoordenadaRepository>();



builder.Services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
builder.Services.AddScoped<IPersonaService, PersonaService>();
builder.Services.AddScoped<IEntrenamientoService, EntrenamientoService>();
builder.Services.AddScoped<IEjercicioService, EjercicioService>();
builder.Services.AddScoped<ICoordenadaService, CoordenadaService>();







// Configurar servicios de JWT
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // Cambia a false para HTTP en producci�n

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,            // Configura seg�n sea necesario
        ValidateAudience = false,          // Configura seg�n sea necesario
        ValidateLifetime = true,           // Recomendado para asegurar que los tokens expiren
        ValidateIssuerSigningKey = true,   // Importante para validar la clave de firma del token
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
    options.SaveToken = true;  

});

// A�adir servicios de autorizaci�n
builder.Services.AddAuthorization();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Tracker API", Version = "v1" });

    // Configurar Swagger para utilizar el token Bearer
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
                       Array.Empty<string>()

        }
    });
});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


var app = builder.Build();
app.UseCors("AllowAllOrigins");


//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
