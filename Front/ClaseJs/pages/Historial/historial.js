let sesiones = [];

function init() {
    sesiones = [
        {
            id: 1,
            nombreRutina: "Rutina de Fuerza 1",
            fecha: "2024-01-08",
            duracion: "1h 30m",
            cantidadSeries: 3,
            ejercicios: [
                { cantidadSeries: 3, nombre: "Press de Banca", sets: [{ peso: "60", repeticiones: "6", rpe: "8" }, { peso: "70", repeticiones: "5", rpe: "9" }] },
                { cantidadSeries: 3, nombre: "Sentadilla Frontal", sets: [{ peso: "80", repeticiones: "4", rpe: "8" }] },
                { cantidadSeries: 3, nombre: "Peso Muerto", sets: [{ peso: "100", repeticiones: "5", rpe: "8" }] },
                { cantidadSeries: 3, nombre: "Dominadas", sets: [{ peso: "peso corporal", repeticiones: "5", rpe: "7" }] },
                { cantidadSeries: 3, nombre: "Press Militar", sets: [{ peso: "40", repeticiones: "8", rpe: "6" }] }
            ]
        },
        {
            id: 2,
            nombreRutina: "Rutina de Fuerza 2",
            fecha: "2024-01-15",
            duracion: "1h 15m",
            ejercicios: [
                { cantidadSeries: 3, nombre: "Peso Muerto", sets: [{ peso: "120", repeticiones: "3", rpe: "9" }] },
                { cantidadSeries: 3, nombre: "Press Militar", sets: [{ peso: "50", repeticiones: "6", rpe: "7" }] },
                { cantidadSeries: 3, nombre: "Prensa de Piernas", sets: [{ peso: "200", repeticiones: "8", rpe: "8" }] },
                { cantidadSeries: 3, nombre: "Zancadas", sets: [{ peso: "40", repeticiones: "10", rpe: "7" }] },
                { cantidadSeries: 3, nombre: "Fondos en Paralelas", sets: [{ peso: "peso corporal", repeticiones: "8", rpe: "6" }] }
            ]
        },
        {
            id: 3,
            nombreRutina: "Rutina de Resistencia",
            fecha: "2024-02-20",
            duracion: "1h 45m",
            ejercicios: [
                { cantidadSeries: 3, nombre: "Correr", sets: [{ peso: "0", repeticiones: "30min", rpe: "6" }] },
                { cantidadSeries: 3, nombre: "Ciclismo", sets: [{ peso: "0", repeticiones: "45min", rpe: "7" }] },
                { cantidadSeries: 3, nombre: "Remo", sets: [{ peso: "0", repeticiones: "20min", rpe: "7" }] },
                { cantidadSeries: 3, nombre: "Elíptica", sets: [{ peso: "0", repeticiones: "25min", rpe: "6" }] },
                { cantidadSeries: 3, nombre: "Saltos", sets: [{ peso: "0", repeticiones: "10min", rpe: "8" }] }
            ]
        },
        {
            id: 4,
            nombreRutina: "Rutina de CrossFit",
            fecha: "2024-03-01",
            duracion: "2h",
            ejercicios: [
                { cantidadSeries: 2000, nombre: "Burpees", sets: [{ peso: "0", repeticiones: "50", rpe: "8" }] },
                { cantidadSeries: 3, nombre: "Kettlebell Swing", sets: [{ peso: "24", repeticiones: "30", rpe: "7" }] },
                { cantidadSeries: 3, nombre: "Salto de Caja", sets: [{ peso: "0", repeticiones: "20", rpe: "8" }] },
                { cantidadSeries: 3, nombre: "Wall Ball", sets: [{ peso: "9", repeticiones: "25", rpe: "6" }] },
                { cantidadSeries: 3, nombre: "Thruster", sets: [{ peso: "30", repeticiones: "15", rpe: "7" }] }
            ]
        }
    ];
    mostrarSesiones();
}

function calcularPesoTotal(ejercicios) {
    return ejercicios.reduce((total, ejercicio) => {
        return total + ejercicio.sets.reduce((totalEjercicio, set) => {
            const peso = set.peso === "peso corporal" ? 0 : parseFloat(set.peso);
            return totalEjercicio + (peso * parseInt(set.repeticiones));
        }, 0);
    }, 0);
}

function encontrarMejorSerie(sets) {
    return sets.reduce((mejor, set) => {
        const pesoTotal = parseFloat(set.peso) * parseInt(set.repeticiones);
        if (!mejor || pesoTotal > (parseFloat(mejor.peso) * parseInt(mejor.repeticiones))) {
            return set;
        }
        return mejor;
    }, null);
}

function mostrarSesiones() {
    const listaSesiones = document.getElementById("sessionList");
    listaSesiones.innerHTML = "";

    sesiones.forEach(sesion => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("session-card");
        tarjeta.onclick = function() {
            mostrarDetallesSesion(sesion); // Llama a la función para mostrar los detalles
        };

        const pesoTotal = calcularPesoTotal(sesion.ejercicios);

        tarjeta.innerHTML = `
            <h3>${sesion.nombreRutina}</h3>
            <p>${sesion.fecha}</p>
            <p>
                <strong>
                    <i class="fa-solid fa-weight-hanging" style="color: white; font-size: 16px; margin-right: 5px;"></i> 
                    Peso Total Levantado:
                </strong> 
                ${pesoTotal} kg
            </p>
            <h4 style="display: flex; justify-content: space-between;">
                Ejercicios
                <span class="subtitle" style="color:orange">Mejor Serie</span>
            </h4>
            <div class="ejercicios">
            ${sesion.ejercicios.map(ejercicio => {
            const mejorSet = encontrarMejorSerie(ejercicio.sets);
                return `
                <div class="exercise-row">
                    <p class="exercise-info">${ejercicio.cantidadSeries} x ${ejercicio.nombre}: ${ejercicio.sets.map(set => `${set.repeticiones}x ${set.peso} kg`).join(", ")}</p>
                </div>
                <div class="best-set-row">
                    <p class="best-set">
                        ${mejorSet ? `${mejorSet.repeticiones} reps, ${mejorSet.peso} kg, RPE: ${mejorSet.rpe}` : ""} 
                    </p>
                </div>
                    `;
                }).join("")}
            </div>

            <div class="button-group" style="display: flex; justify-content: flex-end;">
                <button onclick="eliminarSesion(${sesion.id}); event.stopPropagation();">Eliminar</button>
            </div>
        `;
        listaSesiones.appendChild(tarjeta);
    });
}

function formatearFecha(fechaStr) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaStr).toLocaleDateString('es-ES', opciones);
}

function mostrarDetallesSesion(sesion) {
    const detallesSesionDiv = document.getElementById('sessionDetails');
    detallesSesionDiv.innerHTML = `
        <h5 style="color: white;">Detalles de la Sesión</h5>
        <p style="color: white;"><strong>Rutina:</strong> ${sesion.nombreRutina}</p>
        <p style="color: white;"><strong>Fecha:</strong> ${formatearFecha(sesion.fecha)}</p>
        <p style="color: white;"><strong>Duración:</strong> ${sesion.duracion}</p>
        <p style="display: flex; justify-content: space-between; color: white;">
            <strong>Ejercicios:</strong>
            <strong style="color: orange;">Mejores Series:</strong>
        </p>
        <div class="exercise-details">
            ${sesion.ejercicios.map(ejercicio => {
                const mejorSet = encontrarMejorSerie(ejercicio.sets);
                return `
                    <div style="color: white;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>${ejercicio.nombre} (${ejercicio.cantidadSeries} series):</strong>
                            <span style="color: orange;">
                                ${mejorSet ? `${mejorSet.repeticiones} reps, ${mejorSet.peso} kg` : "N/A"}
                            </span>
                        </div>
                        <div>
                            ${ejercicio.sets.map(set => `${set.repeticiones} reps, ${set.peso} kg`).join(", ")}
                        </div>
                    </div>
                `;
            }).join("")}
        </div>
    `;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('sessionModal'));
    modal.show();
}


 


function agregarSesion() {
    const nuevaSesion = {
        id: sesiones.length + 1,
        nombreRutina: "Nueva Rutina",
        fecha: new Date().toISOString().split("T")[0],
        duracion: "0h 0m",
        ejercicios: []
    };

    sesiones.push(nuevaSesion);
    mostrarSesiones();
}

function eliminarSesion(id) {
    sesiones = sesiones.filter(s => s.id !== id);
    mostrarSesiones();
}

// Inicializa la aplicación
init();

