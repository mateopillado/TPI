// ejercicioService.js
import Service from "./service.js";

class ejercicioService extends Service {
  constructor() {
    super("contactos");
  }

  async getById(id) {
    return await this.fetchWithAuth("GET","/" + id);
  }

  async postContacto(data) {
    return await this.fetchWithAuth("POST","", data);
  }
  
  async putContacto(data) {
    return await this.fetchWithAuth("PUT","", data);
  }

  



}

export default new ejercicioService();
