document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nuevoEjercicioBtn').addEventListener('click', function() {
        const ejercicioDiv = document.createElement('div');
        ejercicioDiv.classList.add('mb-4');

        const tituloInput = document.createElement('input');
        tituloInput.type = 'text';
        tituloInput.classList.add('form-control', 'mb-2');
        tituloInput.placeholder = 'Título del Ejercicio';

        // Crear el contenedor del título editable
        const tituloContainer = document.createElement('div');
        tituloContainer.classList.add('d-flex', 'align-items-center');

        const tabla = document.createElement('table');
        tabla.classList.add('table', 'table-dark', 'table-bordered');

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Serie</th>
                <th>Kg</th>
                <th>Repeticiones</th>
                <th>RPE</th>
                <th></th>
            </tr>
        `;

        const tbody = document.createElement('tbody');
        tbody.innerHTML = `
            <tr>
                <td>1</td>
                <td><input type="number" class="form-control" value="0"></td>
                <td><input type="number" class="form-control" value="0"></td>
                <td><input type="number" class="form-control" value="0"></td>
                <td><button class="btn btn-danger eliminar-serie">Eliminar</button></td>
            </tr>
        `;

        tabla.appendChild(thead);
        tabla.appendChild(tbody);

        const addSerieBtn = document.createElement('button');
        addSerieBtn.classList.add('btn', 'btn-custom', 'mt-2');
        addSerieBtn.textContent = 'Añadir Serie';
        addSerieBtn.addEventListener('click', function() {
            const rowCount = tbody.rows.length + 1;
            const newRow = tbody.insertRow();
            newRow.innerHTML = `
                <td>${rowCount}</td>
                <td><input type="number" class="form-control" value=0></td>
                <td><input type="number" class="form-control" value=0></td>
                <td><input type="number" class="form-control" value=0></td>
                <td><button class="btn btn-danger eliminar-serie">Eliminar</button></td>
            `;
            // Agregar evento de eliminación a la nueva fila
            newRow.querySelector('.eliminar-serie').addEventListener('click', function() {
                newRow.remove();
                actualizarSeries(tbody);
            });
        });

        // Agregar evento de eliminación a la fila inicial
        tbody.querySelector('.eliminar-serie').addEventListener('click', function() {
            this.closest('tr').remove();
            actualizarSeries(tbody);
        });

        // Función para cambiar el input en h3 con ícono de lápiz
        tituloInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const tituloH3 = document.createElement('h3');
                tituloH3.textContent = tituloInput.value;
                tituloH3.classList.add('mb-2', 'mr-2', 'text-white');
                
                const editIcon = document.createElement('i');
                editIcon.classList.add('fas', 'fa-pencil-alt', 'm-3', 'cursor-pointer', 'text-white');
                editIcon.style.cursor = 'pointer';

                // Función para volver a editar el título al hacer clic en el ícono
                editIcon.addEventListener('click', function() {
                    tituloContainer.innerHTML = ''; // Limpia el contenedor
                    tituloContainer.appendChild(tituloInput); // Muestra el input nuevamente
                    tituloInput.value = tituloH3.textContent; // Coloca el texto anterior en el input
                    tituloInput.focus(); // Enfoca el input
                });

                // Limpiar el contenedor y añadir h3 y el icono
                tituloContainer.innerHTML = '';
                tituloContainer.appendChild(tituloH3);
                tituloContainer.appendChild(editIcon);
            }
        });

        ejercicioDiv.appendChild(tituloContainer);
        tituloContainer.appendChild(tituloInput);
        ejercicioDiv.appendChild(tabla);
        ejercicioDiv.appendChild(addSerieBtn);
        document.getElementById('ejerciciosContainer').appendChild(ejercicioDiv);
    });

    // Función para actualizar el número de serie después de eliminar una fila
    function actualizarSeries(tbody) {
        const filas = tbody.querySelectorAll('tr');
        filas.forEach((fila, index) => {
            fila.cells[0].textContent = index + 1; // Actualizar el número de serie
        });
    }
});
