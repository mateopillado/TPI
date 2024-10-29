function updateSliderValue(value) {
    document.getElementById("slider-value").textContent = value;
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Asignar colores aleatorios a los avatares
document.getElementById("avatar1").style.backgroundColor = getRandomColor();
// document.getElementById("avatar2").style.backgroundColor = getRandomColor();
// document.getElementById("avatar3").style.backgroundColor = getRandomColor();
document.getElementById("profile-pic").style.backgroundColor = getRandomColor();


document.addEventListener('DOMContentLoaded', () => {
    const shoulders = document.querySelectorAll('.shoulder');
    const chests = document.querySelectorAll('.chest');
    const arms = document.querySelectorAll('.arm');
    const legs = document.querySelectorAll('.leg');
    const abss = document.querySelectorAll('.abs');
    const backs = document.querySelectorAll('.back');

    const elementHover = (elements) => {
        elements.forEach(element => {
            element.addEventListener('mouseover', () => {
                elements.forEach(e => e.classList.add('highlight'));
            });
            element.addEventListener('mouseout', () => {
                elements.forEach(e => e.classList.remove('highlight'));
            });
        });
    }

    elementHover(shoulders);
    elementHover(chests);
    elementHover(arms);
    elementHover(legs);
    elementHover(backs);
    elementHover(abss);

    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const ctx = document.getElementById('trainingChart').getContext('2d');
        
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2/9', '9/9', '16/9', '23/9', '30/9', '7/10', '14/10'],
            datasets: [{
                label: 'Entrenamientos',
                data: [2, 4, 1, 0, 0, 3, 1], // Datos de ejemplo
                backgroundColor: '#ff9900', // Color púrpura para las barras
                borderColor: '#ff9900',
                borderWidth: 1,
                borderRadius: 5, // Redondeo de las esquinas
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Oculta la leyenda
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false, // Oculta la cuadrícula vertical
                        color: '#555'
                    },
                    ticks: {
                        color: '#e0e0e0' // Color de las etiquetas
                    }
                },
                y: {
                    grid: {
                        color: '#555' // Color de la cuadrícula horizontal
                    },
                    ticks: {
                        color: '#e0e0e0', // Color de las etiquetas
                        stepSize: 1 // Espaciado entre valores
                    },
                    beginAtZero: true
                }
            }
        }
    });

});


// RADAAAAAR

const radar = document.getElementById("radar");
      
      // Puntos con distancias en kilómetros
      const points = [
        { distance: 10, label: "km1" },
        { distance: 8, label: "km2" },
        { distance: 8, label: "km3" },
    
      ];
    
      // Tamaño del radar y ajuste de distancia máxima
      const radarRadius = 180; // El radio del círculo
      const maxDistance = 10; // La distancia máxima que se muestra en el radar
    
      // Función para generar posición según la distancia
      function getPositionByDistance(distance) {
        let angle = Math.random() * 2 * Math.PI; // Ángulo aleatorio en radianes
        let r = (distance / maxDistance) * radarRadius; // Escala la distancia en base al radio
        let x = r * Math.cos(angle);
        let y = r * Math.sin(angle);
        return { x, y };
      }
    
      // Crear puntos en el radar
      points.forEach(point => {
        const pointElement = document.createElement("div");
        pointElement.classList.add("point");
        pointElement.innerText = point.label;
    
        const position = getPositionByDistance(point.distance);
        pointElement.style.left = 200 + position.x + "px"; // 200px es el centro del radar
        pointElement.style.top = 200 + position.y + "px";
    
        radar.appendChild(pointElement);
      });