import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});

export const getUserLogin = async (userDetails: any) => {
  const response = await apiClient.post<any>(`/users/login`, userDetails);
  return response.data;
};

export const registerNewUser = async (userDetails: any) => {
  const response = await apiClient.post<any>(`/users`, userDetails);
  return response.data;
};

export const forgotPassword = async (email: any) => {
  const response = await apiClient.post<any>(`/users/forgot-password`, email);
  return response.data;
};

export const sendMail = async (email: any) => {
  console.log("sendMail", email);
  const response = await apiClient.post<any>(`/users/send-otp`, email);
  console.log(response, "response");
  return response.data;
};

export const getUserByEmailId = async (email: any) => {
  const response = await apiClient.post<any>(`/users/reset-password`, email);
  return response.data;
};
