import axios from 'axios';

const apiURL = process.env.API_URL;

export default axios.create({
  baseURL: apiURL,
  validateStatus: (status) => {
    return [200, 201, 404, 401].includes(status);
  },
});
