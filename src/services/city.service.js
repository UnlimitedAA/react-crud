import http from "../http-common";

class CityDataService {
  getAll() {
    return http.get("/cities");
  }

  get(id) {
    return http.get(`/cities/${id}`);
  }

  create(data) {
    return http.post("/cities", data);
  }

  update(id, data) {
    return http.put(`/cities/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cities/${id}`);
  }

}

export default new CityDataService();
