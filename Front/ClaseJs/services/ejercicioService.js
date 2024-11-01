// ejercicioService.js
import Service from "./service.js";

class ejercicioService extends Service {
  constructor() {
    super("ejercicios");
  }

  async getAll() {
    return await this.fetchWithAuth("GET");
  }

}

export default new ejercicioService();
