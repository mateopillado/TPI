
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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXJvbiIsInVzZXJJZCI6IjUiLCJqdGkiOiI5NjcxYWI4Yy1mODNlLTRiM2YtOWI4My1kNjdlNmIwZGQzYWEiLCJleHAiOjE3MzA1ODk2MjksImlzcyI6IlR1SXNzdWVyQXF1aSIsImF1ZCI6IlR1QXVkaWVuY2VBcXVpIn0.XIa1iRbYBqEQWWB6eGsTW-LU0lARdWOEcLc9ngXBU3Q`,
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
