import axios, { AxiosError } from "axios";
import jwt from "jwt-decode";

const API_URL = "http://localhost:3000/offices";

const createOffice = (
  name: string,
  abbrev: string,
  unit_id: string,
  type: string
) => {
  return axios
    .post(API_URL, { name, abbrev, unit_id, type })
    .then(() => {
      return { success: true };
    }).catch((err) => {
      return err;
    });
};


const deleteOffice = (id: string) => {
  return axios.delete(API_URL + "/"+id).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

const editOffice = (
  id: string,
  name: string,
  abbrev: string,
  unit_id: string,
  type: string
) => {
  console.log('sending abbrev: ', abbrev)
  return axios
    .put(API_URL + "/"+id, {name, abbrev, unit_id, type })
    .then((res) => {
      console.log(res.data)
      return res.data;
    }).catch((err) => {
      return err;
    });
};

const getOffices = () => {
  return axios.get(API_URL).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

const getAvailableOffices = () => {
  return axios.get(API_URL + "/available").then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

const getClearingOffices = async (id?: string) => {
   return axios.get(`${API_URL}/clearingOffices/${id}`).then((res)=> {
    return res.data
  }).catch((err)=>{
    return err;
  })
}

const OfficeService = {
  createOffice,
  getOffices,
  deleteOffice,
  editOffice,
  getAvailableOffices,
  getClearingOffices
};

export default OfficeService;
