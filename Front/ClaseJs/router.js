// const mainContainer = document.getElementById("main");

// // Define las rutas y el archivo HTML correspondiente
// const routes = {
//     "/": {
//         html: "/Front/ClaseJs/pages/inicio/inicio.html",
//         css: "/Front/ClaseJs/pages/inicio/inicio.css",
//         js: "/Front/ClaseJs/pages/inicio/inicio.js"
//     },
//     "/entrenamiento": {
//         html: "/Front/ClaseJs/pages/entrenamiento/entrenamiento.html",
//         css: "/Front/ClaseJs/pages/entrenamiento/entrenamiento.css",
//         js: "/Front/ClaseJs/pages/entrenamiento/entrenamiento.js"
//     },
//     "/historial": {
//         html: "/Front/ClaseJs/pages/historial/historial.html",
//         css: "/Front/ClaseJs/pages/historial/historial.css",
//         js: "/Front/ClaseJs/pages/historial/historial.js"
//     },
//     "/ejercicios": {
//         html: "/Front/ClaseJs/pages/ejercicios/ejercicios.html",
//         css: "/Front/ClaseJs/pages/ejercicios/ejercicios.css",
//         js: "/Front/ClaseJs/pages/ejercicios/ejercicios.js"
//     },
//     "/landing": {
//         html: "/Front/ClaseJs/pages/landing/landing.html",
//         css: "/Front/ClaseJs/pages/landing/landing.css",
//         js: "/Front/ClaseJs/pages/landing/landing.js"
//     },
//     "/login": {
//         html: "/Front/ClaseJs/pages/login/login.html",
//         css: "/Front/ClaseJs/pages/login/login.css",
//         js: "/Front/ClaseJs/pages/login/login.js"
//     },
//     "/registro": {
//         html: "/Front/ClaseJs/pages/registro/registro.html",
//         css: "/Front/ClaseJs/pages/registro/registro.css",
//         js: "/Front/ClaseJs/pages/registro/registro.js"
//     }
// };

// // Función para cargar e inyectar el contenido HTML de la ruta
// async function loadPage(pageConfig) {
//     try {
//         // Cargar HTML
//         const response = await fetch(pageConfig.html);
//         if (!response.ok) throw new Error("Error al cargar la página");
//         const content = await response.text();
//         mainContainer.innerHTML = content;

//         // Cargar CSS y JS
//         loadStylesheet(pageConfig.css);
//         loadScript(pageConfig.js);
//     } catch (error) {
//         mainContainer.innerHTML = "<p>Error al cargar la página.</p>";
//     }
// }

// // Función para cargar los estilos CSS de la página específica


// // Función para cargar el script específico de la página
// function loadScript(jsPath) {
//     // Remueve cualquier script previamente agregado
//     const oldScript = document.getElementById("pageScript");
//     if (oldScript) oldScript.remove();

//     // Crea el nuevo script
//     const newScript = document.createElement("script");
//     newScript.src = jsPath;
//     newScript.id = "pageScript";
//     document.body.appendChild(newScript);
// }

// function loadStylesheet(cssPath) {
//     // Remueve cualquier estilo previo agregado
//     const oldStylesheet = document.getElementById("pageStylesheet");
//     if (oldStylesheet) oldStylesheet.remove();

    

//     // Crea el nuevo enlace al CSS
//     const newStylesheet = document.createElement("link");
//     newStylesheet.rel = "stylesheet";
//     newStylesheet.href = cssPath;
//     newStylesheet.id = "pageStylesheet";

//     newScript.onload = () => {
//         console.log(`${jsPath} cargado y ejecutado`);
//     };
//     newScript.onerror = () => {
//         console.error(`No se pudo cargar el script ${jsPath}`);
//     };


//     document.head.appendChild(newStylesheet);
// }

// // Función para manejar la navegación
// function router() {
//     const path = window.location.pathname;
//     const pageConfig = routes[path] || routes["/"];
//     loadPage(pageConfig);
// }

// // Escucha los clics en los enlaces de navegación
// document.addEventListener("click", (e) => {
//     if (e.target.tagName === "A" && e.target.getAttribute("href").startsWith("/")) {
//         e.preventDefault();
//         const newPath = e.target.getAttribute("href");
//         window.history.pushState({}, "", newPath);
//         router();
//     }
// });

// // Detecta cambios en el historial de navegación (botones de atrás y adelante)
// window.addEventListener("popstate", router);

// // Inicializa la carga de la página actual
// router();

import { renderInicio } from './pages/inicio/inicio.js';
import { renderEntrenamiento } from './pages/entrenamiento/entrenamiento.js';
// import { renderHistorial } from './pages/historial/historial.js';
// import { renderEjercicios } from './pages/ejercicios/ejercicios.js';

const app = document.querySelector('#main');

export const router = (hash) => {
    app.innerHTML = '<h1>Cargando...</h1>';
    
    switch(hash) {
        case '#/':
            console.log('Inicio');
            
            renderInicio(app);
            break;
        case '#/entrenamiento':
            console.log('Entrenamiento');

            renderEntrenamiento(app);
            break;
        // case '#/historial':
        //     renderHistorial(app);
        //     break;
        // case '#/ejercicios':
        //     renderEjercicios(app);
        //     break;
        default:
            app.innerHTML = '<h1>404 - Página no encontrada</h1>';
    }
};