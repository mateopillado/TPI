import usuarioService from "../../services/usuarioService.js";

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("login-form");
    const errorDiv = document.getElementById("login-error");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            usuario: document.getElementById("username").value,
            contrasena: document.getElementById("password").value,
        };
        
        const response = await usuarioService.login(data);

        if (response.token) {
            localStorage.setItem("token", response.token);
            window.location.href = "../inicio/inicio.html";
        } else {
            errorDiv.style.display = "block"; // Muestra el mensaje de error
            errorDiv.textContent = "Usuario o contraseña incorrectos"; // Puedes personalizar el mensaje aquí
        }
    });
});
