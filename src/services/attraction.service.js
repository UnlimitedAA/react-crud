import http from "../http-common";

class AttractionDataService {
  getAll() {
    return http.get("/attractions");
  }

  get(id) {
    return http.get(`/attractions/${id}`);
  }

  create(data) {
    return http.post("/attractions", data);
  }

  update(id, data) {
    return http.put(`/attractions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/attractions/${id}`);
  }
}

export default new AttractionDataService();
