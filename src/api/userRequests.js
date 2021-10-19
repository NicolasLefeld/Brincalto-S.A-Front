import axiosRequest from "./axiosRequest";

const getRecords = async () => {
  const response = await axiosRequest.get("/auth/list");
  console.log("users fetched ", response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data) => {
  const response = await axiosRequest.post("/auth", data);
  console.log("users posted ", response.data);
  return response.data;
};

const updateRecord = async (id, data) => {
  const response = await axiosRequest.put(`/auth/${id}`, data);
  console.log("users updated ", response.data);
  return response.data;
};

const deleteRecord = async (id) => {
  const response = await axiosRequest.delete(`/auth/${id}`);
  console.log("users deleted ", id, response.data);
  return response.data;
};

export default {
  getRecords,
  postRecord,
  updateRecord,
  deleteRecord,
};
