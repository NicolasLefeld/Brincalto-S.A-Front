import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
  validateStatus: (status) => {
    return [200, 201, 404].includes(status);
  },
});
