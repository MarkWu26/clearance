import { Config, TJoin } from "./Types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import unitService from "../services/unit.service";
import OfficeService from "../services/office.service";

interface Props {
    show: boolean;
    setClose: () => void;
    setAlert: (message: string, success: boolean) => void;
    selectedConfig: Config | undefined;
  }

  const ConfigModal = ({ show, setClose, setAlert, selectedConfig }: Props) => {
   
    type Err = {
        msg?: string;
      };

      const [list, setList] = useState([]);
      const [officeList, setOfficeList] = useState(selectedConfig?.main ?? "");

      useEffect(() => {
        const fetchData = async () => {
          try {
            const offices = await OfficeService.getAvailableOffices();
            setList(offices);
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error, show message to the user
          }
        };
    
        fetchData();
      }, []);

      const schema = z.object({
        main: z
          .string()
          .nonempty("Office name is required")
          .regex(
            /^[a-zA-Z0-9. -_]+$/,
            "Must not contain special characters"
          ),
        identifier: z
          .string()
          .regex(
            new RegExp(/^[a-zA-Z0-9. -]+$/),
            "Must not contain special characters"
          ),f_fname: z
          .string()
          .regex(
            new RegExp(/^[a-zA-Z0-9. -]+$/),
            "Must not contain special characters"
          ),
          f_lname: z
          .string()
          .regex(
            new RegExp(/^[a-zA-Z0-9. -]+$/),
            "Must not contain special characters"
          ),f_mname: z
          .string()
          .regex(
            new RegExp(/^[a-zA-Z0-9. -]+$/),
            "Must not contain special characters"
          ),f_suffix: z
          .string()
          .regex(
            new RegExp(/^[a-zA-Z0-9. -]+$/),
            "Must not contain special characters"
          ),f_group: z
          .string()
          .regex(
            new RegExp(/^[a-zA-Z0-9. -]+$/),
            "Must not contain special characters"
          ),f_level: z
          .string()
          .regex(
            new RegExp(/^[a-zA-Z0-9. -]+$/),
            "Must not contain special characters"
          ),c_joins: z
          .array(
            z.object({
            tbl: z
            .string()
            .regex
            (/^[a-zA-Z0-9. -]+$/, "Must not contain special characters"),
            onLeft: 
            z.string()
            .regex(/^[a-zA-Z0-9. -]+$/, "Must not contain special characters"),
            onRight: z
            .string()
            .regex(/^[a-zA-Z0-9. -]+$/, "Must not contain special characters"),
          })),
        });

    type Config = z.infer<typeof schema>;
    
    
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
      } = useForm<Config>({ resolver: zodResolver(schema) });

      const [cJoins, setCJoins] = useState(selectedConfig?.c_joins || []);

      // Initialize form when modal is shown or selectedConfig changes
      useEffect(() => {
        if (selectedConfig) {
          reset(selectedConfig);
          setCJoins(selectedConfig.c_joins || []);
        }
      }, [selectedConfig, reset]);

      // Add join condition
      const addJoin = () => {
        setCJoins([...cJoins, { tbl: "", onLeft: "", onRight: "" }]);
      };

      const removeJoin = (index: number) => {
        // Create a new array excluding the item at the given index
        const newJoins = cJoins.filter((_, i) => i !== index);
        setCJoins(newJoins);
      };

      const [customErrors, setCustomErrors] = useState<Err[]>();

      const onSubmit = handleSubmit(async (data) => {
        // Use selectedConfig values if available, otherwise set defaults
        const id = selectedConfig?.id ?? "defaultId";
        const unit_id = selectedConfig?.unit_id ?? "defaultUnitId";
      
        const submitData = {
          ...data,
          c_joins: cJoins,
          id: id,
          unit_id: unit_id
        };
      
        try {
          const response = selectedConfig
            ? await unitService.editConfig(id, submitData)
            : await unitService.createConfig(submitData);
      
          if (response.success) {
            setAlert(`Configuration ${selectedConfig ? "Edited" : "Created"}`, true);
          } else {
            setAlert(response.error, false);
          }
        } catch (err) {
          console.error(err);
          setAlert("An error occurred", false);
        } finally {
          setClose();
          reset();
        }
      });
      

      return (
        <Modal show={show} onHide={setClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedConfig ? "Edit Configuration" : "Create Configuration"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <label className="form-label frm-label">Office Name</label>
          <select
            {...register("main")}
            className="form-select mb-2 poppins-reg "
            id="main"
            onChange={(e) => {
              setOfficeList(e.target.value);
              setCustomErrors([]);
            }}
            value={officeList}
          >
            {selectedConfig ? (
              ""
            ) : (
              <option key="default" value="" disabled>
                Choose Office Name
              </option>
            )}
            {list.map((office, i) => (
              <option key={i} value={office} id={"office_" + i}>
                {office}
              </option>
            ))}
          </select>

            {errors.main && (
              <p key="main" className="text-danger">
                {errors.main.message}
              </p>
            )}
        
        <label className="form-label frm-label">Identifier</label>
        <input 
        {...register("identifier")} 
        type="text"
        className="form-control mb-2 poppins-reg "
        placeholder="identifier" 
        onChange={() => {
          setCustomErrors([]);
        }}
        defaultValue={selectedConfig?.identifier}
        />
        {errors.identifier && (
          <p key="identifier_err" className="text-danger">
             {errors.identifier.message}
          </p>
        )}

        <label className="form-label frm-label">First Name</label>
        <input 
        {...register("f_fname")} 
        type="text"
        className="form-control mb-2 poppins-reg "
        placeholder="First Name" 
        onChange={() => {
          setCustomErrors([]);
        }}
        defaultValue={selectedConfig?.f_fname}
        />
        {errors.f_fname && (
          <p key="f_fname_err" className="text-danger">
             {errors.f_fname.message}
          </p>
        )}

        <label className="form-label frm-label">Last Name</label>
        <input 
        {...register("f_lname")} 
        type="text"
        className="form-control mb-2 poppins-reg "
        placeholder="Last Name" 
        onChange={() => {
          setCustomErrors([]);
        }}
        defaultValue={selectedConfig?.f_lname}
        />
        {errors.f_lname && (
          <p key="f_lname_err" className="text-danger">
             {errors.f_lname.message}
          </p>
        )}

        <label className="form-label frm-label">Middle Name</label>
        <input 
        {...register("f_mname")} 
        type="text"
        className="form-control mb-2 poppins-reg "
        placeholder="Middle Name" 
        onChange={() => {
          setCustomErrors([]);
        }}
        defaultValue={selectedConfig?.f_mname}
        />
        {errors.f_mname && (
          <p key="f_mname_err" className="text-danger">
             {errors.f_mname.message}
          </p>
        )}

        <label className="form-label frm-label">Suffix</label>
        <input 
        {...register("f_suffix")} 
        type="text"
        className="form-control mb-2 poppins-reg "
        placeholder="e.g. Sr., Jr. " 
        onChange={() => {
          setCustomErrors([]);
        }}
        defaultValue={selectedConfig?.f_suffix}
        />
        {errors.f_suffix && (
          <p key="f_suffix_err" className="text-danger">
             {errors.f_suffix.message}
          </p>
        )}

        <label className="form-label frm-label">Group</label>
        <input 
        {...register("f_group")} 
        type="text"
        className="form-control mb-2 poppins-reg "
        placeholder="Group" 
        onChange={() => {
          setCustomErrors([]);
        }}
        defaultValue={selectedConfig?.f_group}
        />
        {errors.f_group && (
          <p key="f_group_err" className="text-danger">
             {errors.f_group.message}
          </p>
        )}

        <label className="form-label frm-label">Level</label>
        <input 
        {...register("f_level")} 
        type="text"
        className="form-control mb-2 poppins-reg "
        placeholder="Level" 
        onChange={() => {
          setCustomErrors([]);
        }}
        defaultValue={selectedConfig?.f_level}
        />
        {errors.f_level && (
          <p key="f_level_err" className="text-danger">
             {errors.f_level.message}
          </p>
        )}

          {cJoins.map((join, index) => (
            <div key={index}>
              <input {...register(`c_joins.${index}.tbl`)} 
              className="form-control mb-2 poppins-reg "
              placeholder="Table Name" defaultValue={join.tbl} />

              <input {...register(`c_joins.${index}.onLeft`)} 
              className="form-control mb-2 poppins-reg "
              placeholder="On Left Condition" defaultValue={join.onLeft} />

              <input {...register(`c_joins.${index}.onRight`)} 
              className="form-control mb-2 poppins-reg "
              placeholder="On Right Condition" defaultValue={join.onRight} />
              <button type="button" onClick={() => removeJoin(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addJoin}>Add Join Condition</button>

      </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={setClose}>Close</Button>
            <Button variant="primary" onClick={onSubmit}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      );
    };
    
    export default ConfigModal;