import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
 import { ClearanceFrm, Office, Unit } from "./Types";
import formService from "../services/form.service";
import unitService from "../services/unit.service";
import OfficeService from "../services/office.service";
import { clearanceGroups } from "./Types";
import groupService from "../services/groups.service";

interface Props {
    show: boolean;
    setClose: () => void;
    setAlert: (message: string, success: boolean) => void;
    selectedForm: ClearanceFrm | undefined;
}

const FormModal = ({ show, setClose, setAlert, selectedForm }: Props) => {
    type Err = {
        msg?: string;
    };

    const [list, setList] = useState<string[]>([]);
    
    const [unitList, setUnitList] = useState<Unit[] | undefined>([]);
    const [chosenOffice, setChosenOffice] = useState(selectedForm?.officeName ?? "");
    const [chosenUnit, setChosenUnit] = useState(selectedForm?.unit)
    const [abbrevChosen, setAbbrevChosen] = useState(selectedForm?.officeAbbrev ?? "");
    const [groupChosen, setGroupChosen] = useState(selectedForm?.group ?? "");
    const [groups, setGroups] = useState<clearanceGroups [] | undefined>([])
 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const offices = await OfficeService.getAvailableOffices();
          const units = await unitService.getUnits();
          const groups = await groupService.getGroups();
          setGroups(groups)
          setList(offices);
          setUnitList(units);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

    const schema = z.object({
        officeName: z
          .string()
          .nonempty("Office name is required")
          ,
        officeAbbrev: z
          .string()
          .regex(
            new RegExp(/^[a-zA-Z0-9. -]+$/),
            "Must not contain special characters"
          ),
        group: z
          .string()
          .nonempty("Group name is required"),
        unit: z
          .string()
          .nonempty("Unit name is required")
          ,

    });

    type ClearanceFrm = z.infer<typeof schema>;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ClearanceFrm>({ resolver: zodResolver(schema) });
    const [customErrors, setCustomErrors] = useState<Err[]>();

    const onSubmit = handleSubmit(async (data) => {
      try {
        if (selectedForm) {
          // edit
          const res = await formService.editForm(
            selectedForm.id,
            data.unit,
            data.officeName,
            data.officeAbbrev,
            data.group
          );
            // setAlert();
            console.log(res.success)
            if (res.success === true) {
              setAlert("Form edited", true);
            } else {
              const errorMessage = res.error || "An unknown error occurred"; 
              setAlert(errorMessage, false);
            }            
           
          setClose();
          
        } else {
          // create
          try {
            const res = await formService.createForm(
              data.unit,
              data.officeName,
              data.officeAbbrev, 
              data.group
            );
    
            if (res.success === true) {
              setAlert("Form created", true);
            } else {
              const errorMessage = res.error || "An unknown error occurred"; 
              setAlert(errorMessage, false);
            }
            
            setClose();
          } catch (error: any) {
            setCustomErrors(error.response.data.errors);
          }
        }
        reset();
      } catch (err) {
        console.log(err);
      }
    });
    
    
    return (
        <>
          <Modal show={show} onHide={setClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedForm ? "Edit Form" : "Create Form"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
              <label className="form-label frm-label">Unit</label>
                <select
                  {...register("unit")}
                  className="form-select mb-2 poppins-reg "
                  id="unit"
                  onChange={(e) => {
                    setChosenUnit(e.target.value)
                    setCustomErrors([]);
                  }}
                  
                  value = {chosenUnit}
                >
                  {selectedForm ? "" : (
                    <option value="" disabled>
                      Choose Unit
                    </option>
                  )}
                  <option value="0">ALL</option>
                  {unitList?.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name + ` (${u.desc})`}
                    </option>
                  ))}
                </select>
                {errors.unit && (
                  <p key="unit_err" className="text-danger">
                    {errors.unit.message}
                  </p>
                )}

                <label className="form-label frm-label">Office</label>
                <select 
                  {...register("officeName")}
                  className="form-select mb-2 poppins-reg "
                  id="officeName"
                  onChange={(e) => {
                    setChosenOffice(e.target.value)
                    setCustomErrors([]);
                  }}
                
                  value={ chosenOffice }
                  
                >
                  {selectedForm ? "" : (
                    <option value="" disabled>
                      Choose Office
                    </option>
                  )}
                  {list.map((office, i) => {
                  return (
                      <option key={`office_`+i} value={office}>
                          {office}
                      </option>
                    );
                  })}
                </select>
                {errors.officeName && (
                  <p key="officeName_err" className="text-danger">
                    {errors.officeName.message}
                  </p>
                )}
    
                <label className="form-label frm-label">Abbreviation</label>
                <input
                  {...register("officeAbbrev")}
                  type="text"
                  className="form-control mb-2 poppins-reg "
                  id="OfficeAbbrev"
                  placeholder="e.g. College, Graduate School"
                  onChange={() => {
                    setCustomErrors([]);
                  }}
                  defaultValue={selectedForm?.officeAbbrev}
                />
                {errors.officeAbbrev && (
                  <p key="officeAbbrev_err" className="text-danger">
                    {errors.officeAbbrev.message}
                  </p>
                )}
    
                <label className="form-label frm-label">Group</label>
                <select
                  {...register("group")}
                  className="form-select mb-2 poppins-reg "
                  id="group"
                  onChange={(e) => {
                    console.log('target value: ', e.target.value)
                    setGroupChosen(e.target.value)
                    setCustomErrors([]);
                  }}
                  
                  value={ groupChosen }
                >
                  {selectedForm ? "" : (
                    <option value="" disabled>
                      Choose Group
                    </option>
                  )}

                  {groups?.map((group)=> {
                    return (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    )
                  })}
  
                </select>
                {errors.group && (
                  <p key="group_err" className="text-danger">
                    {errors.group.message}
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

export default FormModal;