import ejercicioService from "../../services/ejercicioService.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Inicializa el contenido de la página
  await initializePage();
});

async function initializePage() {
  const ejercicios = await loadEjercicios();
  const sortedEjercicios = sortEjercicios(ejercicios);

  setupSearchFeature(sortedEjercicios);
  setupModalControls();
  setupTabNavigation();
  displayExercises(sortedEjercicios);

  document.querySelector('[data-tab="history"]').addEventListener("click", loadHistory);
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

  card.innerHTML = `
    <img src="${ejercicio.fotoPath}" class="rounded-top mb-3" alt="${ejercicio.nombre} Icon"> 
    <div class="card-body d-flex flex-column align-items-center justify-content-center">
        <h5 class="card-title">${ejercicio.nombre}</h5>
        <p class="card-text text-muted">${ejercicio.musculo}</p>
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

  modalTitle.innerText = ejercicio.nombre;
  exercisePhoto.src = ejercicio.fotoPath;
  modalDescription.innerText = ejercicio.instruccion;
  modalOverlay.style.display = "flex";

  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

  document.querySelector('[data-tab="about"]').classList.add('active');
  document.getElementById("about-content").style.display = 'flex';
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








// Función de historial
function loadHistory() {
  const historyList = document.getElementById("history-list");

  
  const historyData = [
    {
      nombre: "Lunes",
      fecha: "Friday, June 7, 2024 at 15:16",
      series: [
          { kilo: "40 kg", repeticion: "15", metric: "1RM", value: "65" },
          { kilo: "50 kg", repeticion: "8", metric: "1RM", value: "62" },
          { kilo: "55 kg", repeticion: "8", metric: "1RM", value: "68" }
      ]
  },
      {
          nombre: "Lunes",
          fecha: "Friday, June 7, 2024 at 15:16",
          series: [
              { kilo: "40 kg", repeticion: "15", metric: "1RM", value: "65" },
              { kilo: "50 kg", repeticion: "8", metric: "1RM", value: "62" },
              { kilo: "55 kg", repeticion: "8", metric: "1RM", value: "68" }
          ]
      },
      {
        nombre: "Lunes",
        fecha: "Friday, June 7, 2024 at 15:16",
        series: [
            { kilo: "40 kg", repeticion: "15", metric: "1RM", value: "65" },
            { kilo: "50 kg", repeticion: "8", metric: "1RM", value: "62" },
            { kilo: "55 kg", repeticion: "8", metric: "1RM", value: "68" }
        ]
    },
  ];

  // Vaciar historial previo
  historyList.innerHTML = "";

  
  historyData.forEach((entry) => {
      const historyItem = document.createElement("div");
      historyItem.className = "border border-white bg-dark text-white mb-3 p-2 rounded";

      historyItem.innerHTML = `
          <h5 class="mb-1">${entry.nombre}</h5>
          <small>${entry.fecha}</small>
          <div class="mt-2">
              ${entry.series
                  .map(
                      (set, index) => `
                      <div class="d-flex justify-content-between align-items-center">
                          <span>${index + 1}. ${set.kilo} × ${set.repeticion}</span>
                          <span>${set.metric} <strong>${set.value}</strong></span>
                      </div>`
                  )
                  .join("")}
          </div>
      `;
      
      historyList.appendChild(historyItem);
  });
}










function displayRecords() {
  const recordsContainer = document.getElementById("records-content");

  
  const recordsData = {
    estimated1RM: "9 kg",
    maxVolume: "163 kg",
    maxWeight: "6 kg",
    history: [
      { reps: 1, bestPerformance: "6 kg (x11)", date: "Jun 24, 2024", estimated: "9 kg" },
      { reps: 2, bestPerformance: "6 kg (x11)", date: "Jun 24, 2024", estimated: "9 kg" },
      { reps: 3, bestPerformance: "6 kg (x11)", date: "Jun 24, 2024", estimated: "8 kg" },
      { reps: 4, bestPerformance: "6 kg (x11)", date: "Jun 24, 2024", estimated: "8 kg" },
      { reps: 5, bestPerformance: "6 kg (x11)", date: "Jun 24, 2024", estimated: "8 kg" },
      
    ],
    totalReps: 37,
    totalVolume: "423 kg"
  };

  
  recordsContainer.innerHTML = `
    <div class="text-white">
      <h5 class="text-uppercase">Personal Records</h5>
      <div class="mb-3">
        <p>Estimated 1RM: ${recordsData.estimated1RM}</p>
        <p>Max volume: ${recordsData.maxVolume}</p>
        <p>Max weight: ${recordsData.maxWeight}</p>
      </div>
      
      <div class="d-flex justify-content-between text-uppercase text-muted mb-2">
        <div>Best Performance</div>
        <div>Estimated</div>
      </div>
      <hr class="bg-secondary">

      <!-- Contenedor con scroll para el historial de records -->
      <div class="records-history-container">
        ${recordsData.history
          .map(
            (record) => `
            <div class="d-flex justify-content-between">
              <div>
                <span>${record.reps} reps - ${record.bestPerformance}</span><br>
                <small>${record.date}</small>
              </div>
              <div><strong>${record.estimated}</strong></div>
            </div>
            <hr class="bg-secondary">
          `
          )
          .join("")}
      </div>
      
      <h6 class="text-uppercase mt-4">Lifetime Stats</h6>
      <p>Total reps: ${recordsData.totalReps}</p>
      <p>Total volume: ${recordsData.totalVolume}</p>
    </div>
  `;
}

document.querySelector('[data-tab="records"]').addEventListener("click", displayRecords);










