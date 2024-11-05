import ejercicioService from "../../services/ejercicioService.js";
import entrenamientoService from "../../services/entrenamientoService.js";

document.addEventListener("DOMContentLoaded", async () => {
  async function getEjercicios() {
    return await ejercicioService.getAll();
  }

  const ejercicios = await getEjercicios();
  let ejercicioCounter = 0;

  // Configuración de los tabs de navegación
  document.querySelectorAll('#nav-tab>[data-bs-toggle="tab"]').forEach(el => {
    el.addEventListener('shown.bs.tab', () => {
      const target = el.getAttribute('data-bs-target');
      const scrollElem = document.querySelector(`${target} [data-bs-spy="scroll"]`);
      bootstrap.ScrollSpy.getOrCreateInstance(scrollElem).refresh();
    });
  });

  // Función para agregar un ejercicio al DOM
  function addEjercicioToDOM(ejercicioId, ejercicioNombre, series = [{ serieId: 1, kg: 0, reps: 0, tSerie: "1", checked: false }]) {
    const newEjercicioHTML = `
      <div class="container rounded-4 pl-4 mt-5" id="ejercicio-${ejercicioId}">
        <div class="d-flex flex-row align-items-center mb-2 justify-content-between">
          <h4 class="me-4">${ejercicioNombre}</h4>
          <input type="text" placeholder="Nota:" class="notasEjercicio" id="nota-${ejercicioId}">
        </div>
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
    document.getElementById('ejercicios').insertAdjacentHTML('beforeend', newEjercicioHTML);

    // Añadir cada serie al ejercicio
    series.forEach(serie => addSerieToDOM(ejercicioId, serie.serieId, serie.kg, serie.reps, serie.tSerie, serie.checked));
  }

  // Función para agregar una serie al DOM
  function addSerieToDOM(ejercicioId, serieId, kg = 0, reps = 0, tSerie = "1", checked = false) {
    const table = document.getElementById(`series-table-${ejercicioId}`);
    const newRowHTML = `
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
    table.insertAdjacentHTML('beforeend', newRowHTML);
  }

  // Nueva función para guardar el estado en localStorage
  function saveData() {
    const ejerciciosData = [];
    const ejercicios = document.getElementById('ejercicios').children;
  
    Array.from(ejercicios).forEach(ejercicio => {
      const ejercicioId = ejercicio.id.split('-')[1];
      const nombreEjercicio = ejercicio.querySelector('h4').innerText;
      const nota = document.getElementById(`nota-${ejercicioId}`).value;
      const series = [];
  
      // Iterar sobre cada fila de serie para capturar sus valores
      ejercicio.querySelectorAll('tbody tr').forEach((fila, index) => {
        const serieId = index + 1; // Generar el ID de la serie para evitar duplicaciones
        const kgInput = fila.querySelector(`#kg-${ejercicioId}-${serieId}`);
        const repsInput = fila.querySelector(`#reps-${ejercicioId}-${serieId}`);
        const tSerieSelect = fila.querySelector(`#tipoSerie-${ejercicioId}-${serieId}`);
        const checkedInput = fila.querySelector(`#btn-check-outlined-${ejercicioId}-${serieId}`);
  
        // Asegurarnos de que estamos obteniendo el valor de cada input
        const kg = kgInput ? parseFloat(kgInput.value) || 0 : 0;
        const reps = repsInput ? parseInt(repsInput.value, 10) || 0 : 0;
        const tSerie = tSerieSelect ? tSerieSelect.value || "1" : "1";
        const checked = checkedInput ? checkedInput.checked : false;
  
        // Añadir la serie al array de series
        if (checked) {
            series.push({ serieId, kg, reps, tSerie, checked });
        }
      });
  
      // Añadir el ejercicio con sus series al array de ejerciciosData
      ejerciciosData.push({ ejercicioId, nombreEjercicio, nota, series });
    });
  
    // Guardar el array ejerciciosData en localStorage como JSON
    localStorage.setItem('ejerciciosData', JSON.stringify(ejerciciosData));
  }

  // Cargar datos al inicio desde localStorage
  function loadData() {
    const ejerciciosData = JSON.parse(localStorage.getItem('ejerciciosData'));
    if (!ejerciciosData) return;

    ejerciciosData.forEach(ejercicioData => {
      ejercicioCounter = Math.max(ejercicioCounter, parseInt(ejercicioData.ejercicioId, 10));
      addEjercicioToDOM(ejercicioData.ejercicioId, ejercicioData.nombreEjercicio, ejercicioData.series);
    });
  }

  loadData();

  document.getElementById('guardarEntrenamiento').addEventListener('click', async function() {
    const fechaActual = new Date().toISOString().split('T')[0];
    const nombreEntrenamiento = document.getElementById('nombreEntrenamiento').value;
    saveData();

    const dataGuardar = JSON.parse(localStorage.getItem('ejerciciosData')) || [];
    const data1 = {
      fecha: fechaActual,
      nombre: nombreEntrenamiento,
      ejerciciosEntrenamientos: dataGuardar.map(data => ({
        idEjercicio: data.ejercicioId,
        nombreEjercicio: data.nombreEjercicio,
        nota: data.nota,
        series: data.series.map(serie => ({
          orden: serie.serieId,
          kilo: serie.kg,
          repeticion: serie.reps,
          idTipoSerie: serie.tSerie,
          rer: 1,
          rpe: 1
        }))
      }))
    };

    
    
    await entrenamientoService.postEntrenamiento(data1);
    localStorage.removeItem('ejerciciosData');
    
    if(dataGuardar.length > 0){
        // window.location.href = "../historial/historial.html";
        console.log(data1);
    }
    else{
        alert("no hay ejercicios para guardar");
    }
  });

  document.getElementById('ejercicios').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-add')) {
      const ejercicioId = e.target.getAttribute('data-ejercicio-id');
      const table = document.getElementById(`series-table-${ejercicioId}`);
      const rowCount = table.rows.length + 1;
      addSerieToDOM(ejercicioId, rowCount);
      saveData();
    }

    if (e.target.classList.contains('btn-delete')) {
      const ejercicioId = e.target.getAttribute('data-ejercicio-id');
      const serieId = e.target.getAttribute('data-serie-id');
      const fila = document.getElementById(`fila-serie-${ejercicioId}-${serieId}`);
      if (fila) {
        fila.remove();
        saveData();

        const table = document.getElementById(`series-table-${ejercicioId}`);
        if (table.rows.length === 0) {
          document.getElementById(`ejercicio-${ejercicioId}`).remove();
        }
      }
    }
  });

  function cargarModal() {
    const modalBody = document.getElementById('modal-Body');
    ejercicios.forEach(e => {
      const ejercicioDiv = document.createElement("div");
      ejercicioDiv.classList.add("cardModal");
      ejercicioDiv.id = e.id;

      const nombre = document.createElement("h5");
      nombre.textContent = e.nombre;
      const descripcion = document.createElement("p");
      descripcion.textContent = e.instruccion;

      ejercicioDiv.appendChild(nombre);
      ejercicioDiv.appendChild(descripcion);
      ejercicioDiv.addEventListener("click", () => {
        addEjercicioToDOM(e.id, e.nombre);
        saveData();
        bootstrap.Modal.getOrCreateInstance(document.getElementById('staticBackdrop')).hide();
      });

      modalBody.appendChild(ejercicioDiv);
    });
  }

  cargarModal();

  function logIn() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "../login/login.html";
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
  }

  logIn();
  document.getElementById("logout").addEventListener("click", logOut);
});
