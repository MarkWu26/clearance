import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  Outlet,
  useNavigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/auth.service";
import AccessControl from "./AccessControl";
interface Props {
  sidebarStatus: boolean;
  toggleSidebar: () => void;
}
const AdminLayout = ({ sidebarStatus, toggleSidebar }: Props) => {
  type Link = {
    id: number;
    name: string;
    link: string;
    permission: string;
    icon: string;
  };

  type user = {
    id: string;
    username: string;
    rights: string;
    unit: string;
  };

  const logoutNavigate = () => {
    authService.logout();
    window.location.reload();
  };
  const location = useLocation();
  const [loc, currLoc] = useState(location.pathname);
  const setRequiredPermission = (role: string) => {
    setPermission(role);
  };

  const user = authService.getCurrentUser();
  const [roles, setRoles] = useState<string[]>(user.rights.split(","));
  const [links, setLinks] = useState<Link[]>([
    {
      id: 1,
      name: "Dashboard",
      link: "/dashboard",
      permission: "none",
      icon: "bi bi-house",
    },
  ]);

  const [permission, setPermission] = useState("none");

  useEffect(() => {
    const newLinks: Link[] = [];

    newLinks.push({
      id: 1,
      name: "Dashboard",
      link: "/dashboard",
      permission: "none",
      icon: "bi bi-house",
    });

    roles.map((role: string) => {
      //hardcoded id for persistent order of display in sidebar
      switch (role) {
        case "view_clearance":
          newLinks.push({
            id: 5,
            name: "View Clearance",
            link: "/studentclearance",
            permission: "view_clearance",
            icon: "bi bi-person-check",
          });
          break;
        case "manage_units":
          newLinks.push({
            id: 10,
            name: "Manage Units",
            link: "/units",
            permission: "manage_units",
            icon: "bi bi-view-stacked",
          });
          break;
        case "manage_offices":
          newLinks.push({
            id: 15,
            name: "Manage Offices",
            link: "/clearingoffices",
            permission: "manage_offices",
            icon: "bi bi-building",
          });
          break;
        case "manage_form":
          newLinks.push({
            id: 20,
            name: "Clearance Form",
            link: "/clearanceform",
            permission: "manage_form",
            icon: "bi bi-card-list",
          });
          break;
        case "manage_users":
          newLinks.push({
            id: 25,
            name: "Manage Users",
            link: "/users",
            permission: "manage_users",
            icon: "bi bi-people",
          });
          break;
        case "manage_gnpn":
          newLinks.push({
            id: 30,
            name: "Manage GNPN",
            link: "/gnpn",
            permission: "manage_gnpn",
            icon: "bi bi-file-earmark-ruled",
          });
          break;
        case "upload_file":
          newLinks.push({
            id: 35,
            name: "Upload File",
            link: "/uploadfile",
            permission: "upload_file",
            icon: "bi bi-upload",
          });
          break;
        case "manage_colleges":
          newLinks.push({
            id: 39,
            name: "Manage Colleges",
            link: "/colleges",
            permission: "manage_colleges",
            icon: "bi bi-buildings",
          });
          break;
        case "manage_departments":
          newLinks.push({
            id: 40,
            name: "Manage Departments",
            link: "/departments",
            permission: "manage_departments",
            icon: "bi bi-person-badge",
          });
          break;
       /*  case "edit_form": 
        newLinks.push({
          id: 49,
          name: "Edit Form",
          link: "/clearanceform/:formId",
          permission: "edit_form",
          icon: "bi bi-person-badge",
        })
        break; */
        default:
          break;
      }
    });
    // for proper order in sidebar

    setLinks(
      newLinks.sort((a, b) => {
        return a.id - b.id;
      })
    );

    const foundLink = newLinks.findIndex((link) => {
      return link.link === location.pathname;
    });

    if (foundLink > -1) {
      setPermission(newLinks[foundLink].permission);
    } else {
      setPermission(location.pathname);
    }
  }, [roles]);

  return (
    <>
      <div className="container-fluid d-inline-flex w-100 m-0 p-0 main">
        <Sidebar links={links} isActive={sidebarStatus} />

        <div className="d-flex flex-column justify-content-start align-content-center ml-5 w-100 main-container">
          <Header
            username={user.username}
            logout={logoutNavigate}
            sidebarActive={toggleSidebar}
          />
          <AccessControl roles={roles} requiredPermission={permission}>
            <Outlet />
          </AccessControl>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
