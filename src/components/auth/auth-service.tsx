import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});

export const getUserLogin = async (userDetails: any) => {
  const response = await apiClient.post<any>(`/users/login`,
    userDetails
  );
  console.log(response.data)
  return response.data;
}

export const registerNewUser = async (userDetails: any) => {
  const response = await apiClient.post<any>(`/users`,
    userDetails
  );
  console.log(response.data)
  return response.data;
}

export const forgotPassword = async (email: any) => {
  const response = await apiClient.post<any>(`/users/forgot-password`,
    email
  );
  console.log(response.data)
  return response.data;
}
