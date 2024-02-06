import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import ConfigModal from "./ConfigModal";
import UnitsTable from "./UnitsTable";
import AddModal from "./UnitModal";
import unitService from "../services/unit.service";
import AlertBox from "./Alert";
import {Config, Unit} from "./Types";
const ManageUnits = () => {
  
  const [alert, setAlert] = useState(<></>);
  const [units, setUnits] = useState<Unit[]>([]);
  const [updated, setUpdated] = useState(0);
  const [unit, setUnit] = useState<Unit>();
  const [unitConfig, setUnitConfig] = useState<Config>();
  const [showConfigModal, setShowConfigModal] = useState(false);
  
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState("");
  const columns = [
    {
      name: "Name",
      selector: (row: Unit) => row.name,
    },
    {
      name: "Description",
      selector: (row: Unit) => row.desc,
    },
    {
      name: "Action",
      button: true,
      cell: (row: Unit) => (
        <div className="">
          {" "}
          <button
            className="btn"
            title="Configure"
            onClick={(e) => handleConfig(row.id)}
            style={{
              backgroundColor: "var(--gray-color)",
              color: "white",
              marginRight: ".5rem",
            }}
          >
            <i className="bi bi-gear-fill"></i>
          </button>
          <button
            className="btn"
            title="Edit"
            onClick={(e) =>
              handleEdit({ id: row.id, name: row.name, desc: row.desc })
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
      try {
        const res = await unitService.getUnits();
        if (res.code) {
          setErrors(res.message);
        } else {
          setUnits(res);
        }
      } catch (error) {
        setErrors("An error occurred while fetching units.");
      }
    };
    handleFetch();
  }, [updated]);

  const showModal = () => {
    setShow(true);

  };
  const closeModal = () => {
    setUnit(undefined);
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
      const res = await unitService.deleteUnit(id);
      if (res.success) {
        showAlert("Unit Deleted", true);
      } else {
        showAlert("Error deleting unit", false);
      }
    } catch (error) {
      showAlert("Error deleting unit", false);
    }
  };
 
  const handleEdit = (selUnit: Unit) => {
    setUnit(selUnit);
    setShow(true);
  };

  const handleConfig = async (unitId: string) => {
    try {
      const config = await unitService.getConfig(unitId);
      setUnitConfig(config);
      setShowConfigModal(true);
    } catch (error) {
      showAlert("Error fetching configuration", false);
    }
  };
  

  return (
    <>
      <div className="card m-2">
        <div className="card-header">Manage Units</div>
        <div className="card-body">
        {!errors ? (<>
          <h5 className="card-title">Units</h5>
          <p className="card-text">Add or configure existing units</p>
          <div className="w-50 d-inline-flex justify-content-between align-items-center mb-3">
            <div className="d-inline-flex justify-content-start w-100 h-20">
              <button className="btn btn-primary add-btn " onClick={showModal}>
                Add Unit <i className="bi bi-person-plus"></i>
              </button>
            </div>
          </div>

          <div className="w-100 ext-center">
            <UnitsTable
              data={units}
              col = {columns}
            />

          </div></>) : <p className="text-danger text-center">{errors}. Please refresh the page.</p>}
        </div>
      </div>
      {show ? (
        <AddModal
          show={show}
          setClose={closeModal}
          setAlert={showAlert}
          selectedUnit={unit}
        />
      ) : showConfigModal ? (
        <ConfigModal
          show={showConfigModal}
          setClose={() => setShowConfigModal(false)}
          setAlert={showAlert}
          selectedConfig={unitConfig}
        />
      ) : (
        <p>{show}</p>
      )}
      {alert}
    </>
  );
};

export default ManageUnits;
