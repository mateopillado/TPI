import entrenamientoService from "../../services/entrenamientoService.js";

let sesiones = [];



async function init() {
    // Mostrar el loader y ocultar el contenido principal
    document.getElementById("loader").style.display = "flex";
    document.querySelector("main").style.display = "none";

    try {
        sesiones = await entrenamientoService.getHistorial();
        mostrarSesiones();

        if (sesiones.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "No hay sesiones de entrenamiento registradas.";
            document.getElementById("sessionList").appendChild(mensaje);
        }
    } catch (error) {
        console.error("Error al cargar sesiones:", error);
    }

    // Ocultar el loader y mostrar el contenido después de cargar
    document.getElementById("loader").style.display = "none";
    document.querySelector("main").style.display = "block";
}

function mostrarSesiones() {
    const listaSesiones = document.getElementById("sessionList");
    listaSesiones.innerHTML = "";
    
    sesiones.forEach(sesion => {
        const tarjeta = document.createElement("div");
        const descripcionEntrenamiento = (sesion.descripcion && sesion.descripcion !== "") ? sesion.descripcion : "Sin Nombre";
        tarjeta.classList.add("session-card");
        
        tarjeta.onclick = function() {
            mostrarDetallesSesion(sesion.id); 
        };

        console.log(sesion)

        tarjeta.innerHTML = `
            <h3>${descripcionEntrenamiento}</h3>
            <p>${formatearFecha(sesion.fecha)}</p>
            <p><strong>Peso Total Levantado:</strong> ${sesion.tonelaje} kg</p>
            <h4>Ejercicios:</h4>
            <ul>
                ${sesion.ejercicios.map(e => `<li>${e.cantidadSeries}x ${e.nombre} (${e.kilos} kg, ${e.repeticiones} reps)</li>`).join("")}
            </ul>
        `;
        listaSesiones.appendChild(tarjeta);
    });
}

async function mostrarDetallesSesion(idSesion) {
    try {
        const detallesSesion = await entrenamientoService.getById(idSesion);
        const modalContenido = document.getElementById("sessionDetails");

        // Rellenar el contenido del modal
        modalContenido.innerHTML = `
            <h2>${detallesSesion.nombre}</h2>
            <p><strong>Fecha:</strong> ${formatearFecha(detallesSesion.fecha)}</p>
            <div>
                ${detallesSesion.ejerciciosEntrenamientos.map(ejercicio => formatearEjercicioEnModal(ejercicio)).join("")}
            </div>
        `;

        // Abrir el modal
        const modal = new bootstrap.Modal(document.getElementById('sessionModal'));
        modal.show();

        // Agregar eventos a los botones
        document.getElementById("repetirEntrenamientoBtn").addEventListener("click", () => repetirEntrenamiento(idSesion));
        document.getElementById("borrarEntrenamiento").addEventListener("click", () => eliminarSesion(idSesion, modal));
        
    } catch (error) {
        console.error("Error al obtener detalles de la sesión o al mostrar el modal:", error);
    }
}

async function repetirEntrenamiento(idSesion) {
    // Buscar la sesión seleccionada
    const sesionSeleccionada = await entrenamientoService.getById(idSesion);

    // Guardar el objeto de la sesión completa en el localStorage para usarlo en la página de entrenamiento
    localStorage.setItem("entrenamientoARepetir", JSON.stringify(sesionSeleccionada));

    // Redirigir a la página de entrenamiento
    window.location.href = "../entrenamiento/entrenamiento.html";
}


async function eliminarSesion(idSesion, modal) {
    try {
        await entrenamientoService.deleteById(idSesion);
        sesiones = sesiones.filter(s => s.id !== idSesion); 
        mostrarSesiones(); 
        modal.hide(); 
    } catch (error) {
        console.error("Error al eliminar la sesión:", error);
    }
}

function formatearEjercicioEnModal(ejercicio) {
    return `
        <div>
            <h3 style="color: orange;">${ejercicio.idEjercicioNavigation.nombre}</h3>
            ${ejercicio.series.map(serie => `
                <p>Serie ${serie.orden}: ${serie.repeticion} reps x ${serie.kilo} kg</p>
            `).join("")}
        </div>
    `;
}

function formatearFecha(fechaStr) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaStr).toLocaleDateString('es-ES', opciones);
}

// Inicializa la aplicación
init();

function logIn() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "../login/login.html";
    }
}

function logOut() {
    localStorage.removeItem("token");
}

logIn();
document.getElementById("logout").addEventListener("click", logOut);
