import logo from "/adzu_seal.png";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/auth.service";
import "../main.css";
type Err = {
  msg?: string;
};
interface Props {
  isAuthenticated: boolean;
  setAuth: (auth: boolean, userName: string) => void;
}

const Login = () => {


  const schema = z.object({
    username: z
      .string()
      .nonempty("Username is required")
      .regex(new RegExp(/^[a-zA-Z0-9]+$/), "Invalid username"),
    password: z.string().nonempty("Password is Required"),
  });
  type UserCreds = z.infer<typeof schema>;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCreds>({ resolver: zodResolver(schema) });
  const [customErrors, setCustomErrors] = useState<Err[]>();
  const [axErrors, setAxErrors] = useState("");
  const onSubmit = handleSubmit(async (data) => {
    setAxErrors("");
    try {
      await authService.login(data.username, data.password).then(
        (res) => {
            if(res.code){
              if(res.code === "ERR_NETWORK" || res.code === "ERR_CONN"){
              console.log(res.message)
              setAxErrors(res.message+". Please try again.");
              }else if (res.code === "ERR_BAD_REQUEST"){
                setAxErrors("Invalid username or password.");
              }

              
            }else{
          navigate("/dashboard");
          window.location.reload();
            }
        },
        (error) => {
          setCustomErrors(error.response.data.errors);
        }
      );
    } catch (err) {
      console.log(err);
    }

    reset();
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //console.log("User pressed: ", e.key);

    if (e.key === "Enter") {
      e.preventDefault();

      //onSubmit();
    }
  };

  return (
    <>
      <div className="card container col-md-3 mt-5 card-fixed shadow p-3 mb-5 bg-body border border-0 bg-opacity-75 ">
        <div className="card-body">
          <div className="d-inline-flex justify-content-center w-100 align-items-center">
            <div className="w-10 px-3">
              <img src={logo} alt="Logo" />
            </div>
            <div className="w-75 px-3">
              <h5 className="card-title mt-2 mb-3 poppins font">
                Centralized Clearance System
              </h5>
            </div>
          </div>
          <div className="d-flex justify-content-center m-2">
            <hr className="w-75"></hr>
          </div>
          <form onSubmit={onSubmit}>
            <h5 className="text-center poppins-reg ">Login to your account</h5>
            <div className="mb-3 p-3">
              <input
                {...register("username")}
                type="text"
                className="form-control mb-2 poppins-reg "
                id="username"
                placeholder="Username"
                onKeyDown={handleKeyDown}
                onChange={() => {
                  setCustomErrors([]);
                }}
              />
              {errors.username && (
                <p key="username_err" className="text-danger">
                  {errors.username.message}
                </p>
              )}
              {customErrors?.map((err, i) => {
                return (
                  <React.Fragment key={"login_err_" + i}>
                    <p key={"err_" + i} className="text-danger">
                      {err.msg}
                    </p>
                  </React.Fragment>
                );
              })}
              <input
                {...register("password")}
                type="password"
                onKeyDown={handleKeyDown}
                className="form-control poppins-reg "
                id="password"
                placeholder="Password"
                onChange={() => {
                  setCustomErrors([]);
                }}
              />
              {errors.password && (
                <p key="pass_err" className="text-danger">
                  {errors.password.message}
                </p>
              )}
            </div>
                
            <button className="btn btn-primary w-100 mt-4 poppins-reg">
              Log in
            </button>
          </form>
          {<p key="ax_err" className="text-danger text-center mt-2">
                  {axErrors}
                </p>}
        </div>
      </div>
    </>
  );
};

export default Login;