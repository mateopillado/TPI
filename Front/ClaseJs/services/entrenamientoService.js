import Service from "./service.js";

class entrenamientoService extends Service {
  constructor() {
    super("entrenamientos");
  }

  async getManyTraining() {
    return await this.fetchWithAuth("GET");
  }
  
  async getHistorial() {
    return await this.fetchWithAuth("GET","/historial");
  }
  
  async getById(id) {
    return await this.fetchWithAuth("GET","/" + id);
  }

}

export default new entrenamientoService();
