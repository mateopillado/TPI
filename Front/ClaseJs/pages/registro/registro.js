import usuarioService from "../../services/usuarioService.js";

document.addEventListener("DOMContentLoaded", async () => {

    setMinDate();

    const form = document.getElementById("register-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            dni: document.getElementById("dni").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            fechaNacimiento: document.getElementById("fecha_nacimiento").value,
            idGenero: document.getElementById("id_genero").value,
            idRol: document.getElementById("id_rol").value,
            username: document.getElementById("username").value,
            contrasena: document.getElementById("password").value,
        };
        
        console.log(data);
        

        await usuarioService.register(data);
        // window.location.href = "../login/login.html";
    });
})

function setMinDate() {
    const inputFecha = document.getElementById('fecha_nacimiento');
    const today = new Date();
    
    // Restamos 3 años a la fecha actual
    const minDate = new Date(today.getFullYear() - 4, 11, 31); // 11 = Diciembre (0 es enero)
  
    // Formateamos la fecha en el formato YYYY-MM-DD requerido para el input de tipo date
    const formattedDate = minDate.toISOString().split('T')[0];
    inputFecha.max = formattedDate;
  }