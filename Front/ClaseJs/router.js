const router = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    handleLocation();
}

const routes = {
    404: "../404/404.html",
    "/": "/Front/ClaseJs/pages/inicio/inicio.html",
    "/inicio": "/Front/ClaseJs/pages/inicio/inicio.html",
    "/entrenamiento": "/Front/ClaseJs/pages/entrenamiento/entrenamiento.html",
    "/historial": "/Front/ClaseJs/pages/historial/historial.html",
    "ejercicios": "/Front/ClaseJs/pages/ejercicios/ejercicios.html",
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const response = await fetch(route);
    const html = await response.text();
    document.getElementById("main").innerHTML = html;
}

window.onpopstate = handleLocation;
window.router = router;

handleLocation();