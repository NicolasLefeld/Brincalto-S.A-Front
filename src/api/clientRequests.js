import axiosRequest from "./axiosRequest";

const route = "/clients";
const getRecord = async (id) => {
  const response = await axiosRequest.get(`${route}/${id}`);
  console.log("clients fetched ", response.data);
  return response.data;
};

const getRecords = async () => {
  const response = await axiosRequest.get(`${route}`);
  console.log("clients fetched ", response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data) => {
  const response = await axiosRequest.post(`${route}`, data);
  console.log("client posted ", response.data);
  return response.data;
};

const updateRecord = async (id, data) => {
  const response = await axiosRequest.put(`${route}/${id}`, data);
  console.log("clients updated ", response.data);
  return response.data;
};

const deleteRecord = async (id) => {
  const response = await axiosRequest.delete(`${route}/${id}`);
  console.log("clients deleted ", id, response.data);
  return response.data;
};

export default {
  getRecord,
  getRecords,
  postRecord,
  updateRecord,
  deleteRecord,
};
