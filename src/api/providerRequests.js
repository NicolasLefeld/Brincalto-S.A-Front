import axiosRequest from "./axiosRequest";

const getRecord = async (_id) => {
  const response = await axiosRequest.get(`/provider/${_id}`);
  console.log("provider fetched ", response.data);
  return response.data;
};

const getRecords = async () => {
  const response = await axiosRequest.get("/provider");
  console.log("providers fetched ", response.data);
  return response.data.length > 0 ? response.data : []
  
};

const postRecord = async (data) => {
  const response = await axiosRequest.post("/provider", data);
  console.log("provider posted ", response.data);
  return response.data;
};

const updateRecord = async (_id, data) => {
  const response = await axiosRequest.put(`/provider/${_id}`, data);
  console.log("provider updated ", response.data);
  return response.data;
};

const deleteRecord = async (_id) => {
  const response = await axiosRequest.delete(`/provider/${_id}`);
  console.log("provider deleted ", _id, response.data);
  return response.data;
};

export default {
  getRecord,
  getRecords,
  postRecord,
  updateRecord,
  deleteRecord,
};
