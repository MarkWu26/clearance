import axios, { AxiosResponse } from "axios";
import jwt from "jwt-decode";

const API_URL = "http://localhost:3000/forms";

interface ApiResponse {
  success: boolean;
  error?: string | undefined;
}

const createForm = async (
  unit: string,
  officeName: string,
  officeAbbrev: string,
  group: string
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(API_URL, { unit, officeName, officeAbbrev, group });
    return response.data;
  } catch (error: any) {
    console.error("Create Form Error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

const deleteForm = async (id: string): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.delete(`${API_URL}/forms/delete/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Delete Form Error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

const editForm = async (
  id: string,
  unit: string,
  officeName: string,
  officeAbbrev: string,
  group: string
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.put(`${API_URL}/forms/edit/${id}`, {
      unit,
      officeName,
      officeAbbrev,
      group,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Edit Form Error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

const getForms = async (id?: string): Promise<ApiResponse> => {
  const url = id ? `${API_URL}/forms/${id}` : `${API_URL}/forms`;
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Get Forms Error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

const formService = {
  createForm,
  getForms,
  deleteForm,
  editForm,
};

export default formService;
