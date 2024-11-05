import Service from "./service.js";

class tipoSerieService extends Service {
  constructor() {
    super("tiposseries");
  }

  async getAll() {
    return await this.fetchWithAuth("GET");
  }

}

export default new tipoSerieService();
