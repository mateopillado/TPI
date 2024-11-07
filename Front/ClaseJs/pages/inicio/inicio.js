import usuarioService from "../../services/usuarioService.js";
import ContactoService from "../../services/contactoService.js";
import coorService from "../../services/coorService.js";

let contacto = {};
let contactoNull = true;

 
async function postContacto(data) {
    return await ContactoService.postContacto(data);
}


async function putContacto(data) {
    return await ContactoService.putContacto(data);
}


async function getContact() {
    let a = await ContactoService.getById();
    a.id = 0
    return a[0]
}

document.addEventListener("DOMContentLoaded", async () => {
    logIn();

    async function getUsuarios() {
        return await usuarioService.getUser().then(usuario => {
            return usuario.username;
        });
    }

    async function getEntrenamientos() {
        return await usuarioService.getUser().then(entrenamientos => {
            return entrenamientos.cantidadEntrenamientos
        });
    }

    async function getAVG() {
        return await usuarioService.getUser().then(avg => {
            return avg.musculos;
        });
    }

    async function getRadar(km) {
        return await usuarioService.radar(km)
    }

    
    contacto = await getContact();
    console.log(contacto);
    
    if (contacto != undefined){

        if (contacto.id > 0 && contacto) {
            contactoNull = false
        }
    }
    
   
    async function getDataChart() {
        return await usuarioService.getUser().then(entrenamientos => {
            return entrenamientos.entrenamientos;
        });
    }

    // const  radarDatos = await getRadar(10)
    // console.log(radarDatos)
    
    let avg = await getAVG();
    let cantEntrenamientos = await getEntrenamientos();
    
    console.log(avg.map(musculo => {return musculo.grupoMuscular.toLowerCase() + '-back'}));


    const initTooltips = () => {
        avg.map(musculo => {
          const element = document.getElementById(musculo.grupoMuscular.toLowerCase())
          const elementBack =document.getElementById(musculo.grupoMuscular.toLowerCase() + '-back')
          if (element) {
            let porcentaje = parseFloat(musculo.porcentaje).toFixed(2);
            element.setAttribute('title', `Grupo Muscular: ${musculo.grupoMuscular}<br>Cantidad: ${musculo.cant}<br>Porcentaje: ${porcentaje}%`);
        }
        if (elementBack) {
            let porcentaje = parseFloat(musculo.porcentaje).toFixed(2);
            elementBack.setAttribute('title', `Grupo Muscular: ${musculo.grupoMuscular}<br>Cantidad: ${musculo.cant}<br>Porcentaje: ${porcentaje}%`);
          }
        });

        new bootstrap.Tooltip(document.body, {
            selector: '[data-bs-toggle="tooltip"]'
        });
      };

    document.getElementById("profile-pic").textContent = await getUsuarios()
        .then(u => { return u.substring(0, 1).toUpperCase() });
    document.getElementById("username").textContent = await getUsuarios();
    document.getElementById("numEntrenamientos").textContent = cantEntrenamientos === 1 ? "1 entrenamiento realizado" : `${cantEntrenamientos} entrenamientos realizados` ; 

    initTooltips();
    initializeChart( await getDataChart());
    initializeHoverEffect();
    initializeAvatarColors();
    document.getElementById("buscarProfesor").addEventListener("click", async () => {
        let listRadar = document.getElementById('resultadosRadar')
        listRadar.innerHTML = ''
        const km = document.getElementById("customRange").value;
        document.getElementById("slider-value").textContent = km;
        const radarDatos = await getRadar(km);
        initializeRadar(radarDatos, km);
        if (radarDatos.length == 0) {
            const sinNadie = document.createElement("p");
            sinNadie.classList.add("sinNadie");
            sinNadie.innerHTML = 'No hay nadie cerca 😭'
            listRadar = document.getElementById('resultadosRadar')
            listRadar.appendChild(sinNadie)
        } else {
            initializeRadar(radarDatos, km);
        }
       
    });
    document.getElementById("customRange").addEventListener("mouseup", updateSliderValue);
    document.getElementById("logOutBtn").addEventListener("click", logOut);
});

document.getElementById("editButtonContact").addEventListener('click', () => {
    enableEditing()
})

document.getElementById("saveButtonContact").addEventListener('click', () => {
    saveContactData()
})

// Función para cargar datos en el formulario
async function loadContactData() {
    document.getElementById('socialMedia1').value = contacto.redSocial1 || '';
    document.getElementById('socialMedia2').value = contacto.redSocial2 || '';
    document.getElementById('phoneNumber').value = contacto.telefono || '';
    document.getElementById('email').value = contacto.email || '';
    disableFields();
}

// Función para habilitar los campos de edición y el botón de guardar
function enableEditing() {
    document.getElementById('socialMedia1').disabled = false;
    document.getElementById('socialMedia2').disabled = false;
    document.getElementById('phoneNumber').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('saveButtonContact').disabled = false; // Habilita el botón de guardar
    document.getElementById('editButtonContact').disabled = true;  // Deshabilita el botón de editar mientras se edita
}

// Función para deshabilitar los campos después de guardar o al cargar
function disableFields() {
    document.getElementById('socialMedia1').disabled = true;
    document.getElementById('socialMedia2').disabled = true;
    document.getElementById('phoneNumber').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('saveButtonContact').disabled = true; // Deshabilita el botón de guardar
    document.getElementById('editButtonContact').disabled = false; // Habilita el botón de editar nuevamente
}

// Función para guardar los datos del formulario
async function saveContactData() {

    let newContacto = {}

    newContacto.redSocial1 = document.getElementById('socialMedia1').value;
    newContacto.redSocial2 = document.getElementById('socialMedia2').value;
    newContacto.telefono = document.getElementById('phoneNumber').value;
    newContacto.email = document.getElementById('email').value;

    console.log(newContacto)

    if (contactoNull) {
        
        await postContacto(newContacto)
        contacto = await getContact();
        loadContactData();  
    }
    else{
        newContacto.id = contacto.id
        await putContacto(newContacto)
        contacto = await getContact();
       
        loadContactData()
    }


    const modalElement = document.getElementById('addContactsModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement); // Obtener la instancia del modal
    modalInstance.hide(); // Cerrar el modal

    disableFields();
}

// Cargar los datos cuando se abre el modal
document.getElementById('addContactsModal').addEventListener('show.bs.modal', loadContactData);


// Función para actualizar el valor del slider
function updateSliderValue() {
    console.log(document.getElementById("slider-value").textContent = document.getElementById("customRange").value)
    return document.getElementById("slider-value").textContent = document.getElementById("customRange").value;
}


// Función para obtener un color aleatorio en formato hexadecimal
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Inicializa los colores de fondo de los avatares
function initializeAvatarColors() {
    document.getElementById("profile-pic").style.backgroundColor = getRandomColor();
}

// Agrega efecto hover para resaltar elementos de músculos
function initializeHoverEffect() {
    const muscleGroups = {
        shoulders: '.shoulder',
        chests: '.chest',
        arms: '.arm',
        legs: '.leg',
        abs: '.abs',
        backs: '.back',
    };

    Object.values(muscleGroups).forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('mouseover', () => elements.forEach(e => e.classList.add('highlight')));
            element.addEventListener('mouseout', () => elements.forEach(e => e.classList.remove('highlight')));
        });
    });
}

// Inicializa los tooltips de Bootstrap
function initializeTooltip() {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

// Configura el gráfico de entrenamientos
function initializeChart(entrenamientos) {
    const ctx = document.getElementById('trainingChart').getContext('2d');
    const labels = getLast5WeeksLabels();
    const data = getTrainingDataForLast5Weeks(entrenamientos, labels);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Entrenamientos',
                data: data,
                backgroundColor: '#ff9900',
                borderColor: '#ff9900',
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#e0e0e0' }
                },
                y: {
                    grid: { color: '#555' },
                    ticks: {
                        color: '#e0e0e0',
                        stepSize: 1
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function getLast5WeeksLabels() {
    const labels = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 5; i++) {
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1 - (i * 7));
        
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Añadir 6 días para obtener el último día de la semana

        const startDay = firstDayOfWeek.getDate();
        const startMonth = firstDayOfWeek.getMonth() + 1; // Los meses son 0-indexados
        const endDay = lastDayOfWeek.getDate();
        const endMonth = lastDayOfWeek.getMonth() + 1;

        labels.unshift(`${startDay}/${startMonth} - ${endDay}/${endMonth}`);
    }
    return labels;
}

function getTrainingDataForLast5Weeks(entrenamientos, labels) {
    // Inicializar el array con ceros para cada semana
    const data = Array(labels.length).fill(0);
    
    entrenamientos.forEach(item => {
        const startDate = new Date(item.desde);
        const endDate = new Date(item.hasta);

        labels.forEach((label, index) => {
            const [startLabel, endLabel] = label.split(' - ');
            const [startDay, startMonth] = startLabel.split('/').map(Number);
            const [endDay, endMonth] = endLabel.split('/').map(Number);

            const labelStartDate = new Date(startDate.getFullYear(), startMonth - 1, startDay);
            const labelEndDate = new Date(startDate.getFullYear(), endMonth - 1, endDay);

            // Comparar si el rango del entrenamiento cae dentro del rango de la semana
            if ((startDate >= labelStartDate && startDate <= labelEndDate) ||
                (endDate >= labelStartDate && endDate <= labelEndDate) ||
                (startDate <= labelStartDate && endDate >= labelEndDate)) {
                data[index] += item.cantidad;
            }
        });
    });
    
    return data;
}



// RADAAAAAR

function initializeRadar(radarDatos, km) {
    const radar = document.getElementById("radar");

    // Limpiar radar antes de agregar nuevos puntos
    while (radar.firstChild) {
        radar.removeChild(radar.firstChild);
    }

    const radarRadius = 135; // Nuevo radio ajustado para el tamaño de 270x270
    const maxDistance = km;

    function getPositionByDistance(distance) {
        let angle = Math.random() * 2 * Math.PI;
        let r = (distance / maxDistance) * radarRadius;
        let x = r * Math.cos(angle);
        let y = r * Math.sin(angle);
        return { x, y };
    }

    const container = document.getElementById('resultadosRadar');
    container.innerHTML = '';

    radarDatos.forEach(point => {
        const pointElement = document.createElement("div");
        pointElement.classList.add("point");
        pointElement.setAttribute('data-label', point.nombreCompleto.substring(0, point.nombreCompleto.indexOf(' ')));
        const position = getPositionByDistance(point.distancia);
        pointElement.style.left = 135 + position.x + "px"; // Centrado en el nuevo radar de 270x270
        pointElement.style.top = 135 + position.y + "px"; // Centrado en el nuevo radar de 270x270
        radar.appendChild(pointElement);
    });

    radarDatos.forEach((contact, index) => {
        const card = document.createElement('div');
        card.className = "card col-lg-10 bg-light text-dark mb-3 p-3 d-flex flex-row align-items-center";
        card.innerHTML = `
            <div class="avatar" id="avatar${index + 1}" style="background-color: ${getRandomColor()};">${contact.nombreCompleto.charAt(0).toUpperCase()}</div>
            <div>
                <h5 class="mb-0 text-start">${contact.nombreCompleto}</h5>
                <div class="text-start">
                    <p class="m-0">Contacto: ${contact.redSocial}</p>
                    <small class="text-dark">Distancia: ${Math.trunc(contact.distancia)} Km</small>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}


function logIn(){
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "../login/login.html";
    }
}

function logOut() {
    localStorage.removeItem("token");
}
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(guardarPosicion, manejarError);
    } else {
        console.log("La geolocalización no es soportada por este navegador.");
    }
}

async function guardarPosicion(posicion) {
    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;
    console.log("Latitud: " + latitud);
    console.log("Longitud: " + longitud);
    let data = {
        latitud: latitud,
        longitud: longitud,
        personaId:0,
        fecha: new Date().toISOString()
    }
    await coorService.saveCoor(data)
    
}

function manejarError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("El usuario denegó el permiso para la geolocalización.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("La información de ubicación no está disponible.");
            break;
        case error.TIMEOUT:
            console.log("La solicitud para obtener la ubicación ha caducado.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("Ha ocurrido un error desconocido.");
            break;
    }
}

obtenerUbicacion();

