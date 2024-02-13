import axios, { AxiosError } from "axios";
import jwt from "jwt-decode";

const API_URL = "http://localhost:3000/users";

const registerUser = (
  username: string,
  password: string | number,
  unit: string,
  type: string,
  rights: string,
) => {
  return axios.post(API_URL + "/register", {username, password, type, unit, rights } ).then(() => {
    return { success: true };
  }).catch((err) => {
    return err;
  });
};

const deleteUser = (
  id: string,
) => {
  return axios.delete(API_URL + `/user/delete/${id}` ).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

const updateUser = (
  userId: string,
  username: string,
  password: string | number,
  unit: string,
  type: string,
  rights: string,
) => {
  console.log('the user id is: ', userId)
  return axios.put(API_URL + "/user/edit/", { userId, username, password, unit, type, rights } ).then((res) => {
    return res.data;
  }).catch((err: AxiosError) => {
      return err;
  });
};

const getUsers = (id: string) => {
  return axios.get(API_URL + "/user/" + id).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  });
};

const getAllUsers = () => {
  return axios.get(API_URL + "/getall").then((res) => {
    return res.data;
  }).catch((err) => {
    console.error("Error fetching users:", err.message)
    return {err: "An error occured while fetching users"};
  });
};

const getUserTypes = () => {
  return axios.get(API_URL + "/getUserTypes").then((res) => {
    return res.data;
  }).catch((err) => {
    console.error("Error fetching users:", err.message)
    return {err: "An error occured while fetching users"};
  });
}



const userService = {
  registerUser,
  getUsers,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserTypes
};

export default userService;