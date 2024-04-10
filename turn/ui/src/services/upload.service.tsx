import axios, { AxiosError, AxiosProgressEvent } from "axios";

const API_URL = "http://localhost:3000/upload-and-parse";
const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 50 MB

type UploadResponseData = {
  fileId: string;
  fileName: string;
};

type UploadResponse = {
  success: boolean;
  message?: string;
  data?: UploadResponseData;
};

type UploadFileArgs = {
  file: File;
  onProgress: (progress: number) => void;
};

const uploadFile = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<UploadResponse> => {
  const formData = new FormData();

  // Check if file is not null before appending to formData
  if (file) {
    console.log('file: ', file, 'form data: ', formData)
    formData.append("file", file);
  } else {
    return {
      success: false,
      message: "No file provided",
    };
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      } else {
        onProgress(0);
      }
    },
    timeout: 60000, // Updated to 60 seconds
  };

  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      message: `File size exceeds the allowed limit of ${MAX_FILE_SIZE_MB} MB`,
    };
  }

  try {
 /*    const response = await axios.post(`${API_URL}/upload`, formData, config); */
 console.log('helloo')
    const response = await axios.post(`${API_URL}/upload-and-parse`, formData, config);
    console.log('respo: ', response)
    if(!response.data.success){
      return {
        success: false,
        message: response.data.message
      };
    }
    return {
      success: true,
      message: "File uploaded and parsed successfully",
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error)
      const serverMessage = error.response?.data?.message || "Unknown server error";
      const statusCode = error.response?.status;
      console.error(`Error uploading file: ${serverMessage} (Status code: ${statusCode})`);
      return {
        success: false,
        message: serverMessage,
      };
    } else {
      console.error('Error uploading file:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
      };
    }
  }
};

const uploadService = {
  uploadFile,
};

export default uploadService;