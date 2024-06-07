import apiClient from "../../common/http";
import React from "react";
import { useMutation, useQuery } from "react-query";

// export const createProfile = async (userDetails: any) => {
//   const response = await apiClient.post<any>(`/profile`, userDetails);
//   return response.data;
// };

// export const uploadDocument = async (userDetails: any) => {
//   const response = await apiClient.post<any>(`/document`, userDetails);
//   return response.data;
// };

// export const getUserProfileById = async (userId: any) => {
//   const response = await apiClient.get<any>(`/profile/${userId}`);
//   return response.data;
// };

// export const updateProfile = async (userId: any, data: any) => {
//   const response = await apiClient.put<any>(`/profile/${userId}`, data);
//   return response.data;
// };

// export const deleteUserById = async (userId: any) => {
//   const response = await apiClient.delete<any>(`/profile/${userId}`);
//   return response.data;
// };

// export const getAllUser = async () => {
//   const response = await apiClient.delete<any>(`/profile`);
//   return response.data;
// };

const UserProfileAPI = () => {
  const useListProfile = () => {
    return useQuery<any[], Error>("getAllProfile", async () => {
      const response = await apiClient.get<any[]>("/profile");
      return response.data;
    });
  };

  const useGetProfileById = (userId: string) => {
    return useQuery<any[], Error>(
      'getProfileById',
      async () => {
        console.log(userId, "service userId")
        const response = await apiClient.get(
          `profile/${userId}`
        );
        return response.data;
      }
    );
  };

  const useAddProfile = () => {
    return useMutation<any[], Error>(async (data: any) => {
      const response = await apiClient.post("/profile", data);
      return response.data;
    });
  };

  const useUploadDocument = () => {
    return useMutation<any[], Error>(async (data: any) => {
      const response = await apiClient.post("/document", data);
      return response.data;
    });
  };

  const useUpdateProfile = () => {
    return useMutation<any[], Error>(async (data: any) => {
      const response = await apiClient.put(
        `${"/profile"}/${data?.userId}`,
        data
      );
      return response.data;
    });
  };

  return React.useMemo(() => {
    return {
      useAddProfile,
      useListProfile,
      useGetProfileById,
      useUpdateProfile,
      useUploadDocument
    };
  }, []);
};
export default UserProfileAPI;
