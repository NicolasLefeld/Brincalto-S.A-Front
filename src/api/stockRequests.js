import axiosRequest from './axiosRequest';

function parseData(data, type) {
  let body = {};
  const isSpare = type === 'spare';
  if (isSpare) {
    body = {
      type,
      quantity: data.quantity,
      product: data.product,
      comment: data.comment,
    };
  } else {
    const isMovement = data.isMovement;
    if (isMovement) {
      body = {
        type: 'oilMovement',
        comment: data.observation,
        littersTaken: data.littersTaken,
      };
    } else {
      body = {
        type,
        liters: data.liters,
        availableLitters: data.availableLitters,
        comment: data.comment,
      };
    }
  }
  return body;
}

const getRecord = async (type) => {
  const response = await axiosRequest.get(`/stock/${type}`);
  console.log('stock fetched ', response.data);
  return response.data.length > 0 ? response.data : [];
};

const postRecord = async (data, type) => {
  const body = parseData(data, type);
  const response = await axiosRequest.post('/stock', body);
  console.log('stock posted ', response.data);
  return response.data;
};

const updateRecord = async (id, data, type) => {
  const body = parseData(data, type);
  const response = await axiosRequest.put(`/stock/${id}?type=${type}`, body);
  console.log('stock updated ', response.data);
  return response.data;
};

const updateRecordWithMovement = async (id, data, type) => {
  const body = parseData(data, type);
  const response = await axiosRequest.put(
    `/stock/${id}?type=oilMovement`,
    body,
  );
  console.log('stock updated ', response.data);
  return response.data;
};

const deleteRecord = async (id, type) => {
  const response = await axiosRequest.delete(`/stock/${id}?type=${type}`);
  console.log('stock deleted ', id, response.data);
  return response.data;
};

export default {
  getRecord,
  postRecord,
  updateRecord,
  updateRecordWithMovement,
  deleteRecord,
};
