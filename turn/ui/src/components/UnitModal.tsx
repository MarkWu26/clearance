import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import unitService from "../services/unit.service";
import { Unit } from "./Types";

interface Props {
  show: boolean;
  setClose: () => void;
  setAlert: (message: string, success: boolean) => void;
  selectedUnit: Unit | undefined;
}

const UnitModal = ({ show, setClose, setAlert, selectedUnit }: Props) => {
  type Err = {
    msg?: string;
  };

  const schema = z.object({
    name: z
      .string()
      .nonempty("Unit name is required")
      .regex(
        new RegExp(/^[a-zA-Z0-9. -]+$/),
        "Must not contain special characters"
      ),
    description: z
      .string()
      .regex(
        new RegExp(/^[a-zA-Z0-9. -]+$/),
        "Must not contain special characters"
      ),
  });
  type Unit = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Unit>({ resolver: zodResolver(schema) });
  const [customErrors, setCustomErrors] = useState<Err[]>();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();

  const onSubmit = handleSubmit(async (data) => {
    if (selectedUnit) {
      //edit
      try {
        await unitService
          .editUnit(selectedUnit.id, data.name, data.description)
          .then(
            (res) => {
              if (res.success === true) {
                setAlert("Unit Edited", true);
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
        await unitService.createUnit(data.name, data.description).then(
          (res) => {
            // setAlert();
            // console.log(res);
            setAlert("Unit created", true);
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
            {selectedUnit ? "Edit Unit" : "Create Unit"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label className="form-label frm-label">Unit Abbreviation</label>
            <input
              {...register("name")}
              type="text"
              className="form-control mb-2 poppins-reg "
              id="name"
              placeholder="e.g. CO, GR"
              onChange={() => {
                setCustomErrors([]);
              }}
              defaultValue={selectedUnit?.name}
            />
            {errors.name && (
              <p key="name_err" className="text-danger">
                {errors.name.message}
              </p>
            )}
            <label className="form-label frm-label">Description</label>
            <input
              {...register("description")}
              type="text"
              className="form-control mb-2 poppins-reg "
              id="description"
              placeholder="e.g. College, Graduate School"
              onChange={() => {
                setCustomErrors([]);
              }}
              defaultValue={selectedUnit?.desc}
            />
            {errors.description && (
              <p key="description_err" className="text-danger">
                {errors.description.message}
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

export default UnitModal;
