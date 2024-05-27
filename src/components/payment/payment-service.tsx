import apiClient from "../../common/http";

export const createPaymentOrder = async (data: any) => {
    const response = await apiClient.post<any>(`/payment/order`, data);
    return response.data;
  };

  export const verifyPayment = async (data: any) => {
    const response = await apiClient.post<any>(`/payment/verify-payment`, data);
    return response.data;
  };

  export const refundPayment = async (data: any) => {
    const response = await apiClient.post<any>(`/payment/refund`, data);
    return response.data;
  };

  export const partialRefundPayment = async (data: any) => {
    const response = await apiClient.post<any>(`/payment/partial-refund`, data);
    return response.data;
  };