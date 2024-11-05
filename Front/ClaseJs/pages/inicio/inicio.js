import usuarioService from "../../services/usuarioService.js";

document.addEventListener("DOMContentLoaded", async () => {
    // logIn();

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
    initializeChart();
    initializeHoverEffect();
    initializeAvatarColors();
    document.getElementById("buscarProfesor").addEventListener("click", async () => {
        const km = document.getElementById("customRange").value;
        document.getElementById("slider-value").textContent = km;
        const radarDatos = await getRadar(km);
        initializeRadar(radarDatos, km);
    });
    document.getElementById("customRange").addEventListener("mouseup", updateSliderValue);
    document.getElementById("logOutBtn").addEventListener("click", logOut);
});

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
    // document.getElementById("avatar1").style.backgroundColor = getRandomColor();
    // document.getElementById("avatar2").style.backgroundColor = getRandomColor();
    // document.getElementById("avatar3").style.backgroundColor = getRandomColor();
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
function initializeChart() {
    const ctx = document.getElementById('trainingChart').getContext('2d');
    const labels = getLast7WeeksLabels();
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Entrenamientos',
                data: [2, 4, 1, 0, 0, 3, 5],
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

function getLast7WeeksLabels() {
    const labels = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 7; i++) {
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1 - (i * 7));
        const day = firstDayOfWeek.getDate();
        const month = firstDayOfWeek.getMonth() + 1; // Months are zero-based
        labels.unshift(`${day}/${month}`);
    }
    return labels;
}




// RADAAAAAR

function initializeRadar(radarDatos, km) {
    const radar = document.getElementById("radar");

    // Limpiar radar antes de agregar nuevos puntos
    while (radar.firstChild) {
        radar.removeChild(radar.firstChild);
    }

    const radarRadius = 180;
    const maxDistance = km;

    function getPositionByDistance(distance) {
        let angle = Math.random() * 2 * Math.PI;
        let r = (distance / maxDistance) * radarRadius;
        let x = r * Math.cos(angle);
        let y = r * Math.sin(angle);
        return { x, y };
    }

    radarDatos.forEach(point => {
        const pointElement = document.createElement("div");
        pointElement.classList.add("point");
        pointElement.setAttribute('data-label', point.nombreCompleto.substring(0, point.nombreCompleto.indexOf(' ')));
        const position = getPositionByDistance(point.distancia);
        pointElement.style.left = 200 + position.x + "px";
        pointElement.style.top = 200 + position.y + "px";
        radar.appendChild(pointElement);
    });

    const container = document.getElementById('resultadosRadar');
    container.innerHTML = '';
    
    radarDatos.forEach((contact, index) => {
        const card = document.createElement('div');
        card.className = "card col-lg-10 bg-light text-dark mb-3 p-3 d-flex flex-row align-items-center";
        card.innerHTML = `
            <div class="avatar" id="avatar${index + 1}" style="background-color: ${getRandomColor()};">${contact.nombreCompleto.charAt(0).toUpperCase()}</div>
            <div>
                <h5 class="mb-0 text-start">${contact.nombreCompleto}</h5>
                <div class="text-start">
                    <p class="m-0">Contacto: ${contact.redSocial}</p>
                    <small class="text-dark">Distancia: ${Math.round(contact.distancia,2)} Km</small>
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
