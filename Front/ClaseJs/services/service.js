
import { API_URL } from "./api.js";
const apiurl = API_URL
class Service {
  constructor(controllerName) {
    this.controllerName = controllerName;
  }
  async fetchWithAuth(method, url = '', data = null) {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXJvbiIsInVzZXJJZCI6IjUiLCJqdGkiOiIxNTAxY2JhYS0zNzY2LTQ2YzAtYjU4ZS02OWIwYzg0ZTc0YTEiLCJleHAiOjE3MzA1OTEwNDgsImlzcyI6IlR1SXNzdWVyQXF1aSIsImF1ZCI6IlR1QXVkaWVuY2VBcXVpIn0.5_bidik2Zlg2BtbDf1CA68BYifoAyPS_FxPDrSwW7RE`,
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) }),
    };

    try {
      const response = await fetch(apiurl + this.controllerName + url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  }

  async fetchWithoutAuth(url = '', data = null) {
    try {
      const response = await fetch(apiurl + this.controllerName + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const { token } = await response.json();
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  }
}
export default Service;
