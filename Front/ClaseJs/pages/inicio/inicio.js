import usuarioService from "../../services/usuarioService.js";
import entrenaminetoService from "../../services/entrenaminetoService.js";

document.addEventListener("DOMContentLoaded", async () => {

    async function getUsuarios() {
        return await usuarioService.getUser().then(usuario => {
            return usuario.username;
        });
    }

    async function getEntrenamientos() {
        return await entrenaminetoService.getManyTraining().then(entrenamientos => {
            if (entrenamientos.ejerciciosEntrenamientos) {
                return entrenamientos.ejerciciosEntrenamientos.length;
            } else {
                return 0;
            }
        });
    }

    console.log(await getEntrenamientos());
    

    document.getElementById("profile-pic").textContent = await getUsuarios()
        .then(u => { return u.substring(0, 1).toUpperCase() });
    document.getElementById("username").textContent = await getUsuarios();
    document.getElementById("numEntrenamientos").textContent = await getEntrenamientos() + ' Entrenamientos realizados';

    initializeTooltip();
    initializeChart();
    initializeHoverEffect();
    initializeAvatarColors();
    initializeRadar();
    setupSlider();
});

// Función para actualizar el valor del slider
function updateSliderValue(value) {
    document.getElementById("slider-value").textContent = value;
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
    document.getElementById("avatar1").style.backgroundColor = getRandomColor();
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

// Inicializa el radar con puntos aleatorios basados en la distancia
function initializeRadar() {
    const radar = document.getElementById("radar");
    const radarRadius = 180;
    const maxDistance = parseFloat(document.getElementById("customRange").value);
    const points = [
        { distance: 1, label: "km1" },
        { distance: 5, label: "km2" },
        { distance: 10, label: "km3" }
    ];

    points.forEach(point => {
        const position = getPositionByDistance(point.distance, maxDistance, radarRadius);
        const pointElement = createRadarPoint(point.label, position);
        radar.appendChild(pointElement);
    });
}

// Función auxiliar para obtener posición aleatoria en el radar según distancia
function getPositionByDistance(distance, maxDistance, radarRadius) {
    const angle = Math.random() * 2 * Math.PI;
    const r = (distance / maxDistance) * radarRadius;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    return { x, y };
}

// Crea un punto en el radar con su respectiva etiqueta
function createRadarPoint(label, position) {
    const pointElement = document.createElement("div");
    pointElement.classList.add("point");
    pointElement.innerText = label;
    pointElement.style.left = `${200 + position.x}px`;
    pointElement.style.top = `${200 + position.y}px`;
    return pointElement;
}

// Configuración del slider
function setupSlider() {
    const slider = document.getElementById("customRange");
    slider.addEventListener("input", (event) => updateSliderValue(event.target.value));
}
