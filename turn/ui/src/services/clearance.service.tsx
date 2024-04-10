import axios from "axios";


const API_URL = "http://localhost:3000/clearance";


const getActiveHoldlist = () => {
  return axios.get(`${API_URL}/activeHoldlist`).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};


const clearanceService = {
  getActiveHoldlist,
};

export default clearanceService;
