import Service from "./service.js";

class usuarioService extends Service {
  constructor() {
    super("personas");
  }

  async getUser() {
    return await this.fetchWithAuth("GET", '/5');
  }

}

export default new usuarioService();
