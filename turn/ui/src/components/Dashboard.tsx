import { Link } from "react-router-dom";
import arrow from "/right-arrow.svg";
export const Dashboard = () => {
  return (
    <>
      <div className="card m-2 w-75">
        <div className="card-header">Dashboard</div>
        <div className="card-body">
          <h5 className="card-title">Centralized Clearance System</h5>
          <p className="card-text">
            Clearance for Students of all units and Employees of all offices in
            one dynamic and centralized system.
          </p>
          <p className="card-text">Lets get started!</p>
          <Link to="/studentclearance">
            <button className="btn btn-primary px-3 w-auto">
              <span className="">
                View Clearance&nbsp;&nbsp;
                <img src={arrow} alt="arrow right" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
