import axiosRequest from './axiosRequest';

const getRecord = async (_id) => {
  const response = await axiosRequest.get(`/providers/${_id}`);
  console.log('providers fetched ', response.data);
  return response.data;
};

const getRecords = async () => {
  const response = await axiosRequest.get('/providers');
  console.log('providerss fetched ', response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data) => {
  const response = await axiosRequest.post('/providers', data);
  console.log('providers posted ', response.data);
  return response.data;
};

const updateRecord = async (_id, data) => {
  const response = await axiosRequest.put(`/providers/${_id}`, data);
  console.log('providers updated ', response.data);
  return response.data;
};

const deleteRecord = async (_id) => {
  const response = await axiosRequest.delete(`/providers/${_id}`);
  console.log('providers deleted ', _id, response.data);
  return response.data;
};

export default {
  getRecord,
  getRecords,
  postRecord,
  updateRecord,
  deleteRecord,
};
