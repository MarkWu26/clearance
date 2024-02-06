import { useEffect, useState } from "react";
import OfficesTable from "./OfficesTable";
import { Office } from "./Types";
import OfficeService from "../services/office.service";
import AlertBox from "./Alert";
import AddModal from "./OfficesModal";
import { AxiosError } from "axios";
const ManageOffices = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [alert, setAlert] = useState(<></>);
  const [updated, setUpdated] = useState(0);
  const [office, setOffice] = useState<Office>();
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState("");
  const columns = [
    {
      name: "Name",
      selector: (row: Office) => row.name,
    },
    {
      name: "Abbreviation",
      selector: (row: Office) => row.abbrev,
    }, 
    {
      name: "Unit",
      selector: (row: Office) => row.unit,
    },
    {
      name: "Type",
      selector: (row: Office) => row.type,
    },
    {
      name: "Action",
      button: true,
      cell: (row: Office) => (
        <div className="">
          {" "}
          <button
            className="btn"
            title="Edit"
            onClick={(e) => {
              console.log(row)
              handleEdit({
                id: row.id,
                name: row.name,
                abbrev: row.abbrev,
                unit: row.unit,
                type: row.type,
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

  useEffect(() => {
    const handleFetch = async () => {
      await OfficeService.getOffices().then((res) => {
        if(res.code) {
          setErrors(res.message);
          
        }
        setOffices(res);
      }).catch(err => {
        
        showAlert(err, false);
      });
    };

    handleFetch();
  }, [updated]);

  const showModal = () => {
   
    setShow(true);
  };
  const closeModal = () => {
    setOffice(undefined);
    setShow(false);
  };

  const showAlert = (message: string, success: boolean) => {
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

  const handleDelete = async (id: string) => {
    try {
      await OfficeService.deleteOffice(id).then(
        (res) => {
          if (res.success === true) {
            showAlert("Office Deleted", true);
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

  const handleEdit = (selOffice: Office) => {
    setOffice(selOffice);
    setShow(true);
  };
  
  return (
    <>
      <div className="card m-2">
        <div className="card-header">Manage Clearing Offices</div>
        <div className="card-body">
        {!errors ? (<>
          <h5 className="card-title">Clearing Offices</h5>
          <p className="card-text">Add or manage clearing offices.</p>
          <div className="w-50 d-inline-flex justify-content-between align-items-center mb-3">
            <div className="d-inline-flex justify-content-start w-100 h-20">
              <button className="btn btn-primary" onClick={(showModal)}>
                Add Clearing Office &nbsp;
                <i className="bi bi-person-plus"></i>
              </button >
            </div>
          </div>
        <div className="w-100 ext-center">
            <OfficesTable data={offices} col={columns} />
          </div></>) : <p className="text-danger text-center">{errors}. Please refresh the page.</p>}
          
        </div>
      </div>

      {show ? (
        <AddModal
          show={show}
          setClose={closeModal}
          setAlert={showAlert}
          selectedOffice={office}
     
        />
      ) : (
        <p>{show}</p>
      )}
       {alert}
    </>
  );
};

export default ManageOffices;
