// ejercicioService.js
import Service from "./service.js";

class ejercicioService extends Service {
  constructor() {
    super("ejercicios");
  }

  async getAll() {
    return await this.fetchWithAuth("GET");
  }

  async getById(id) {
    return await this.fetchWithAuth("GET","/" + id);
  }

}

export default new ejercicioService();
