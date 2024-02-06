import { useState, useEffect } from "react";
import logo from "/adzu_seal.png";
import { useLocation } from "react-router-dom";
type Link = {
  id: number;
  name: string;
  link: string;
  permission: string;
  icon: string;
};
interface Props {
  links: Link[];
  isActive: boolean;
}
const Sidebar = ({ links, isActive }: Props) => {
  //should add useEffect to fetch sidebar/links

  // const [links, setLinks] = useState<Link[]>([
  //   { id: 1, name: "Dashboard", link: "/" },
  //   { id: 2, name: "Manage Users", link: "/users" },
  //   { id: 3, name: "Manage Units", link: "/units" },
  //   { id: 4, name: "Clearing Offices", link: "/clearingoffices" },
  //   { id: 5, name: "Clearance Form", link: "/clearanceform" },
  // ]);

  const location = useLocation();
  const currentRoute = location.pathname;
  if (isActive) {
    return (
      <>
        <div className="sidebar-bg">
          <div
            className="d-flex flex-column flex-shrink-0 p-3 border border-1 sidebar shadow-sm sidebar-bg"
            id="sidebar"
          >
            <div className=" border-2 d-inline-flex justify-content-around p-20 align-content-center border-bottom pb-3">
              <img className="sidebar-logo" src={logo} alt="Logo" />
              <h6 className="px-2">Centralized Clearance System</h6>
            </div>
            <ul className="nav nav-pills flex-column mb-auto mt-1">
              {links.map((link) => {
                if (currentRoute === link.link) {
                  return (
                    <li
                      key={link.id}
                      className="nav-item rounded border-bottom border-1 nav-hover nav-active"
                    >
                      <a
                        href={link.link}
                        className="nav-link"
                        title={link.name}
                      >
                        <i className={link.icon}></i> {link.name}
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={link.id}
                      className="nav-item rounded border-bottom border-1 nav-hover"
                    >
                      <a
                        href={link.link}
                        className="nav-link"
                        title={link.name}
                      >
                        <i className={link.icon}></i> {link.name}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="sidebar-bg ">
          <div
            className="d-flex flex-column flex-shrink-0 border border-1 sidebar shadow-sm sidebar-min"
            id="sidebar"
          >
            <div className="border-2 d-inline-flex justify-content-center p-20 align-content-center border-bottom pb-3">
              <img
                className="sidebar-logo-min py-2"
                src={logo}
                alt="adzu logo"
                title="adzu-logo"
              />
            </div>
            <ul className="nav nav-pills flex-column mt-1 m-0 w-100">
              {links.map((link) => {
                if (currentRoute === link.link) {
                  return (
                    <li
                      key={link.id}
                      className="nav-item rounded border-bottom border-1 nav-hover nav-icons nav-active"
                    >
                      <a
                        href={link.link}
                        className="nav-link"
                        title={link.name}
                      >
                        <i className={link.icon}></i>
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={link.id}
                      className="nav-item rounded border-bottom border-1 nav-hover nav-icons"
                    >
                      <a
                        href={link.link}
                        className="nav-link"
                        title={link.name}
                      >
                        <i className={link.icon}></i>
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
};

export default Sidebar;
