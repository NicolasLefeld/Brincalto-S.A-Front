import axiosRequest from './axiosRequest';

const putAuth = async (data) => {
  const response = await axiosRequest.put(`/auth`, data);
  console.log('auth fetched ', response.data);
  return response.data;
};

// const getRecords = async () => {
//   const response = await axiosRequest.get('/client');
//   console.log('clients fetched ', response.data);
//   return response.data.length > 0 ? response.data : [];
// };

// const postRecord = async (data) => {
//   const response = await axiosRequest.post('/client', data);
//   console.log('client posted ', response.data);
//   return response.data;
// };

// const updateRecord = async (_id, data) => {
//   const response = await axiosRequest.put(`/client/${_id}`, data);
//   console.log('client updated ', response.data);
//   return response.data;
// };

// const deleteRecord = async (_id) => {
//   const response = await axiosRequest.delete(`/client/${_id}`);
//   console.log('client deleted ', _id, response.data);
//   return response.data;
// };

export default {
  putAuth,
  // getRecords,
  // postRecord,
  // updateRecord,
  // deleteRecord,
};
