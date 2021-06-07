import axiosRequest from "./axiosRequest";

const getAllCheckingAccounts = async (id) => {
  const response = await axiosRequest.get(`/client/${id}`);
  console.log("cuentas corrientes home", response.data);
  return response.data;
};

const getMonthPurchases = async (id) => {
  const response = await axiosRequest.get(`/client/${id}`);
  console.log("gastos del mes home ", response.data);
  return response.data;
};

export default {
  getAllCheckingAccounts,
  getMonthPurchases,
};
