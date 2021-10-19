import axiosRequest from "./axiosRequest";

const getRecord = async (id) => {
  const response = await axiosRequest.get(`/providers/${id}`);
  console.log("providers fetched ", response.data);
  return response.data;
};

const getRecords = async () => {
  const response = await axiosRequest.get("/providers");
  console.log("providerss fetched ", response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data) => {
  const response = await axiosRequest.post("/providers", data);
  console.log("providers posted ", response.data);
  return response.data;
};

const updateRecord = async (id, data) => {
  const response = await axiosRequest.put(`/providers/${id}`, data);
  console.log("providers updated ", response.data);
  return response.data;
};

const deleteRecord = async (id) => {
  const response = await axiosRequest.delete(`/providers/${id}`);
  console.log("providers deleted ", id, response.data);
  return response.data;
};

export default {
  getRecord,
  getRecords,
  postRecord,
  updateRecord,
  deleteRecord,
};
