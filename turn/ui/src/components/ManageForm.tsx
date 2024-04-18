import { useState, useEffect } from "react";
import ClearanceForm from "./Form";
import formService from "../services/form.service";
import FormModal from "./FormModal";
import AlertBox from "./Alert";

import { ClearanceFrm } from "./Types";
import {useNavigate} from "react-router-dom";

const ManageForms = () => {

  const [forms, setForms] = useState<ClearanceFrm[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ClearanceFrm>();
  const [errors, setErrors] = useState("");
  const [updated, setUpdated] = useState(0);
  const [alert, setAlert] = useState(<></>);

  const navigate = useNavigate();

  const columns = [
    {
      name: "Unit",
      selector: (row: ClearanceFrm) => row.unit,
    },
    {
      name: "Office",
      selector: (row: ClearanceFrm) => row.officeName,
    },
    {
      name: "Abbreviation",
      selector: (row: ClearanceFrm) => row.officeAbbrev,
    },
    {
      name: "Groups",
      selector: (row: ClearanceFrm) => row.group,
     
    },
    
    
    {
      name: "Action",
      button: true,
      width: "15%",
      cell: (row: ClearanceFrm) => (
        <>
         <button
            className="btn bg-primary me-2"
            title="View"
            onClick={() => handleView(row)}
            style={{
              color: "white",
            }}
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            className="btn"
            title="Edit"
            onClick={() => editModal(row)}
            style={{
              backgroundColor: "var(--or-edit)",
              color: "white",
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn"
            title="Delete"
            onClick={() => handleDelete(row.id)}
            style={{
              marginLeft: ".5rem",
              backgroundColor: "var(--red-failed)",
              color: "white",
            }}
          >
            <i className="bi bi-trash3"></i>
          </button>
        </>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      await formService.deleteForm(id).then(
        (res) => {
          if (res.success === true) {
            showAlert("Form Deleted", true);
          } else {
            showAlert(res.error, false);
          }
        },
        (error) => {
          showAlert(error, false);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = (selectedForm: ClearanceFrm) => {
    navigate(`/clearanceform/${selectedForm.id}`);
  };


  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await formService.getAllForms();
        
        if (res.code) {
          setErrors(res.message);
        }
        
        setForms(res);
      } catch (err: any) {
        showAlert(err, false);
      }
    };
  
    handleFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);
  
  
  const openModal = () => {
    setShowModal(true);
  };

  
  const editModal = (selectedForm: ClearanceFrm) => {
    console.log(selectedForm)
    setForm(selectedForm);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setForm(undefined);
  };

  const ALERT_DURATION = 2000;

  const showAlert = (message: string, success: boolean) => {
    setUpdated(updated + 1);
    setAlert(
      <AlertBox
        isSuccess={success}
        message={message}
        duration={ALERT_DURATION}
        onClose={() => {
          setAlert(<></>);
        }}
      />
    );
  };

  return (
    <>
      <div className="card m-2">
        <div className="card-header">Manage Clearance Form</div>
        <div className="card-body">
          <h5 className="card-title">Clearance Form</h5>
          <p className="card-text">Add or manage clearing offices in the clearance form</p>
          <div className="d-inline-flex justify-content-between align-items-center mb-3">
            <div className="d-inline-flex justify-content-start h-20">
              <button className="btn btn-primary" onClick={openModal}>
                Add Form <i className="bi bi-plus-square ms-2 "></i>
              </button>
            </div>
          </div>

          <div className="w-100">
            <ClearanceForm data={forms} columns={columns} />
          </div>
        </div>
      </div>
 
      {showModal && (
        <FormModal
          show={showModal}
          setClose={closeModal}
          setAlert={showAlert}
          selectedForm={form}
        />
      )}

      {alert}
    </>
  );
};

export default ManageForms;
