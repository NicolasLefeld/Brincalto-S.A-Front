import axiosRequest from "./axiosRequest";

const putAuth = async (data) => {
  const response = await axiosRequest.put(`/auth`, data);
  console.log("auth fetched ", response.data);
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

// const updateRecord = async (id, data) => {
//   const response = await axiosRequest.put(`/client/${id}`, data);
//   console.log('client updated ', response.data);
//   return response.data;
// };

// const deleteRecord = async (id) => {
//   const response = await axiosRequest.delete(`/client/${id}`);
//   console.log('client deleted ', id, response.data);
//   return response.data;
// };

export default {
  putAuth,
  // getRecords,
  // postRecord,
  // updateRecord,
  // deleteRecord,
};
