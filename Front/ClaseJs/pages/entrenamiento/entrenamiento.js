let ejercicioCounter = 0;  // Contador para ejercicios
    let serieCounter = 0;      // Contador para series

    // Añadir nuevo ejercicio con selección de la lista
    document.getElementById('add-ejercicio-btn').addEventListener('click', function () {
        const ejercicioSeleccionado = ""
        ejercicioCounter++;  // Incrementa el contador de ejercicios

        // Crea el nuevo ejercicio con un ID único y el nombre del ejercicio seleccionado
        const newEjercicio = `
        <div class="container rounded-4 p-4" id="ejercicio-${ejercicioCounter}">
          <h4>${ejercicioSeleccionado}</h4>
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
            <tbody id="series-table-${ejercicioCounter}">
              <tr id="fila-serie-${ejercicioCounter}-1">
                <td>1</td>
                <td><input type="number" id="kg-${ejercicioCounter}-1" class="form-control" value="20"></td>
                <td><input type="number" id="reps-${ejercicioCounter}-1" class="form-control" value="12"></td>

                <td>
                  <select id="tipoSerie-${ejercicioCounter}-1" class="form-select ">
                    <option value="1">Tipo Serie</option>
                    <option value="2">Fuerza</option>
                    <option value="3">Lineal</option>
                    <option value="4">Piramidal</option>
                  </select>
                </td>

                <td><input type="checkbox" class="btn-check" id="btn-check-outlined-${ejercicioCounter}" autocomplete="off">
                <label class="btn btn-outline-success" for="btn-check-outlined-${ejercicioCounter}"><i class="fa fa-check" aria-hidden="true"></i></label></td>

                <td><button class="btn-delete btn btn-danger" data-ejercicio-id="${ejercicioCounter}" data-serie-id="1">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
          <button class="btn-add"  data-ejercicio-id="${ejercicioCounter}">Añadir Serie</button>
        </div>
        `;

        // Añade el nuevo ejercicio al contenedor
        document.getElementById('ejercicios').insertAdjacentHTML('beforeend', newEjercicio);
    });

    // Usa Event Delegation para detectar clicks en botones dinámicos
    document.getElementById('ejercicios').addEventListener('click', function (e) {
      // Añadir Serie
      if (e.target && e.target.classList.contains('btn-add')) {
        const ejercicioId = e.target.getAttribute('data-ejercicio-id');
        const table = document.getElementById(`series-table-${ejercicioId}`);
        const rowCount = table.rows.length + 1;
        serieCounter++;  // Incrementa el contador de series global

        // Nueva fila para la tabla con IDs únicos para los inputs y botón de eliminar
        const newRow = `
          <tr id="fila-serie-${ejercicioId}-${rowCount}">
            <td>${rowCount}</td>

            <td><input type="number" id="kg-${ejercicioId}-${rowCount}" class="form-control" value="0"></td>
            <td><input type="number" id="reps-${ejercicioId}-${rowCount}" class="form-control" value="0"></td>

              <td>
                <select id="tipoSerie-${ejercicioId}-${rowCount}" class="form-select ">
                  <option value="1">Fuerza</option>
                  <option value="2">Ligero</option>
                  <option value="3">Lineal</option>
                  <option value="4">Piramidal</option>
                </select>
              </td>

            
            <td><input type="checkbox" class="btn-check" id="btn-check-outlined-${rowCount}" autocomplete="off">
            <label class="btn btn-outline-success" for="btn-check-outlined-${rowCount}"><i class="fa fa-check" aria-hidden="true"></i></label></td>

            <td><button class=" btn-delete btn btn-danger" data-ejercicio-id="${ejercicioId}" data-serie-id="${rowCount}">Eliminar</button></td>

          </tr>
        `;

        // Añade la nueva fila a la tabla correspondiente
        table.insertAdjacentHTML('beforeend', newRow);
      }

      // Eliminar Serie
      if (e.target && e.target.classList.contains('btn-delete')) {
        const ejercicioId = e.target.getAttribute('data-ejercicio-id');
        const serieId = e.target.getAttribute('data-serie-id');
        const fila = document.getElementById(`fila-serie-${ejercicioId}-${serieId}`);

        if (fila) {
          fila.remove();  // Elimina la fila correspondiente
        }
      }
    });

    // Función para obtener todos los datos de todos los ejercicios
    let ejerciciosTodos = []
    function obtenerDatos() {
      
      const ejercicios = document.getElementById('ejercicios').children;
      let datos = [];

      // Itera sobre cada ejercicio
      Array.from(ejercicios).forEach(ejercicio => {
        const ejercicioId = ejercicio.id.split('-')[1];  // Extraer el ID del ejercicio
        const ejercicioNombre = ejercicio.querySelector('h4').innerText;  // Obtener el nombre del ejercicio
        const table = ejercicio.querySelector('tbody');  // Obtener la tabla
        const filas = table.querySelectorAll('tr');

        // Itera sobre cada fila (serie)
        filas.forEach(fila => {
          const serieId = fila.querySelector('td').innerText;  // Número de serie
          const kg = document.getElementById(`kg-${ejercicioId}-${serieId}`).value;
          const reps = document.getElementById(`reps-${ejercicioId}-${serieId}`).value;
          const tSerie = document.getElementById(`tipoSerie-${ejercicioId}-${serieId}`).value

          datos.push({
            ejercicio: ejercicioNombre,
            serie: serieId,
            kg: kg,
            reps: reps,
            tSerie: tSerie
          });
        });

        ejerciciosTodos.push(datos)
        datos = []
      });

      console.log(ejerciciosTodos);  // Muestra los datos en la consola
      alert("aca directamente redirigimos a la pagina de historial y se limpia la pagina de paso uwu onichan")
      location.replace("https://www.youtube.com/watch?v=hjWINKZsoEE");

      return datos;
      
    }


