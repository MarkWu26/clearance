import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  missingRights: string;
}
const AccessDenied = ({ missingRights }: Props) => {
  const navigate = useNavigate();
  const [dots, setDots] = useState("");
  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 3000);
    setInterval(() => {
      const curr = dots + ".";
      setDots(curr);
    }, 600);
  });

  return (
    <>
      <div className="card m-2">
        <div className="card-header">Access Denied</div>
        <div className="card-body">
          <div className="w-100 text-center">
            <h3 className="text-danger">
              Access Denied: missing {missingRights} permission. Redirecting
              {dots}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessDenied;
