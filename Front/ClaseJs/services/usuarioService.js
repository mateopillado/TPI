import Service from "./service.js";

class usuarioService extends Service {
  constructor() {
    super("personas");
  }

  async getUser() {
    return await this.fetchWithAuth("GET", "/usuarioActual");
  }

  async login(data) {
    return await this.fetchWithoutAuth("/login", data);
  }

  async register(data) {
    return await this.fetchWithoutAuth("/registrar", data);
  }

}

export default new usuarioService();
