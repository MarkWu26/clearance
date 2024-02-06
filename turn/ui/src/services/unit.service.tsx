import axios, { AxiosError } from "axios";
import { error } from "jquery";
import jwt from "jwt-decode";
import { Config } from "../components/Types";
const API_URL = "http://localhost:3000/";

const createUnit = (name: string, desc: string) => {
  return axios.post(API_URL + "units", { name, desc }).then(() => {
    return { success: true };
  }).catch((err) => {
    return err;
  });
};

const deleteUnit = (id: string) => {
  return axios.post(API_URL + "units/delete", { id }).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

const editUnit = (id: string, name: string, desc: string) => {
  return axios.post(API_URL + "units/edit", { id, name, desc }).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

const getUnits = () => {
  return axios.get(API_URL + "units").then((res) => {
  
    return res.data;
  }).catch((err) => {
    return err;
  });
};

const getConfig = (unitId: string): Promise<Config> => {
  return axios.get(API_URL + "units/config/" + unitId) // Corrected URL
    .then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
}


const createConfig = (configData: Config) => {
  return axios.post(API_URL + "config/create", configData)
    .then(res => res.data)
    .catch((err: AxiosError) => {
      // Handle the error appropriately
      return { success: false, error: err.message };
    });
};

const editConfig = (id: string, configData: Config) => {
  return axios.post(API_URL + `config/edit/${id}`, configData)
    .then(res => res.data)
    .catch((err: AxiosError) => {
      // Handle the error appropriately
      return { success: false, error: err.message };
    });
};

const unitService = {
  createUnit,
  getUnits,
  deleteUnit,
  editUnit,
  createConfig,
  editConfig,
  getConfig
};

export default unitService;
