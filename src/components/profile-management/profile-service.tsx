import apiClient from "../../common/http";

export const createProfile = async (userDetails: any) => {
    const response = await apiClient.post<any>(`/profile`, userDetails);
    return response.data;
  };