
import ejercicioService from "../../services/ejercicioService.js";

import entrenamientoService from "../../services/entrenamientoService.js";

document.addEventListener("DOMContentLoaded", async () => {
 
  async function getEjercicios() {
    return await ejercicioService.getAll();
  }

  var ejercicios = await getEjercicios();

  let ejercicioCounter = 0;
  let dataGuardar = [];

  document.querySelectorAll('#nav-tab>[data-bs-toggle="tab"]').forEach(el => {
    el.addEventListener('shown.bs.tab', () => {
      const target = el.getAttribute('data-bs-target')
      const scrollElem = document.querySelector(`${target} [data-bs-spy="scroll"]`)
      bootstrap.ScrollSpy.getOrCreateInstance(scrollElem).refresh()
    })
  })

  //COMENTARIO PARA TIRAR CONTROL z
  
// Función para agregar ejercicio al DOM
function addEjercicioToDOM(ejercicioId, ejercicioNombre, series = []) {
    const newEjercicio = `
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
// Función para guardar el estado en localStorage
function saveData() {
  let ejerciciosData = [];
  const ejercicios = document.getElementById('ejercicios').children;

  Array.from(ejercicios).forEach(ejercicio => {
      const ejercicioId = ejercicio.id.split('-')[1];
      const table = ejercicio.querySelector('tbody');
      const filas = table ? table.querySelectorAll('tr') : [];
      const nota = document.getElementById(`nota-${ejercicioId}`).value
      

      let series = [];
      
      filas.forEach(fila => {
          const orden = fila.querySelector('td') ? fila.querySelector('td').innerText : null;
          if (orden) {
              const kilo = document.getElementById(`kg-${ejercicioId}-${orden}`)?.value || 0;
              const repeticion = document.getElementById(`reps-${ejercicioId}-${orden}`)?.value || 0;
              const idTipoSerie = document.getElementById(`tipoSerie-${ejercicioId}-${orden}`)?.value || "1";
              const checked = document.getElementById(`btn-check-outlined-${ejercicioId}-${orden}`)?.checked || false;

              // Solo guardar series que estén marcadas como `checked`
              if (checked) {
                  series.push({
                      orden: orden,
                      kilo: kilo,
                      repeticion: repeticion,
                      idTipoSerie: idTipoSerie
                  });
              }
          }
      });

      // Agregar ejercicio solo si tiene series guardadas
      if (series.length > 0) {
          ejerciciosData.push({
              ejercicioId: ejercicioId,
              nota: nota,
              series: series
          });
      }
  });

  localStorage.setItem('ejerciciosData', JSON.stringify(ejerciciosData));
  dataGuardar = ejerciciosData;
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
window.onload = loadData();

let guardarEntrenamiento = document.getElementById('guardarEntrenamiento')
guardarEntrenamiento.addEventListener('click', function() {

  const fechaActual = new Date();
  const nombreEntrenamiento = document.getElementById('nombreEntrenamiento').value
  saveData();
  localStorage.removeItem('ejerciciosData');
  // window.location.href = '../Historial/historial.html' //descomentar al terminar
  let data1 = {
    fecha: fechaActual.toISOString().split('T')[0],
    nombre: nombreEntrenamiento,
    ejerciciosEntrenamientos: dataGuardar.map(data => ({
      idEjercicio: data.ejercicioId,
      idEntrenamiento: 0,
      nombreEjercicio: data.ejercicioNombre,
      nota: data.nota,
      series: data.series.map(serie => ({
        orden: serie.orden,
        kilo: serie.kilo,
        repeticion: serie.repeticion,
        idTipoSerie: serie.idTipoSerie,
        rer: 1,
        rpe: 1
      }))
    }))
  };

  console.log(data1)
   
  async function postEntrenamiento(data1) {
    return await entrenamientoService.postEntrenamiento(data1);
  }

  let respuesta = postEntrenamiento(data1);

})


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

          // Verifica si el contenedor de series está vacío
          const table = document.getElementById(`series-table-${ejercicioId}`);
          if (table && table.rows.length === 0) {
              const container = document.getElementById(`ejercicio-${ejercicioId}`);
              container.remove();  // Elimina el contenedor completo del ejercicio si no tiene series
          }
      }
  }
});


  function cargarModal(){
    let padre = document.getElementById('modal-Body')

    ejercicios.forEach(ejercicios => {
      // Crear un nuevo div para cada ejercicio
      const ejercicioDiv = document.createElement("div");
      ejercicioDiv.classList.add("cardModal");
      ejercicioDiv.id = ejercicios.id
      // Crear un elemento h3 para el nombre del ejercicio
      const nombre = document.createElement("h5");
      nombre.textContent = ejercicios.nombre;
    
      // Crear un párrafo para la descripción del ejercicio
      const descripcion = document.createElement("p");
      descripcion.textContent = ejercicios.instruccion;
    
      // Añadir el nombre y la descripción al div del ejercicio
      ejercicioDiv.appendChild(nombre);
      ejercicioDiv.appendChild(descripcion);
    
      // Añadir el div del ejercicio al contenedor principal

      ejercicioDiv.addEventListener("click", function() {
        
        clickEjercicio(ejercicioDiv)
        const modalElement = document.getElementById('staticBackdrop');
        // Obtén la instancia del modal o crea una nueva si no existe
        const myModal = bootstrap.Modal.getOrCreateInstance(modalElement);
        // Ahora puedes usar el método hide() para cerrar el modal
        myModal.hide();

      });

      padre.appendChild(ejercicioDiv);
    });
  }

  cargarModal();

  function clickEjercicio(element) {
    let e = ejercicios.find( a => a.id == element.id)
    addEjercicioToDOM(element.id, e.nombre);
    saveData();
  }
})

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
console.log();
