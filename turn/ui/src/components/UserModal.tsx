import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { User, Unit } from "./Types";
import userService from "../services/user.service";
import unitService from "../services/unit.service";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
  type: z.string().nonempty("Type is required"),
  unit: z.string().nonempty("Unit name is required"),
  rights: z.string().nonempty("Rights is required"),
});

interface Props {
  show: boolean;
  setClose: () => void;
  setAlert: (message: string, success: boolean) => void;
  selectedUser?: User | undefined;
}

const UsersModal = ({ show, setClose, setAlert, selectedUser }: Props) => {
  type Err = {
    msg?: string;
  };

  const [list, setList] = useState([]);
  const [unitList, setUnitList] = useState<Unit[]>();
  const [userName, setUserName] = useState(selectedUser?.username ?? "");
  const [userPass, setUsersPass] = useState(selectedUser?.password ?? "");
  const [usersType, setUsersType] = useState(selectedUser?.type ?? "");
  const [usersUnit, setUsersUnit] = useState(selectedUser?.unit ?? "");
  const [usersRight, setUsersRight] = useState(selectedUser?.rights ?? "");
 

  useEffect(() => {
  const fetchData = async () => {
    try {
      const usersData = await userService.getAllUsers();
      setList(usersData);
      console.log(list);

      const unitsData = await unitService.getUnits();
      setUnitList(unitsData);
    } catch (error) {
      if (error instanceof Error) {
        setAlert("Error fetching units: " + error.message, false);
      } else {
        setAlert("An unknown error occurred while fetching units", false);
      }
    }
  };
  fetchData();
  }, [setAlert]);


  console.log('unit list: ', unitList)

  type UserFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({ resolver: zodResolver(schema) });

  const [customErrors, setCustomErrors] = useState<Err[]>();

  const onSubmit = handleSubmit(async (data) => {
    console.log('Form submitted', data);
    console.log('the selected id is: ', selectedUser?.id);
    try {
      if (selectedUser) {
        // Edit user
        await userService
        .updateUser(
          selectedUser.id,
          data.username,
          data.password,
          data.type,
          data.unit,
          data.rights
        ).then(
          (res) => {
            if (res.success === true) {
              setAlert("User edited", true);
          
            } else {
              
              setAlert(res.error, false);
            }
            setClose();
          },
          (error) => {
            setCustomErrors(error.response.data.errors);
          }
        );
        
      } else {
        // Create user
        await userService.registerUser(data.username, data.password, data.type, data.unit, data.rights).then(
          (res) => {
            if (res.success === true) {
              setAlert("User created", true);
              reset();
              setClose();
            } else {
              setAlert(res.error, false);
            }
            setClose();
          },
          (error) => {
            setCustomErrors(error.response.data.errors);
          }
        );
      }


    } catch (err) {
      console.error(err);
    }
  });
  


  return (
    <>
      <Modal show={show} onHide={setClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? "Edit User" : "Create User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label className="form-label frm-label">Username</label>
            <input
              {...register("username")}
              type="text"
              className="form-control mb-2 poppins-reg"
              id="username"
              placeholder="e.g. idk"
              onChange={(e) => {
                setUserName(e.target.value);
                setCustomErrors([]);
              }}
              value = {userName}
              autoComplete="username"
            />
            {errors.username && (
              <p key="name_err" className="text-danger">
                {errors.username.message}
              </p>
            )}

            <label className="form-label frm-label">Password</label>
            <input
              {...register("password")}
              type="password"  
              className="form-control mb-2 poppins-reg"
              id="password"  
              placeholder="e.g. username123"
              onChange={(e) => {
                setUsersPass(e.target.value);
                setCustomErrors([]);
              }} 
              value = {userPass}
              autoComplete="current-password"
            />
            {errors.password && (
              <p key="password_err" className="text-danger">
                {errors.password.message}
              </p>
            )}


            <label className="form-label frm-label">Type</label>
            <select
              {...register("type")}
              className="form-select mb-2 poppins-reg"
              id="type"
              value = {usersType}
              onChange={(e) => {
                setUsersType(e.target.value)
                setCustomErrors([]);
              }}
            >
              {!selectedUser && (
                <option value="" disabled>
                  Choose Type
                </option>
              )}
              

              <option value="Admin" id="type_1">
                      Admin
                    </option>
                    <option value="Unit" id="type_2">
                      Unit
                    </option>
                    <option value="Office" id="type_3">
                      Office
                    </option>
                    <option value="Fin" id="type_4">
                      Finance
                    </option>.
                    <option value="Lib" id="type_5">
                      Library
                    </option>
                    <option value="Dean" id="type_6">
                      Dean
                    </option>
                    <option value="D" id="type_7">
                      Department
                    </option>
            </select>

            {errors.type && (
              <p key="type_err" className="text-danger">
                {errors.type.message}
              </p>
            )}

            <label className="form-label frm-label">Unit</label>
            <select
              {...register("unit")}
              className="form-select mb-2 poppins-reg "
              id="unit"
              value = {usersUnit}
              onChange={(e) => {
                setUsersUnit(e.target.value)
                setCustomErrors([]);
              }}
          
            >
              {!selectedUser && (
                <option value="" disabled>
                  Choose Unit
                </option>
              )}
              <option value="0">ALL</option>
              {unitList?.map((unit) => (
                
                  <option value={unit.id} key={unit.id}>
                    {unit.name + ` (${unit.desc})`}
                  </option>
                
              ))}
            </select>
            {errors.unit && (
              <p key="unit_err" className="text-danger">
                {errors.unit.message}
              </p>
            )}

            <label className="form-label frm-label">Rights</label>
            <select
              {...register("rights")}
              className="form-select mb-2 poppins-reg"
              id="rights"
              value = {usersRight}
              onChange={(e) => {
                setUsersRight(e.target.value)
                setCustomErrors([]);
              }}
            >
              {!selectedUser && (
                <option value="" disabled>
                  Choose Rights
                </option>
              )}


              <option value="0">ALL</option>
              <option value="manage_units" id="type_1">
                      manage_units
                    </option>
                    <option value="manage_users" id="type_2">
                      manage_users
                    </option>
                    <option value="manage_offices" id="type_3">
                      manage_offices
                    </option>
                    <option value="manage_form" id="type_4">
                      manage_form
                    </option>.
                    <option value="manage_gnpn" id="type_5">
                      manage_gnpn
                    </option>
                    <option value="manage_dept" id="type_6">
                      manage_departments
                    </option>
                    <option value="view_clr" id="type_7">
                      view_clearance
                    </option>
                    <option value="upload_file" id="type_8">
                      upload_file
                    </option>
                    <option value="hold_all" id="type_9">
                      hold_all
                    </option>
            </select>

            {errors.rights && (
              <p key="rights_err" className="text-danger">
                {errors.rights.message}
              </p>
            )}
      
            
          </form>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersModal;