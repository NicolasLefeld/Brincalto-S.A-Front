import axios from 'axios';

const apiURL = 'http://localhost:8001';

export default axios.create({
  baseURL: apiURL,
  validateStatus: (status) => {
    return [200, 201, 404, 401].includes(status);
  },
});
