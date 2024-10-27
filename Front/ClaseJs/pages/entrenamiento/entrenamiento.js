let ejercicioCounter = 0;
let serieCounter = 0;

// Función para añadir nuevo ejercicio
document.getElementById('add-ejercicio-btn').addEventListener('click', function () {
    const ejercicioSeleccionado = ""; // Aquí puedes hacer que el usuario seleccione el ejercicio
    ejercicioCounter++;
    addEjercicioToDOM(ejercicioCounter, ejercicioSeleccionado);
    saveData();
});

// Función para agregar ejercicio al DOM
function addEjercicioToDOM(ejercicioId, ejercicioNombre, series = []) {
    const newEjercicio = `
        <div class="container rounded-4 p-4" id="ejercicio-${ejercicioId}">
          <h4>${ejercicioNombre}</h4>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Serie</th>
                <th>Kg</th>
                <th>Repeticiones</th>
                <th>Tipo Serie</th>
                <th>Checked</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody id="series-table-${ejercicioId}">
            </tbody>
          </table>
          <button class="btn-add btn btn-primary mt-2" data-ejercicio-id="${ejercicioId}">Añadir Serie</button>
        </div>
    `;
    
    document.getElementById('ejercicios').insertAdjacentHTML('beforeend', newEjercicio);
    
    series.forEach(serie => {
        addSerieToDOM(ejercicioId, serie.serieId, serie.kg, serie.reps, serie.tSerie, serie.checked);
    });
}

// Función para añadir serie al DOM
function addSerieToDOM(ejercicioId, serieId, kg = 0, reps = 0, tSerie = "1", checked = false) {
    const table = document.getElementById(`series-table-${ejercicioId}`);
    const newRow = `
      <tr id="fila-serie-${ejercicioId}-${serieId}">
        <td>${serieId}</td>
        <td><input type="number" id="kg-${ejercicioId}-${serieId}" class="form-control" value="${kg}"></td>
        <td><input type="number" id="reps-${ejercicioId}-${serieId}" class="form-control" value="${reps}"></td>
        <td>
          <select id="tipoSerie-${ejercicioId}-${serieId}" class="form-select">
            <option value="1" ${tSerie == "1" ? "selected" : ""}>Tipo Serie</option>
            <option value="2" ${tSerie == "2" ? "selected" : ""}>Fuerza</option>
            <option value="3" ${tSerie == "3" ? "selected" : ""}>Lineal</option>
            <option value="4" ${tSerie == "4" ? "selected" : ""}>Piramidal</option>
          </select>
        </td>
        <td>
          <input type="checkbox" class="btn-check" id="btn-check-outlined-${ejercicioId}-${serieId}" ${checked ? "checked" : ""} autocomplete="off">
          <label class="btn btn-outline-success" for="btn-check-outlined-${ejercicioId}-${serieId}"><i class="fa fa-check" aria-hidden="true"></i></label>
        </td>
        <td><button class="btn-delete btn btn-danger" data-ejercicio-id="${ejercicioId}" data-serie-id="${serieId}">Eliminar</button></td>
      </tr>
    `;
    table.insertAdjacentHTML('beforeend', newRow);
}

// Función para guardar el estado en localStorage
function saveData() {
    let ejerciciosData = [];
    const ejercicios = document.getElementById('ejercicios').children;

    Array.from(ejercicios).forEach(ejercicio => {
        const ejercicioId = ejercicio.id.split('-')[1];
        const ejercicioNombre = ejercicio.querySelector('h4').innerText;
        const table = ejercicio.querySelector('tbody');
        const filas = table.querySelectorAll('tr');

        let series = [];
        filas.forEach(fila => {
            const serieId = fila.querySelector('td').innerText;
            const kg = document.getElementById(`kg-${ejercicioId}-${serieId}`).value;
            const reps = document.getElementById(`reps-${ejercicioId}-${serieId}`).value;
            const tSerie = document.getElementById(`tipoSerie-${ejercicioId}-${serieId}`).value;
            const checked = document.getElementById(`btn-check-outlined-${ejercicioId}-${serieId}`).checked;

            series.push({
                serieId: serieId,
                kg: kg,
                reps: reps,
                tSerie: tSerie,
                checked: checked
            });
        });

        ejerciciosData.push({
            ejercicioId: ejercicioId,
            ejercicioNombre: ejercicioNombre,
            series: series
        });
    });

    localStorage.setItem('ejerciciosData', JSON.stringify(ejerciciosData));
}

// Función para cargar el estado desde localStorage
function loadData() {
    const ejerciciosData = JSON.parse(localStorage.getItem('ejerciciosData'));
    if (!ejerciciosData) return;

    ejerciciosData.forEach(ejercicioData => {
        ejercicioCounter = Math.max(ejercicioCounter, ejercicioData.ejercicioId);
        addEjercicioToDOM(ejercicioData.ejercicioId, ejercicioData.ejercicioNombre, ejercicioData.series);
    });
}

// Cargar datos al inicio
window.onload = loadData;

// Detectar clicks en botones dinámicos
document.getElementById('ejercicios').addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('btn-add')) {
        const ejercicioId = e.target.getAttribute('data-ejercicio-id');
        const table = document.getElementById(`series-table-${ejercicioId}`);
        const rowCount = table.rows.length + 1;
        addSerieToDOM(ejercicioId, rowCount);
        saveData();
    }

    if (e.target && e.target.classList.contains('btn-delete')) {
        const ejercicioId = e.target.getAttribute('data-ejercicio-id');
        const serieId = e.target.getAttribute('data-serie-id');
        const fila = document.getElementById(`fila-serie-${ejercicioId}-${serieId}`);

        if (fila) {
            fila.remove();
            saveData();
        }
    }
});
