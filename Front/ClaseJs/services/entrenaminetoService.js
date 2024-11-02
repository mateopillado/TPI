import Service from "./service.js";

class entrenamientoService extends Service {
  constructor() {
    super("entrenamientos");
  }

  async getManyTraining() {
    return await this.fetchWithAuth("GET");
  }

}

export default new entrenamientoService();
