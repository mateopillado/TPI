import ejercicioService from "../../services/ejercicioService.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Inicializa el contenido de la página
  await initializePage();
});

async function initializePage() {
  // Mostrar el loader y ocultar el contenido principal
  document.getElementById("loader").style.display = "flex";
  document.getElementById("contentLoader").style.display = "none";

  try {
      const ejercicios = await loadEjercicios();
      const sortedEjercicios = sortEjercicios(ejercicios);

      setupSearchFeature(sortedEjercicios);
      setupModalControls();
      setupTabNavigation();
      displayExercises(sortedEjercicios);
  } catch (error) {
      console.error("Error al inicializar la página:", error);
  }

  // Ocultar el loader y mostrar el contenido después de cargar
  document.getElementById("loader").style.display = "none";
  document.getElementById("contentLoader").style.display = "block";
}







// Cargar y ordenar ejercicios
async function loadEjercicios() {
  return await ejercicioService.getAll();
}

function sortEjercicios(ejercicios) {
  return ejercicios.sort((a, b) =>
    a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase())
  );
}











// Mostrar lista de ejercicios filtrados
function displayExercises(ejercicios, filter = "") {
  const exerciseList = document.getElementById("exercise-list");
  exerciseList.innerHTML = "";
  let currentLetter = "";

  const filteredExercises = ejercicios.filter((ejercicio) =>
    ejercicio.nombre.toLowerCase().startsWith(filter.toLowerCase())
  );

  filteredExercises.forEach((ejercicio) => {
    const firstLetter = ejercicio.nombre.charAt(0).toUpperCase();
    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      createLetterGroup(exerciseList, currentLetter);
    }
    addExerciseCard(exerciseList, ejercicio);
  });
}

function createLetterGroup(exerciseList, letter) {
  const letterGroup = document.createElement("div");
  letterGroup.className = "letter-group mb-4";

  const separator = document.createElement("div");
  separator.className = "separator mb-2 text-warning fs-1 text-uppercase font-weight-bold";
  separator.innerText = letter;

  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container d-flex flex-wrap gap-3";

  letterGroup.appendChild(separator);
  letterGroup.appendChild(cardContainer);
  exerciseList.appendChild(letterGroup);
}

function addExerciseCard(exerciseList, ejercicio) {
  const card = document.createElement("div");
  card.className = "card text-white";
  card.onclick = () => showModal(ejercicio);

  const imageSrc = (ejercicio.fotoPath && /\.(jpg|jpeg|png|gif)$/i.test(ejercicio.fotoPath))
  ? ejercicio.fotoPath
  : "../../assets/images/noImagen.png";

card.innerHTML = `
  <img src="${imageSrc}" class="rounded-top mb-3 default-image" alt="${ejercicio.nombre} Icon"> 
  <div class="card-body d-flex flex-column align-items-center justify-content-center">
      <h5 class="card-title">${ejercicio.nombre}</h5>
  </div>
`;

  const currentCardContainer = exerciseList.querySelector(
    `.letter-group:last-child .card-container`
  );
  currentCardContainer.appendChild(card);
}











// Función de búsqueda y filtrado de ejercicios
function setupSearchFeature(ejercicios) {
  const searchInput = document.getElementById("search-input");
  const searchToggle = document.getElementById("search-toggle");
  
  searchInput.addEventListener("input", function () {
    const filter = this.value;
    displayExercises(ejercicios, filter);
  });

  searchToggle.addEventListener("click", function () {
    const searchContainer = document.querySelector(".search-container");
    if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
      searchContainer.style.display = "block";
      searchInput.focus();
    } else {
      searchContainer.style.display = "none";
    }
  });
}









// Función para mostrar modal
function showModal(ejercicio) {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const exercisePhoto = document.getElementById("exercise-photo");

  const imageSrc = (ejercicio.fotoPath && /\.(jpg|jpeg|png|gif)$/i.test(ejercicio.fotoPath))
  ? ejercicio.fotoPath
  : "../../assets/images/noImagen.png";

  modalTitle.innerText = ejercicio.nombre;
  exercisePhoto.src = imageSrc;
  modalDescription.innerText = ejercicio.instruccion;
  modalOverlay.style.display = "flex";

  // Resetear tabs
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
  document.querySelector('[data-tab="about"]').classList.add('active');
  document.getElementById("about-content").style.display = 'flex';

  // Cargar el historial del ejercicio seleccionado
  if (ejercicio.id) {
    loadHistory(ejercicio.id);
  } else {
    console.error("ID de ejercicio no encontrado.");
  }
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
}

function setupModalControls() {
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModalButton = document.getElementById("close-modal");

  closeModalButton.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}













// Función de navegación por pestañas
function setupTabNavigation() {
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
      button.classList.add('active');
      const tabContentId = button.getAttribute('data-tab') + '-content';
      document.getElementById(tabContentId).style.display = 'flex';
    });
  });
}


async function getRecors(id) {
  return await ejercicioService.getByRecords(id)
}




let ejercicioActual = null


// Función de historial
async function loadHistory(exerciseId) {
  const historyList = document.getElementById("history-list");

  // Vaciar historial previo
  historyList.innerHTML = "";

  if (!exerciseId) {
    console.error("Exercise ID no proporcionado.");
    historyList.innerHTML = `<p class="text-warning">No se ha seleccionado un ejercicio.</p>`;
    return;
  }

  try {
    // Llamada al endpoint para obtener el historial de entrenamientos
    const responseData = await ejercicioService.getById(exerciseId);
    console.log("Respuesta del backend:", responseData);
    ejercicioActual = responseData.ejercicio.id
    // Validar si la estructura contiene el historial
    if (!responseData || !Array.isArray(responseData.historial) || responseData.historial.length === 0) {
      historyList.innerHTML = `<p class="text-warning">No se encontraron entrenamientos para este ejercicio.</p>`;
      return;
    }

    // Recorrer el historial recibido del backend
    responseData.historial.forEach((entry) => {
      const historyItem = document.createElement("div");
      historyItem.className = "border border-white bg-dark text-white mb-3 p-2 rounded";

      // Convertir la fecha a un formato legible
      const fechaEntrenamiento = new Date(entry.fecha).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const descripcionEntrenamiento = (entry.descripcion && entry.descripcion !== "") 
        ? entry.descripcion 
        : "Sin nombre";

      // Crear el contenido HTML para cada entrada de historial
      historyItem.innerHTML = `
          <h5 class="mb-1">${descripcionEntrenamiento}</h5>
          <small>${fechaEntrenamiento}</small>
          <div class="mt-2">
              ${entry.series
                .map(
                  (set, index) => `
                  <div class="d-flex justify-content-between align-items-center">
                      <span>${set.orden}. ${set.kilos} kg × ${set.repeticiones} reps</span>
                      <span>${set.tipoSerie}</span>
                  </div>`
                )
                .join("")}
          </div>
      `;

      // Agregar el elemento al contenedor del historial
      historyList.appendChild(historyItem);
    });
  } catch (error) {
    console.error("Error al cargar el historial de entrenamientos:", error);
    historyList.innerHTML = `<p class="text-danger">Error al cargar el historial de entrenamientos.</p>`;
  }
}
let miGrafico; // Variable global para almacenar la instancia del gráfico

async function displayRecords() {

    const recordsContainer = document.getElementById("records-content");
    
    const ctx = document.getElementById('miGrafico').getContext('2d');

    console.log(ejercicioActual);

    const datos = await getRecors(ejercicioActual);

    let cont = 0;
    console.log(datos)

    const puntos = datos.map((index) => {
        cont++;
        return { x: cont, y: index.kilos }; // 'x' es el número de serie y 'y' el peso
    });

    console.log(puntos);



    // Verificar si el gráfico existe y destruirlo antes de crear uno nuevo
    if (miGrafico instanceof Chart) {
        miGrafico.destroy();
    }

    // Crear el gráfico con tipo 'line' para conectar los puntos
    miGrafico = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                data: puntos,
                backgroundColor: '#ffc107', // Color del punto
                borderColor: '#ffc107', // Color de la línea y el borde del punto
                pointRadius: 6, // Tamaño de los puntos
                pointStyle: 'circle', // Estilo de los puntos (puedes cambiar a 'rect', 'triangle', etc.)
                fill: false, // No rellenar el área bajo la línea
                tension: 0.1 // Ajusta la curvatura de la línea (0 para línea recta, >0 para curvatura)
            }]
        },
        options: {
          showLine: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Número de Serie'
                    },
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Peso (kg)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Peso: ${context.raw.y} kg`; // Tooltip para mostrar el peso
                        }
                    }
                }
            }
        }
    });
}



document.querySelector('[data-tab="records"]').addEventListener("click", displayRecords);


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







