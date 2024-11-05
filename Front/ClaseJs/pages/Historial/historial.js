import entrenamientoService from "../../services/entrenamientoService.js";

let sesiones = [];

async function init() {
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
}

function mostrarSesiones() {
    const listaSesiones = document.getElementById("sessionList");
    listaSesiones.innerHTML = "";

    sesiones.forEach(sesion => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("session-card");
        tarjeta.onclick = function() {
            mostrarDetallesSesion(sesion.id); 
        };

        console.log(sesion)

        tarjeta.innerHTML = `
            <h3>${sesion.nombre || 'Sin nombre'}</h3>
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

// async function mostrarDetallesSesion(idSesion) {
//     try {
//         // Llama al servicio para obtener detalles de la sesión por ID
//         const detallesSesion = await entrenamientoService.getById(idSesion);

//         // Llena el modal con los datos detallados
//         const modalContenido = document.getElementById("sessionDetails");
//         modalContenido.innerHTML = `
//             <h2>${detallesSesion.nombre}</h2>
//             <p><strong>Fecha:</strong> ${formatearFecha(detallesSesion.fecha)}</p>
//             <p><strong>Entrenador:</strong> ${detallesSesion.idPersona}</p>
//             <div>
//                 ${detallesSesion.ejerciciosEntrenamientos.map(ejercicio => formatearEjercicioEnModal(ejercicio)).join("")}
//             </div>
//         `;

//         // Mostrar el modal
//         const modal = new bootstrap.Modal(document.getElementById('sessionModal'));
//         modal.show();
//     } catch (error) {
//         console.error("Error al obtener detalles de la sesión:", error);
//     }
// }

async function mostrarDetallesSesion(idSesion) {
    try {
        const detallesSesion = await entrenamientoService.getById(idSesion);
        const modalContenido = document.getElementById("sessionDetails");

        // Rellenar el contenido del modal
        modalContenido.innerHTML = `
            <h2>${detallesSesion.nombre}</h2>
            <p><strong>Fecha:</strong> ${formatearFecha(detallesSesion.fecha)}</p>
            <p><strong>Entrenador:</strong> ${detallesSesion.idPersona}</p>
            <div>
                ${detallesSesion.ejerciciosEntrenamientos.map(ejercicio => formatearEjercicioEnModal(ejercicio)).join("")}
            </div>
        `;

        // Abrir el modal
        const modal = new bootstrap.Modal(document.getElementById('sessionModal'));
        modal.show();

        
        // Agregar evento click al botón de repetir solo si el modal se abre correctamente
        document.getElementById("repetirEntrenamientoBtn").addEventListener("click",()=>{repetirEntrenamiento(idSesion)});
        

    } catch (error) {
        console.error("Error al obtener detalles de la sesión o al mostrar el modal:", error);
    }
}


function repetirEntrenamiento(sesion) {
    // Guardar el objeto de la sesión en el localStorage
    localStorage.setItem("entrenamientoARepetir", JSON.stringify(sesion));
    // console.log(sesion)
    // Redirigir a la página de entrenamiento
    window.location.href = "../entrenamiento/entrenamiento.html";
}




function formatearEjercicioEnModal(ejercicio) {
    return `
        <div>
            <h3  style="color: orange;">${ejercicio.idEjercicioNavigation.nombre}</h3>
            
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

function logIn(){
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