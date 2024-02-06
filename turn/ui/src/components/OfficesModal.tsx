import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
 import { Office, Unit } from "./Types";
import OfficeService from "../services/office.service";
import unitService from "../services/unit.service";
interface Props {
  show: boolean;
  setClose: () => void;
  setAlert: (message: string, success: boolean) => void;
  selectedOffice: Office | undefined;
}

const OfficesModal = ({ show, setClose, setAlert, selectedOffice }: Props) => {
  type Err = {
    msg?: string;
  };

  const [list, setList] = useState([]);
  const [unitList, setUnitList] = useState<Unit[]>();
  const [officeName, setOfficeName] = useState(selectedOffice?.name ?? "");
  const [unitChosen, setUnitChosen] = useState(selectedOffice?.unit ?? "");
  const [typeChosen, setTypeChosen] = useState(selectedOffice?.type ?? "");
  useEffect(() => {
    const newList = async () => {
      await OfficeService.getAvailableOffices().then((data) => {
        setList(data);
      });
      await unitService.getUnits().then((data) => {
        setUnitList(data);
      });
    };
    newList();
  }, []);




  const schema = z.object({
    name: z
      .string()
      .nonempty("Office name is required")
      ,
    abbrev: z
      .string()
      .regex(
        new RegExp(/^[a-zA-Z0-9. -]+$/),
        "Must not contain special characters"
      ),
      unit_id: z
      .string()
      .nonempty("Unit name is required"),
      type: z
      .string()
      .nonempty("Type is required")
      ,
  });
  type Office = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Office>({ resolver: zodResolver(schema) });
  const [customErrors, setCustomErrors] = useState<Err[]>();
  

  const onSubmit = handleSubmit(async (data) => {
    if (selectedOffice) {
      //edit
      try {
         OfficeService
          .editOffice(
            selectedOffice.id,
            data.name,
            data.abbrev,
            data.unit_id,
            data.type
          )
          .then(
            (res) => {
              // setAlert();
              console.log(res.success)
              if (res.success === true) {
                setAlert("Office edited", true);
              } else {
                setAlert(res.error, false);
              }
             
              setClose();
            },
            (error) => {
              setCustomErrors(error.response.data.errors);
            }
          );
      } catch (err) {
        console.log(err);
      }
    } else {
      //create
      try {
         OfficeService.createOffice(data.name, data.abbrev, data.unit_id, data.type).then(
          (res) => {
            // setAlert();
            // console.log(res);
         
            if (res.success === true) {
              console.log(res.success)
              setAlert("Office created", true);
            } else {
              setAlert(res.error, false);
            }
            setClose();
          },
          (error) => {
            setCustomErrors(error.response.data.errors);
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    reset();
  });

  return (
    <>
      <Modal show={show} onHide={setClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedOffice ? "Edit Office" : "Create Office"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label className="form-label frm-label">Office</label>
            <select 
              {...register("name")}
              className="form-select mb-2 poppins-reg "
              id="name"
              onChange={(e) => {
                setOfficeName(e.target.value)
                setCustomErrors([]);
              }}
            
              value={ officeName }
              
            >
              {selectedOffice ? "" : (
                <option value="" disabled>
                  Choose Office
                </option>
              )}
              {list.map((office, i) => {
                return (
                  <option value={office} id={"office_" + i}>
                    {office}
                  </option>
                );
              })}
            </select>
            {errors.name && (
              <p key="office_err" className="text-danger">
                {errors.name.message}
              </p>
            )}

            <label className="form-label frm-label">Abbreviation</label>
            <input
              {...register("abbrev")}
              type="text"
              className="form-control mb-2 poppins-reg "
              id="abbrev"
              placeholder="e.g. College, Graduate School"
              onChange={() => {
                setCustomErrors([]);
              }}
              defaultValue={selectedOffice?.abbrev}
            />
            {errors.abbrev && (
              <p key="abbrev_err" className="text-danger">
                {errors.abbrev.message}
              </p>
            )}

            <label className="form-label frm-label">Unit</label>
            <select
              {...register("unit_id")}
              className="form-select mb-2 poppins-reg "
              id="unit_id"
              onChange={(e) => {
                setUnitChosen(e.target.value)
                setCustomErrors([]);
              }}
              
              value = {unitChosen}
            >
              {selectedOffice ? "" : (
                <option value="" disabled>
                  Choose Unit
                </option>
              )}
              <option value="0">ALL</option>
              {unitList?.map((u, i) => {
                return (
                  <option value={u.id} id={"unit_id_" + i}>
                    {u.name + ` (${u.desc})`}
                  </option>
                );
              })}
            </select>
            {errors.unit_id && (
              <p key="unit_id_err" className="text-danger">
                {errors.unit_id.message}
              </p>
            )}

            <label className="form-label frm-label">Type</label>
            <select
              {...register("type")}
              className="form-select mb-2 poppins-reg "
              id="type"
              onChange={(e) => {
                setTypeChosen(e.target.value)
                setCustomErrors([]);
              }}
              
              value={ typeChosen }
            >
              {selectedOffice ? "" : (
                <option value="" disabled>
                  Choose Type
                </option>
              )}

              <option value="OFFICE" id="type_1">
                    Office
                  </option>
                  <option value="FIN" id="type_2">
                    Finance
                  </option>
                  <option value="LIB" id="type_3">
                    Library
                  </option>
                  <option value="DEAN" id="type_4">
                    School
                  </option>
                  <option value="DEPT" id="type_4">
                    Department
                  </option>
            </select>
            {errors.type && (
              <p key="type_err" className="text-danger">
                {errors.type.message}
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

export default OfficesModal;
