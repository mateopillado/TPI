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
            labels: ['2/9', '9/9', '16/9', '23/9', '30/9', '7/10', '14/10', '21/10', '28/10'],
            datasets: [{
                label: 'Entrenamientos',
                data: [2, 4, 1, 0, 0, 3, 1, 0, 5], // Datos de ejemplo
                backgroundColor: 'rgba(138, 43, 226, 0.7)', // Color púrpura para las barras
                borderColor: 'rgba(138, 43, 226, 1)',
                borderWidth: 1,
                borderRadius: 5, // Redondeo de las esquinas
                barPercentage: 0.6
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