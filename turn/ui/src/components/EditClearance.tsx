import { useState, useEffect } from "react";
import formService from "../services/form.service";
import AlertBox from "./Alert";

import { ClearanceFrm } from "./Types";
import {useNavigate, useParams} from "react-router-dom";
import OfficeService from "../services/office.service";
import ClearingOfficesTable from "./ClearingOfficesTable";
import AddClearingOfficeForm from "./AddClearingOfficeForm";

const EditClearance = () => {

  const [forms, setForms] = useState<ClearanceFrm[]>([]);
  const [clearingOffices, setClearingOffices] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ClearanceFrm>();
  const [errors, setErrors] = useState("");
  const [updated, setUpdated] = useState(0);
  const [alert, setAlert] = useState(<></>);


  const navigate = useNavigate();

  const {id} = useParams();
  

  const columns = [
    {
      name: "Clearing Office",
      selector: (row: ClearanceFrm) => row.name,
    },
    {
      name: "Abbreviation",
      selector: (row: ClearanceFrm) => row.abbrev,
    },
    {
      name: "Type",
      selector: (row: ClearanceFrm) => row.type,
    },
    {
      name: "Action",
      button: true,
      cell: (row: ClearanceFrm) => (
        <>
          <button
            className="btn"
            title="Edit"
            onClick={() => handleEdit(row)}
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
        (res: any) => {
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

  const handleEdit = (selectedForm: ClearanceFrm) => {
    console.log('hi')
    
  };


  useEffect(() => {
    const handleFetch = async () => {
      try {

        const clearance = await formService.getForms(id);
        console.log('clearance: ', clearance)

        setForms(clearance)

        const clearingOffices = await OfficeService.getClearingOffices(id);
    
      
        setClearingOffices(clearingOffices);
      } catch (err: any) {
        showAlert(err, false);
      }
    };
  
    handleFetch();
  }, []);

  
  
  const openModal = () => {
    setShowModal(true);
  };

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
        <div className="card-header">Edit Form</div>
        <div className="card-body">
            <h5 className="d-inline-flex justify-content-between">
              {forms[0]?.unit} Clearance Form
            </h5>
       
          <p className="card-text"></p>
          <div className="d-inline-flex justify-content-between align-items-center mb-3">
            <div className="d-inline-flex justify-content-start h-20">
              <button className="btn btn-primary" onClick={openModal}>
                Add Clearing office <i className="bi bi-person-plus"></i>
              </button>
            </div>
          </div>

          <div className="w-100 text-center">
              <ClearingOfficesTable
                data={clearingOffices}
                col={columns}
              />
          </div>
        </div>
      </div>
 
      {showModal && (
        <AddClearingOfficeForm
          show={showModal}
          setClose={closeModal}
          setAlert={showAlert}
          unitId={forms[0]?.unitId}
        />
      )}
    </>
  );
};

export default EditClearance;
