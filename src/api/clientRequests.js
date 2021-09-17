import axiosRequest from './axiosRequest';

const getRecord = async (_id) => {
  const response = await axiosRequest.get(`/clients/${_id}`);
  console.log('clients fetched ', response.data);
  return response.data;
};

const getRecords = async () => {
  const response = await axiosRequest.get('/clients');
  console.log('clients fetched ', response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data) => {
  const response = await axiosRequest.post('/client', data);
  console.log('client posted ', response.data);
  return response.data;
};

const updateRecord = async (_id, data) => {
  const response = await axiosRequest.put(`/clients/${_id}`, data);
  console.log('clients updated ', response.data);
  return response.data;
};

const deleteRecord = async (_id) => {
  const response = await axiosRequest.delete(`/clients/${_id}`);
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
