import Service from "./service.js";

class coorService extends Service {
  constructor() {
    super("coordenadas");
  }

  async saveCoor(data) {
    return await this.fetchWithAuth("Post", "",data);
  }



}

export default new coorService();
