import { pages } from "../../controllers/index";

const router = async (route) => {
  let content = document.getElementById("main");
  content.innerHTML = "";

  console.log(route);

  switch (route) {
    case "#/inicio": {
      return content.appendChild(pages.inicio());
    }
    case "/entrenamiento": {
      return content.appendChild(await pages.entrenamiento());
    }
    default: {
      return content.appendChild(pages.notFound());
    }
  }
};

export { router };