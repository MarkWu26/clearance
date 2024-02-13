import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import AlertBox from "./Alert";
import UsersTable from "./UsersTable";
import AddModal from "./UserModal";
import unitService from "../services/user.service";
import { User } from "./Types";
import userService from "../services/user.service";

const ManageUsers = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const [alert, setAlert] = useState(<></>);
  const [updated, setUpdated] = useState(0);
  const [user, setUser] = useState<User>();
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const columns = [

    {
      name: "Username",
      selector: (row: User) => row.username
    },

    {
      name: "Type",
      selector: (row: User) => row.type_name
    },

    {
      name: "Unit",
      selector: (row: User & {unit_abbrev: string}) => row.unit_abbrev
    },

    {
      name: "Role",
      selector: (row: User) => row.rights
    },

    {
      name: "Action",
      button: true,
      cell: (row: User) => (
        <div className="">
          {" "}
          <button
            className="btn"
            title="Edit"
            onClick={(e) => {
              console.log('roww: ', row)
              handleEdit({
                id: row.id,
                username: row.username,
                password: row.password,
                rights: row.rights,
                type: row.type,
                unit: row.unit,
                unit_id: row.unit_id,
                type_name: row.type_name,
                type_id: row.type_id
              })}
            }
            style={{
              marginRight: ".5rem",
              backgroundColor: "var( --or-edit)",
              color: "white",
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn"
            title="Delete"
            onClick={(e) => handleDelete(row.id)}
            style={{
              backgroundColor: "var(--red-failed)",
              color: "white",
            }}
          >
            <i className="bi bi-trash3"></i>
          </button>
          
        </div>
      ),
      minWidth: "10rem",
      wrap: true,
    },
  ];

  const showAlert = useCallback((message: string, success: boolean)=>{
    setUpdated(updated + 1);
    setAlert(
      <AlertBox
        isSuccess={success}
        message={message}
        duration={2000}
        onClose={() => {
          setAlert(<></>);
        }}
      />
    );
  }, [updated])

  /* const showAlert = (message: string, success: boolean) => {
    setUpdated(updated + 1);
    setAlert(
      <AlertBox
        isSuccess={success}
        message={message}
        duration={2000}
        onClose={() => {
          setAlert(<></>);
        }}
      />
    );
  };
 */
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await userService.getAllUsers();
        if (res.code) {
          // Handling API response error
          setErrors(res.message);
        } else {
          console.log('response: ', res.users)
          setUsers(res.users);
        }
      } catch (err) {
        // Handling network or other unexpected errors
        const error = err as Error;
        showAlert(error.message, false);
      }
    };
  
    handleFetch();
  }, [showAlert]);
  

  const showModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setUser(undefined);
    setShow(false);
  };

  

  const handleDelete = async (id: string) => {
    const originalUsers = [...users];
    setUsers(users.filter(user => user.id !== id));
  
    try {
      const res = await userService.deleteUser(id);
      if (!res.success) {
        // Revert back if deletion was unsuccessful
        setUsers(originalUsers);
        showAlert(res.error, false);
      } else {
        showAlert("User Deleted", true);
      }
    } catch (err) {
      // Revert back in case of network error
      const error = err as Error;
      setUsers(originalUsers);
      showAlert(error.message, false);
    }
  };
  

  const handleEdit = (selUser: User) => {
    setUser(selUser);
    setShow(true);
  };

  console.log('users: ', users)


  

  return (
    <>
      <div className="card m-2">
        <div className="card-header">Manage Users</div>
        <div className="card-body">
          <h5 className="card-title">Users</h5>
          <p className="card-text">Add or manage existing users</p>
          <div className="w-50 d-inline-flex justify-content-between align-items-center mb-3">
            <div className="d-inline-flex justify-content-start w-100 h-20">
              <button className="btn btn-primary" onClick={showModal}>
                Add User <i className="bi bi-person-plus"></i>
              </button>
            </div>
          </div>

          <div className="w-100 ext-center">
            <UsersTable data = { users } 
            col = { columns } />
          </div>
        </div>
      </div>

      {show ? (
        <AddModal
          show={show}
          setClose={closeModal}
          setAlert={showAlert}
          selectedUser={user}
     
        />
      ) : (
        <></>
      )}
       {alert}
    </>
  );
};

export default ManageUsers;