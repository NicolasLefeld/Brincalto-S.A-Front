import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export default axios.create({
  baseURL: apiURL,
  validateStatus: (status) => {
    return [200, 201, 404, 401].includes(status);
  },
});
