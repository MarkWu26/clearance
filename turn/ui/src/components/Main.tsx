import Header from "./Header";
import ManageUsers from "./ManageUsers";
import StudentClearance from "./StudentClearance";

const Main = () => {
  return (
    <>
      <div className="d-flex flex-column justify-content-start align-content-center ml-5 w-100 main-container">
        <Header />
        <StudentClearance />
      </div>
    </>
  );
};

export default Main;
