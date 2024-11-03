import usuarioService from "../../services/usuarioService.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";
  errorMsg.style.display = "none";
  form.appendChild(errorMsg);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      dni: document.getElementById("dni").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      fechaNacimiento: document.getElementById("fecha_nacimiento").value,
      genero: document.getElementById("id_genero").value,
      nombreUsuario: document.getElementById("username").value,
      password: document.getElementById("password").value,
      rol: document.getElementById("id_rol").value,
    };

    try {
      const response = await usuarioService.register(data);
      
      if (response.success) {
        window.location.href = "../login/login.html";
      } else {
        errorMsg.style.display = "block";
        errorMsg.textContent = "Error al registrarse: " + (response.message || "Datos inválidos.");
      }
    } catch (error) {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Error en el servidor. Inténtalo más tarde.";
    }
  });
});
