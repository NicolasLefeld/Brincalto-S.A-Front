import axiosRequest from './axiosRequest';

const getRecords = async () => {
  const response = await axiosRequest.get('/auth/list');
  console.log('users fetched ', response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data) => {
  const response = await axiosRequest.post('/auth', data);
  console.log('users posted ', response.data);
  return response.data;
};

const updateRecord = async (_id, data) => {
  const response = await axiosRequest.put(`/auth/${_id}`, data);
  console.log('users updated ', response.data);
  return response.data;
};

const deleteRecord = async (_id) => {
  const response = await axiosRequest.delete(`/auth/${_id}`);
  console.log('users deleted ', _id, response.data);
  return response.data;
};

export default {
  getRecords,
  postRecord,
  updateRecord,
  deleteRecord,
};
