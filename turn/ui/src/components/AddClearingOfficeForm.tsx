import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useEffect, useState } from "react";
import { ClearanceFrm, Unit } from "./Types";
import { zodResolver } from "@hookform/resolvers/zod";
import OfficeService from "../services/office.service";
import unitService from "../services/unit.service";
import { z } from "zod";
import formService from "../services/form.service";
import { useForm } from "react-hook-form";
import groupService from "../services/groups.service";
import { clearanceGroups } from "./Types";

interface addClearingOfficeProps {
    show: boolean;
    setClose: () => void;
    setAlert: (message: string, success: boolean) => void;
    unitId?: string
    selectedForm?: ClearanceFrm | null;
}

type Err = {
  msg?: string;
};


const AddClearingOfficeForm: React.FC<addClearingOfficeProps> = ({
    show,
    setClose,
    setAlert,
    unitId
}) => {

    const [list, setList] = useState<string[]>([]);
    const [unitList, setUnitList] = useState<Unit[] | undefined>([]);
    const [groups, setGroups] = useState<clearanceGroups [] | undefined>([])
    const [customErrors, setCustomErrors] = useState<Err[]>();
    console.log('unit: ', unitId)
   

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
        unit: z
          .string()
          .nonempty("Unit name is required")
          ,

    });


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ClearanceFrm>({ 
        resolver: zodResolver(schema), 
        defaultValues:{
            officeName: list[0]
        } 
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const offices = await OfficeService.getAvailableOffices();
            const units = await unitService.getUnits();
            const groups = await groupService.getGroups();
            setList(offices);
            setUnitList(units);
            setGroups(groups)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);

   
    
    const onSubmit = handleSubmit(async (data) => {
            try {
              const res = await formService.createForm(
                unitId || '',
                data.officeName,
                data.officeAbbrev, 
                data.group
              );
      
              if (res.success === true) {
                setAlert("Clearing office added!", true);
              } else {
                const errorMessage = res.error || "An unknown error occurred"; 
                setAlert(errorMessage, false);
              }
              
              setClose();
            } catch (error: any) {
              setCustomErrors(error.response.data.errors);
            }

            reset();
      });
  

    return ( 
        <>
        <Modal show={show} onHide={setClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Add Clearing Office
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            

              <label className="form-label frm-label">Office</label>
              <select 
                {...register("officeName")}
                className="form-select mb-2 poppins-reg "
                id="officeName"
                onChange={(e) => {
                 /*  setChosenOffice(e.target.value) */
                  setCustomErrors([]);
                }}
              defaultValue={list[0]}
               /*  value={ chosenOffice } */
                
              >
              
                  <option value="" disabled>
                    Choose Office
                  </option>
               
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
                  /*   setGroupChosen(e.target.value) */
                    setCustomErrors([]);
                  }}
                  
                  /* value={ groupChosen } */
                >
                 
                    <option value="" disabled>
                      Choose Group
                    </option>
            

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
}
 
export default AddClearingOfficeForm;