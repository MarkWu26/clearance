import "./main.css";
import Login from "./components/Login.tsx";
import { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard.tsx";
import ManageUsers from "./components/ManageUsers.tsx";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import ManageUnits from "./components/ManageUnits.tsx";
import ManageOffices from "./components/ManageOffices.tsx";
import ManageForms from "./components/ManageForm.tsx";
import StudentClearance from "./components/StudentClearance.tsx";
import AdminLayout from "./components/AdminLayout.tsx";
import authService from "./services/auth.service.tsx";
import NotFound from "./components/NotFound.tsx";
import UploadFile from "./components/UploadFile.tsx";
import AddClearance from "./components/AddClearance.tsx";
import EditClearance from "./components/EditClearance.tsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuth);
  const [sidebar, setSideBar] = useState(false);

  const setSidebarStatus = () => {
    const curr = !sidebar;
    setSideBar(curr);
  };

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={"/dashboard"} /> : <Login />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={"/dashboard"} />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />
        <Route
          element={
            isAuthenticated ? (
              <AdminLayout
                sidebarStatus={sidebar}
                toggleSidebar={setSidebarStatus}
              />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        >
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="/users"
            element={
              isAuthenticated ? (
                <ManageUsers />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="/units"
            element={
              isAuthenticated ? (
                <ManageUnits />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="/clearingoffices"
            element={
              isAuthenticated ? (
                <ManageOffices />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="/clearanceform"
            element={
              isAuthenticated ? (
                <ManageForms />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="/colleges"
            element={
              isAuthenticated ? (
                <StudentClearance />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="/uploadfile"
            element={
              isAuthenticated ? (
                <UploadFile />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />

           <Route
            path="/clearanceform/:id"
            element={
              isAuthenticated ? (
                <EditClearance />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />

          <Route
            path="/studentclearance"
            element={
              isAuthenticated ? (
                <StudentClearance />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
