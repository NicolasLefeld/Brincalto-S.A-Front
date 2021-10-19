import axiosRequest from "./axiosRequest";

const routeName = "/products";

const getRecord = async (id) => {
  const response = await axiosRequest.get(`${routeName}/${id}`);
  console.log("products fetched ", response.data);
  return response.data;
};

const getRecords = async () => {
  const response = await axiosRequest.get(routeName);
  console.log("products fetched ", response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data) => {
  const response = await axiosRequest.post(routeName, data);
  console.log("products posted ", response.data);
  return response.data;
};

const updateRecord = async (id, data) => {
  const response = await axiosRequest.put(`${routeName}/${id}`, data);
  console.log("products updated ", response.data);
  return response.data;
};

const deleteRecord = async (id) => {
  const response = await axiosRequest.delete(`${routeName}/${id}`);
  console.log("products deleted ", id, response.data);
  return response.data;
};

export default {
  getRecord,
  getRecords,
  postRecord,
  updateRecord,
  deleteRecord,
};
