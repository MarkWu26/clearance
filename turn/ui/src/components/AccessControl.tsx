import { ReactNode } from "react";
import authService from "../services/auth.service";
import AccessDenied from "./AccessDenied";
interface Props {
  children: ReactNode;
  requiredPermission: string;
  roles: string[];
}

const AccessControl = ({ requiredPermission, roles, children }: Props) => {
  if (
    authService.checkPermissions(roles, requiredPermission) ||
    requiredPermission === "none"
  ) {
    return <>{children}</>;
  } else {
    return (
      <>
        <AccessDenied missingRights={requiredPermission} />
      </>
    );
  }
};

export default AccessControl;
