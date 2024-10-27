var ejercicios = [
    { nombre: "Plano", musculo: "Pecho" },
    { nombre: "Inclinado", musculo: "Pecho" },
    { nombre: "Ab Crunch", musculo: "Abdominales" },
    { nombre: "Burpees", musculo: "Todo el cuerpo" },
    { nombre: "Sentadillas", musculo: "Piernas" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
    { nombre: "Ab Roller", musculo: "Abdominales" },
];

ejercicios.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));

const exerciseList = document.getElementById("exercise-list");

function displayExercises(filter = "") {
    exerciseList.innerHTML = ""; 
    let currentLetter = "";

    const filteredExercises = ejercicios.filter(ejercicio => 
        ejercicio.nombre.toLowerCase().startsWith(filter.toLowerCase())
    );

    filteredExercises.forEach(ejercicio => {
        const firstLetter = ejercicio.nombre.charAt(0).toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;

            const letterGroup = document.createElement("div");
            letterGroup.className = "letter-group";

            const separator = document.createElement("div");
            separator.className = "separator text-uppercase font-weight-bold";
            separator.innerText = currentLetter;

            const cardContainer = document.createElement("div");
            cardContainer.className = "card-container";

            letterGroup.appendChild(separator);
            letterGroup.appendChild(cardContainer);
            exerciseList.appendChild(letterGroup);
        }

        const card = document.createElement("div");
        card.className = "card text-white ";

        card.innerHTML = `
            <img src="../../assets/images/bench.png" alt="${ejercicio.nombre} Icon"> 
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

document.getElementById("search-input").addEventListener("input", function() {
    const filter = this.value; 
    displayExercises(filter); 
});

displayExercises();

document.getElementById("search-toggle").addEventListener("click", function() {
    const searchContainer = document.querySelector(".search-container");
    if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
        searchContainer.style.display = "block";
        document.getElementById("search-input").focus(); 
    } else {
        searchContainer.style.display = "none"; 
    }
});

// document.addEventListener("click", function(event) {
//     const searchContainer = document.querySelector(".search-container");
//     const searchButton = document.getElementById("search-toggle");

//     if (!searchContainer.contains(event.target) && !searchButton.contains(event.target)) {
//         searchContainer.style.display = "none";
//     }
// });
