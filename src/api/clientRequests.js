import axiosRequest from './axiosRequest';

const route = '/clients';
const getRecord = async (_id) => {
  const response = await axiosRequest.get(`${route}/${_id}`);
  console.log('clients fetched ', response.data);
  return response.data;
};

const getRecords = async () => {
  const response = await axiosRequest.get(`${route}`);
  console.log('clients fetched ', response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data) => {
  const response = await axiosRequest.post(`${route}`, data);
  console.log('client posted ', response.data);
  return response.data;
};

const updateRecord = async (_id, data) => {
  const response = await axiosRequest.put(`${route}/${_id}`, data);
  console.log('clients updated ', response.data);
  return response.data;
};

const deleteRecord = async (_id) => {
  const response = await axiosRequest.delete(`${route}/${_id}`);
  console.log('clients deleted ', _id, response.data);
  return response.data;
};

export default {
  getRecord,
  getRecords,
  postRecord,
  updateRecord,
  deleteRecord,
};
