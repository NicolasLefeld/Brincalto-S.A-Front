import axiosRequest from "./axiosRequest";

const routeName = "/charges";

const getRecord = async (_id) => {
  const response = await axiosRequest.get(`${routeName}/${_id}`);
  console.log(`${routeName} fetched `, response.data);
  return response.data;
};

const getRecords = async () => {
  const response = await axiosRequest.get(routeName);
  console.log(`${routeName} fetched `, response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data, paymentMethod) => {
  const response = await axiosRequest.post(
    `${routeName}/${paymentMethod}`,
    data,
  );
  console.log(`${routeName} posted`, response.data);
  return response.data;
};

const updateRecord = async (_id, data) => {
  const response = await axiosRequest.put(`${routeName}/${_id}`, data);
  console.log(`${routeName} updated`, response.data);
  return response.data;
};

const deleteRecord = async (_id) => {
  const response = await axiosRequest.delete(`${routeName}/${_id}`);
  console.log(`${routeName} deleted `, _id, response.data);
  return response.data;
};

const markAsProcessed = async (data) => {
  const response = await axiosRequest.put(`${routeName}/markAsProcessed`, [
    ...data.filter(Boolean),
  ]);
  console.log(`${routeName}/markAsProcessed updated`, response.data);
  return response.data;
};

const downloadPDF = async (data) => {
  const response = await axiosRequest.post(`${routeName}/getPdf`, data, {
    responseType: "arraybuffer",
    encoding: null,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/pdf",
    },
  });
  console.log(`${routeName}/getPdf updated`, response.data);
  return response.data;
};

export default {
  getRecord,
  getRecords,
  postRecord,
  updateRecord,
  deleteRecord,
  markAsProcessed,
  downloadPDF,
};