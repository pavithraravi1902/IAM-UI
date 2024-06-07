import React from "react";
import { useMutation } from "react-query";
import apiClient from "./http";

type UploadFormData = {
  requestFile: File;
  setFileUploadProgress: React.Dispatch<React.SetStateAction<number>>;
};

const DocumentAPI = () => {
  const useUploadDocument = () => {
    return useMutation<any[], Error, UploadFormData>(
      async (formData: UploadFormData) => {
        const config = {
          onUploadProgress: (progressEvent: any) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            formData.setFileUploadProgress(percentCompleted);
          },
        };

        const response = await apiClient.post(
          "/documents",
          formData.requestFile,
          config
        );
        return response.data;
      }
    );
  };

  return React.useMemo(() => {
    return {
      useUploadDocument,
    };
  }, []);
};
export default DocumentAPI;
