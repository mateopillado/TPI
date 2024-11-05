import ejercicioService from "../../services/ejercicioService.js";
import entrenamientoService from "../../services/entrenamientoService.js";
import tipoSerieService from "../../services/tipoSerieService.js";

let tiposSerie = [];

document.addEventListener("DOMContentLoaded", async () => {
  async function getEjercicios() {
    return await ejercicioService.getAll();
  }

  async function getTipoSerie() {
    return await tipoSerieService.getAll();
  }

  tiposSerie = await getTipoSerie();
  const ejercicios = await getEjercicios();
  let ejercicioCounter = 0;

  window.addEventListener("load", cargarEntrenamientoGuardado());

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
    const newRow = document.createElement("tr");
    newRow.id = `fila-serie-${ejercicioId}-${serieId}`;
  
    // Generar opciones de `<select>` dinámicamente
    const opcionesTipoSerie = tiposSerie.map(tipo => `
      <option value="${tipo.id}" ${tSerie == tipo.id ? "selected" : ""}>${tipo.tipo}</option>
    `).join("");
  
    // Estructura de la nueva fila
    newRow.innerHTML = `
      <td>${serieId}</td>
      <td><input type="number" id="kg-${ejercicioId}-${serieId}" class="form-control" value="${kg}"></td>
      <td><input type="number" id="reps-${ejercicioId}-${serieId}" class="form-control" value="${reps}"></td>
      <td>
        <select id="tipoSerie-${ejercicioId}-${serieId}" class="form-select">
          ${opcionesTipoSerie}
        </select>
      </td>
      <td>
        <input type="checkbox" class="btn-check" id="btn-check-outlined-${ejercicioId}-${serieId}" ${checked ? "checked" : ""} autocomplete="off">
        <label class="btn btn-outline-success" for="btn-check-outlined-${ejercicioId}-${serieId}"><i class="fa fa-check" aria-hidden="true"></i></label>
      </td>
      <td><button class="btn-delete btn btn-danger" data-ejercicio-id="${ejercicioId}" data-serie-id="${serieId}">Eliminar</button></td>
    `;
  
    // Añadir la nueva fila a la tabla
    table.appendChild(newRow);
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
  
      ejercicio.querySelectorAll('tbody tr').forEach((fila, index) => {
        const serieId = index + 1;
        const kg = parseFloat(fila.querySelector(`#kg-${ejercicioId}-${serieId}`).value) || 0;
        const reps = parseInt(fila.querySelector(`#reps-${ejercicioId}-${serieId}`).value, 10) || 0;
        const tSerie = fila.querySelector(`#tipoSerie-${ejercicioId}-${serieId}`).value || "1";
        const checked = fila.querySelector(`#btn-check-outlined-${ejercicioId}-${serieId}`).checked;
  
        if(checked){
            series.push({ serieId, kg, reps, tSerie, checked });
        }
      });
      if (series.length > 0) {
          ejerciciosData.push({ ejercicioId, nombreEjercicio, nota, series });
      }
    });
  
    localStorage.setItem('ejerciciosData', JSON.stringify(ejerciciosData));
  }
  
  function loadData() {
    const ejerciciosData = JSON.parse(localStorage.getItem('ejerciciosData'));
    if (!ejerciciosData) return;
  
    ejerciciosData.forEach(ejercicioData => {
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

    
    
    
    if(dataGuardar.length > 0){
        await entrenamientoService.postEntrenamiento(data1);
        window.location.href = "../historial/historial.html";
        localStorage.removeItem('ejerciciosData');
    }
    else{
        showTemporaryMessage("No hay ejercicios para guardar");
    }

    function showTemporaryMessage(message) {
        // Crear un contenedor de mensaje si no existe
        let messageContainer = document.getElementById("temp-message");
        if (!messageContainer) {
            messageContainer = document.createElement("div");
            messageContainer.id = "temp-message";
            messageContainer.style.position = "fixed";
            messageContainer.style.bottom = "20px";
            messageContainer.style.left = "50%";
            messageContainer.style.transform = "translateX(-50%)";
            messageContainer.style.padding = "10px 20px";
            messageContainer.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
            messageContainer.style.color = "#fff";
            messageContainer.style.borderRadius = "5px";
            messageContainer.style.fontSize = "16px";
            document.body.appendChild(messageContainer);
        }
    
        // Mostrar el mensaje en el contenedor
        messageContainer.textContent = message;
        messageContainer.style.display = "block";
    
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            messageContainer.style.display = "none";
        }, 3000);
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

  // Función para cargar entrenamiento guardado en localStorage al abrir la página de entrenamiento
// Función para cargar entrenamiento guardado en localStorage al abrir la página de entrenamiento
function cargarEntrenamientoGuardado() {
    const entrenamientoGuardado = localStorage.getItem("entrenamientoARepetir");

    if (entrenamientoGuardado) {
        // Parsear los datos del entrenamiento
        console.log("hola");
        
        const sesion = JSON.parse(entrenamientoGuardado);

        // Limpiar los datos guardados en localStorage
        localStorage.removeItem("entrenamientoARepetir");

        // // Actualizar el título u otros datos de la sesión en la interfaz
        // document.getElementById("tituloEntrenamiento").textContent = sesion.nombre || "Entrenamiento Sin Nombre";

        // Llenar la tabla con los ejercicios de la sesión
        sesion.ejerciciosEntrenamientos.forEach(ejercicio => {
            // Extraer los datos del ejercicio
            const ejercicioId = ejercicio.idEjercicio;
            const ejercicioNombre = ejercicio.idEjercicioNavigation.nombre;
            
            // Formatear la serie del ejercicio según los parámetros esperados
            const series = ejercicio.series.map(serie => ({
                serieId: serie.orden,
                kg: serie.kilo,
                reps: serie.repeticion,
                tSerie: '1', // Modificar si tienes un mapeo para idTipoSerie a un texto representativo
                checked: false    // Suposición inicial; cambiar según lógica de aplicación si es necesario
            }));
            addEjercicioToDOM(ejercicioId, ejercicioNombre, series);

            // series.forEach(serie => {
            //     addSerieToDOM(ejercicioId, serie.serieId, serie.kg, serie.reps, serie.tSerie, serie.checked);
            // });
        });

        saveData();       

    }
}


// Llamar a la función al cargar la página



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
