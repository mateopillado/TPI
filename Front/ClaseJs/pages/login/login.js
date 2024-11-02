import usuarioService from "../../services/usuarioService.js";

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            usuario: document.getElementById("username").value,
            contrasena: document.getElementById("password").value,
        };
        
        const response = await usuarioService.login(data);
        window.location.href = "../inicio/inicio.html";
    });
})