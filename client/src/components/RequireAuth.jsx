import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles}) => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        allowedRoles?.includes(auth?.role)
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/task" state={{ from: location}} replace />
                : <Navigate to="/login" state={{ from: location}} replace />
    );
};

export default RequireAuth;