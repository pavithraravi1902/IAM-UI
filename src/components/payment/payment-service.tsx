import apiClient from "../../common/http";

export const createPaymentOrder = async (data: any) => {
    const response = await apiClient.post<any>(`/payment/order`, data);
    return response.data;
  };