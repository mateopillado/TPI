// ejercicioService.js
import Service from "./service.js";

class ejercicioService extends Service {
  constructor() {
    super("contactos");
  }

  async getById() {
    return await this.fetchWithAuth("GET");
  }

  async postContacto(data) {
    return await this.fetchWithAuth("POST","", data);
  }
  
  async putContacto(data) {
    data.idPersona = 0
    return await this.fetchWithAuth("PUT","/" + data.id, data);
  }
}

export default new ejercicioService();
