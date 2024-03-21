import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useEffect, useState } from "react";
import {  Office,  } from "./Types";
import { zodResolver } from "@hookform/resolvers/zod";
import OfficeService from "../services/office.service";
import { z } from "zod";
import AlertBox from "./Alert";
import { useForm } from "react-hook-form";


interface addClearingOfficeProps {
    show: boolean;
    setClose: () => void;
    unit_id?: string
    clearingOffices: Office[]
    setClearingOffices: (value: (prevClearingOffices: Office[]) => Office[]) => void; // Update the type of setClearingOffices
    selectedOffice?: Office;
    setAlert: React.Dispatch<React.SetStateAction<JSX.Element>>
}

type Err = {
  msg?: string;
};


const AddClearingOfficeForm: React.FC<addClearingOfficeProps> = ({
    show,
    setClose,
    unit_id,
    selectedOffice,
    setAlert
}) => {
/* 
  console.log('selected office: ', selectedOffice?.id) */
    const [list, setList] = useState<string[]>([]);


    const [customErrors, setCustomErrors] = useState<Err[]>();
    const [typeChosen, setTypeChosen] = useState(selectedOffice?.type ?? "");
    const [chosenOffice, setChosenOffice] = useState(selectedOffice?.name ?? "");

    const schema = z.object({
        name: z
          .string()
          .nonempty("Office name is required")
          ,
        abbrev: z
          .string()
          .regex(
            new RegExp(/^[a-zA-Z0-9. -]{0,5}$/),
            "Must not contain more than 5 characters and special characters"
          ),
        type: z.string().nonempty("Type is required")
    });

    type Office = z.infer<typeof schema>;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Office>({ 
        resolver: zodResolver(schema), 
        defaultValues: {
          name: selectedOffice?.name ?? ""
        }
    });


    useEffect(() => {
        const fetchData = async () => {
          try {
            const offices = await OfficeService.getAvailableOffices();
            setList(offices);
        
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);

   
    
  const onSubmitOffice = handleSubmit(async (data) => {
           

              if(selectedOffice){
                console.log('abbrev: ', data.abbrev,)
                OfficeService
                .editOffice(
                  selectedOffice.id || '',
                  data.name,
                  data.abbrev,
                  unit_id || '',
                  data.type || ''
                )
                .then(
                  (res) => {
                    // setAlert();
                    console.log(res.success)
                    if (res.success === true) {
                      setAlert(<AlertBox
                      isSuccess
                      message='Office edited!'
                      duration={2000}
                      onClose={() => {
                        setAlert(<></>);
                      }}
                    />);
                    } else {
                      const errorMessage = res.error || "An unknown error occurred"; 
                      setAlert(<AlertBox
                        isSuccess={false}
                        message={errorMessage}
                        duration={2000}
                        onClose={() => {
                          setAlert(<></>);
                        }}
                      />);
                    }
                   
                    setClose();
                  },
                  (error) => {
                    setCustomErrors(error.response.data.errors);
                  }
                );
              } else {
                try {
                  const res = await OfficeService.createOffice(
                    data.name,
                    data.abbrev, 
                    unit_id || '',
                    data.type || ''   
                  );
          
                  if (res.success === true) {
                    
                    setAlert(<AlertBox
                      isSuccess
                      message='Clearing office added!'
                      duration={2000}
                      onClose={() => {
                        setAlert(<></>);
                      }}
                    />);
                  } else {
                    const errorMessage = res.error || "An unknown error occurred"; 
                    setAlert(<AlertBox
                      isSuccess
                      message={errorMessage}
                      duration={2000}
                      onClose={() => {
                        setAlert(<></>);
                      }}
                    />);
                  }
                  
                  setClose();
                } catch (error: any) {
                  setCustomErrors(error.response.data.errors);
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
                id="officeName"
                onChange={(e) => {
                  setChosenOffice(e.target.value)
                  setCustomErrors([]);
                }}
                value={ chosenOffice }
              >
              
             
              {selectedOffice ? "" : (
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
              
                <option value="" disabled >
                  Choose Type
                </option>

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
            <Button variant="primary" onClick={onSubmitOffice}>
             {selectedOffice ? 'Save' : 'Add Clearing Office'} 
            </Button>
          </Modal.Footer>
        </Modal>

        {alert}
      </>
     );
}
 
export default AddClearingOfficeForm;