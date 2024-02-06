import axios, { AxiosError } from "axios";
import { error } from "jquery";
import jwt from "jwt-decode";
const API_URL = "http://localhost:3000/auth";

type user = {
  id: string;
  username: string;
  rights: string;
  unit: string;
};

const login = (username: string, password: string) => {
  return axios.post(API_URL + "/login", { username, password }).then((res) => {
    if (res.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(res.data.accessToken));
      //localStorage.setItem("user", JSON.stringify(jwt(res.data.accessToken)));
      localStorage.setItem("auth", "true");
    }
    return res.data;
  }).catch((err) => {
    
    return err;
  });
  // .catch((err) => {
  //   console.log("error caught!", err);
  // });
};

const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
};

const getCurrentUser = (): user => {
  const data = JSON.parse(localStorage.getItem("user") ?? "{}") || {};
  //console.log(jwt(data));
  try {
    if (isAuth() === true) {
      return jwt(data);
    }
    return { id: "", username: "", rights: "", unit: "" };
  } catch (err) {
    console.error("Error decoding token at getuser:", err);
    return { id: "", username: "", rights: "", unit: "" };
  }
};
const isAuth = (): boolean => {
  //can be cleaner :3
  const data = JSON.parse(localStorage.getItem("user") ?? "{}") || {};
  if (data.length > 0) {
    const currDate = new Date();
    try {
      const decodedTkn: any = jwt(data);
      // Proceed with your logic using decodedToken

      //const decodedTkn: any = jwt(data);

      if (decodedTkn.exp * 1000 < currDate.getTime()) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }
  return false;
};
const checkPermissions = (roles: string[], requiredPermission: string) => {
  if (roles.includes(requiredPermission)) {
    return true;
  }
  return false;
};

const authService = {
  login,
  logout,
  getCurrentUser,
  checkPermissions,
  isAuth,
};

export default authService;