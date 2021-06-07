import axiosRequest from "./axiosRequest";

function parseData(data, type) {
  let body = {};
  if (type === "spare") {
    body = {
      type,
      quantity: data.quantity,
      product: {
        type: data.product,
      },
    };
  } else {
    body = {
      type,
      quantity: data.quantity,
      product: {
        type: data.product,
        costPerLitter: data.costPerLitter,
        availableLiters: data.availableLiters,
      },
    };
  }
  return body;
}

const getRecord = async (type) => {
  const response = await axiosRequest.get(`/stock/${type}`);
  console.log("stock fetched ", response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data, type) => {
  const body = parseData(data, type);
  const response = await axiosRequest.post("/stock", body);
  console.log("stock posted ", response.data);
  return response.data;
};

const updateRecord = async (id, data, type) => {
  const body = parseData(data, type);
  const response = await axiosRequest.put(`/stock/${id}`, body);
  console.log("stock updated ", response.data);
  return response.data;
};

const deleteRecord = async (id) => {
  const response = await axiosRequest.delete(`/stock/${id}`);
  console.log("stock deleted ", id, response.data);
  return response.data;
};

export default {
  getRecord,
  postRecord,
  updateRecord,
  deleteRecord,
};
