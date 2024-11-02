
import { API_URL } from "./api.js";
const apiurl = API_URL
class Service {
  constructor(controllerName) {
    this.controllerName = controllerName;
  }
  async fetchWithAuth( method, url='' , data = null) {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXJvbiIsInVzZXJJZCI6IjUiLCJqdGkiOiIwMmQzMDQ1MC1hNGRjLTRkODMtODdjYi0wYTU4NWQ2ZmExNzkiLCJleHAiOjE3MzA1MjIxNTcsImlzcyI6IlR1SXNzdWVyQXF1aSIsImF1ZCI6IlR1QXVkaWVuY2VBcXVpIn0.mD5TJ4nltEukTFq1DJICr797HatIPynWwr783Sn6t1I`,
    //   Authorization: `Bearer ${JSON.parse(token)}`,
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
}
export default Service;
