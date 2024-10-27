// Flag to check if the main structure is initialized
let isInitialized = false;

export const renderEntrenamiento = (container) => {
  // Check if content has already been initialized to avoid resetting
  if (!isInitialized) {
    container.innerHTML = `
      <h3>Selecciona un Ejercicio:</h3>
      <select id="lista-ejercicios">
        <option value="Press De Banca">Press de Banca</option>
        <option value="Sentadilla">Sentadilla</option>
        <option value="Peso Muerto">Peso Muerto</option>
        <option value="Dominadas">Dominadas</option>
      </select>
      <button id="add-ejercicio-btn">Agregar Ejercicio</button>

      <div id="ejercicios">
        <!-- Aquí se insertarán los ejercicios dinámicamente -->
      </div>

      <button id="guardar-btn">Guardar Entrenamiento</button>
    `;
    isInitialized = true;  // Set flag to true to prevent re-rendering structure
  }

  let ejercicioCounter = 0; // Counter for exercises

  // Load exercises from localStorage if they exist
  const savedData = JSON.parse(localStorage.getItem('entrenamientoData')) || [];
  if (savedData.length > 0) cargarEjerciciosDesdeLocalStorage(savedData);

  // Function to load saved exercises
  function cargarEjerciciosDesdeLocalStorage(data) {
    data.forEach((ejercicio) => {
      ejercicioCounter++;
      const newEjercicio = crearEjercicioHTML(ejercicio.nombre, ejercicioCounter, ejercicio.series);
      document.getElementById('ejercicios').insertAdjacentHTML('beforeend', newEjercicio);
    });
  }

  // Function to create HTML for a new exercise
  function crearEjercicioHTML(nombre, ejercicioId, series = []) {
    return `
      <div class="container" id="ejercicio-${ejercicioId}">
        <h4>${nombre}</h4>
        <table class="table table-dark">
          <thead>
            <tr>
              <th>Serie</th>
              <th>Kg</th>
              <th>Repeticiones</th>
              <th>RPE</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="series-table-${ejercicioId}">
            ${series.map((serie, index) => crearSerieHTML(ejercicioId, index + 1, serie)).join('')}
          </tbody>
        </table>
        <button class="btn-add" data-ejercicio-id="${ejercicioId}">Añadir Serie</button>
      </div>
    `;
  }

  // Function to create HTML for a new series within an exercise
  function crearSerieHTML(ejercicioId, serieId, serie = {}) {
    return `
      <tr id="fila-serie-${ejercicioId}-${serieId}">
        <td>${serieId}</td>
        <td><input type="number" id="kg-${ejercicioId}-${serieId}" class="form-control" value="${serie.kg || 20}"></td>
        <td><input type="number" id="reps-${ejercicioId}-${serieId}" class="form-control" value="${serie.reps || 12}"></td>
        <td><input type="number" id="rpe-${ejercicioId}-${serieId}" class="form-control" value="${serie.rpe || 8.5}"></td>
        <td><button class="btn-delete" data-ejercicio-id="${ejercicioId}" data-serie-id="${serieId}">Eliminar</button></td>
      </tr>
    `;
  }

  // Handle Add Exercise button
  document.getElementById('add-ejercicio-btn').addEventListener('click', function () {
    const ejercicioSeleccionado = document.getElementById('lista-ejercicios').value;
    ejercicioCounter++;
    const newEjercicio = crearEjercicioHTML(ejercicioSeleccionado, ejercicioCounter);
    document.getElementById('ejercicios').insertAdjacentHTML('beforeend', newEjercicio);
    saveData(); // Save after adding a new exercise
  });

  // Event delegation for adding and deleting series
  document.getElementById('ejercicios').addEventListener('click', function (e) {
    const ejercicioId = e.target.getAttribute('data-ejercicio-id');
    if (e.target && e.target.classList.contains('btn-add')) {
      const table = document.getElementById(`series-table-${ejercicioId}`);
      const rowCount = table.rows.length + 1;
      const newRow = crearSerieHTML(ejercicioId, rowCount);
      table.insertAdjacentHTML('beforeend', newRow);
      saveData(); // Save after adding a new series
    }

    if (e.target && e.target.classList.contains('btn-delete')) {
      const serieId = e.target.getAttribute('data-serie-id');
      const fila = document.getElementById(`fila-serie-${ejercicioId}-${serieId}`);
      if (fila) fila.remove();
      saveData(); // Save after deleting a series
    }
  });

  // Save data to localStorage
  function saveData() {
    const ejercicios = document.getElementById('ejercicios').children;
    const datos = Array.from(ejercicios).map((ejercicio) => {
      const ejercicioId = ejercicio.id.split('-')[1];
      const ejercicioNombre = ejercicio.querySelector('h4').innerText;
      const series = Array.from(ejercicio.querySelectorAll('tbody tr')).map((fila) => {
        const serieId = fila.querySelector('td').innerText;
        const kg = document.getElementById(`kg-${ejercicioId}-${serieId}`).value;
        const reps = document.getElementById(`reps-${ejercicioId}-${serieId}`).value;
        const rpe = document.getElementById(`rpe-${ejercicioId}-${serieId}`).value;
        return { serie: serieId, kg, reps, rpe };
      });
      return { nombre: ejercicioNombre, series };
    });
    localStorage.setItem('entrenamientoData', JSON.stringify(datos));
  }

  // Add a click listener to save the data when clicking the "Guardar Entrenamiento" button
  document.getElementById('guardar-btn').addEventListener('click', saveData);
};
