interface Props {
  message: string;
  isSuccess: boolean;
  duration: number;
  onClose: () => void;
}

import { useState, useEffect } from "react";
const Alert = ({ message, isSuccess, duration, onClose }: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return visible ? (
    <>
      <div
        className={
          "alert alert-light m-5 h-10 fixed-bottom fixed-right custom-alert " +
          (isSuccess ? "success-border" : "failed-border")
        }
      >
        <span className="d-inline-flex justify-content-between align-items-center flex-wrap">
          <strong>
            <p className="m-2 frm-label ">{message}</p>
          </strong>
          <i
            className={
              "m-2 " +
              (isSuccess
                ? "text-success bi bi-check-circle-fill"
                : "text-danger bi bi-x-circle-fill")
            }
          ></i>
        </span>
      </div>
    </>
  ) : null;
};

export default Alert;
