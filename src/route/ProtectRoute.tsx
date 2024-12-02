import { useAuth } from "../_context/auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRoute () {

    const auth = useAuth();

    return auth.session ? <><Outlet /></> : <Navigate to={`/login`} />

}
