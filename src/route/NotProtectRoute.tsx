import { useAuth } from "../_context/auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function NotProtectRoute () {

    const auth = useAuth();

    return !auth.session ? <Outlet /> : <Navigate to={`/dashboard`} />

}
