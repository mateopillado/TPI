import usuarioService from "../../services/usuarioService.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";
  errorMsg.style.display = "none";
  form.appendChild(errorMsg);

  const today = new Date();
  const maxDate = new Date(today.setFullYear(today.getFullYear() - 4)).toISOString().split("T")[0];
  document.getElementById("fecha_nacimiento").max = maxDate;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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

    try {
      const response = await usuarioService.register(data);
      
      if (response.success) {
        window.location.href = "../login/login.html";
      } 
      else {
        errorMsg.style.display = "block";
        if (response.errors[0].message[0]){
          errorMsg.textContent = "Error al registrarse: " + response.errors[0].message ;
        }
        if (response.errors[0].message[1]){
          errorMsg.textContent = "Error al registrarse: " + response.errors[0].message;
        }
      }
    } catch (error) {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Error en el servidor. Inténtalo más tarde.";
    }
  });
});
