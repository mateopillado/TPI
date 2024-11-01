import ejercicioService from "../../services/ejercicioService.js";


document.addEventListener("DOMContentLoaded", async () => {
 

  async function getEjercicios() {
    return await ejercicioService.getAll();
  }

  var ejercicios = await getEjercicios();

  ejercicios.sort((a, b) =>
    a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase())
  );

  const exerciseList = document.getElementById("exercise-list");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModalButton = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const exerciseGif = document.getElementById("exercise-gif");

  function displayExercises(filter = "") {
    exerciseList.innerHTML = "";
    let currentLetter = "";

    const filteredExercises = ejercicios.filter((ejercicio) =>
      ejercicio.nombre.toLowerCase().startsWith(filter.toLowerCase())
    );

    filteredExercises.forEach((ejercicio) => {
      const firstLetter = ejercicio.nombre.charAt(0).toUpperCase();

      if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;

        const letterGroup = document.createElement("div");
        letterGroup.className = "letter-group mb-4";

        const separator = document.createElement("div");
        separator.className =
          "separator mb-2 text-warning fs-1 text-uppercase font-weight-bold";
        separator.innerText = currentLetter;

        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container d-flex flex-wrap gap-3";

        letterGroup.appendChild(separator);
        letterGroup.appendChild(cardContainer);
        exerciseList.appendChild(letterGroup);
      }

      const card = document.createElement("div");
      card.className = "card text-white";
      card.onclick = () => showModal(ejercicio);

      card.innerHTML = `
    <img src="${ejercicio.img}" class="rounded-top mb-3" alt="${ejercicio.nombre} Icon"> 
    <div class="card-body d-flex flex-column align-items-center justify-content-center">
        <h5 class="card-title">${ejercicio.nombre}</h5>
        <p class="card-text text-muted">${ejercicio.musculo}</p>
    </div>
`;

      const currentCardContainer = exerciseList.querySelector(
        `.letter-group:last-child .card-container`
      );
      currentCardContainer.appendChild(card);
    });
  }

  function showModal(ejercicio) {
    modalTitle.innerText = ejercicio.nombre;
    exerciseGif.src = ejercicio.gif;
    modalDescription.innerText = ejercicio.descripcion;
    modalOverlay.style.display = "flex";
  }

  closeModalButton.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  function closeModal() {
    modalOverlay.style.display = "none";
    exerciseGif.src = ""; // Elimina la fuente del GIF al cerrar
  }

  document
    .getElementById("search-input")
    .addEventListener("input", function () {
      const filter = this.value;
      displayExercises(filter);
    });

  displayExercises();

  document
    .getElementById("search-toggle")
    .addEventListener("click", function () {
      const searchContainer = document.querySelector(".search-container");
      if (
        searchContainer.style.display === "none" ||
        searchContainer.style.display === ""
      ) {
        searchContainer.style.display = "block";
        document.getElementById("search-input").focus();
      } else {
        searchContainer.style.display = "none";
      }
    });
});
