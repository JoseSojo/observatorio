import { ReactNode, useEffect } from "react";
import { redirect, useActionData } from "react-router-dom";
import { useAuth } from "../../_context/auth/AuthContext";

export default function Logout ({children}: {children?: ReactNode}) {

    const auth = useAuth();

    useEffect(() => {
        window.localStorage.removeItem(`token`);
        window.localStorage.removeItem(`user`);
        auth.setSession(false);
        redirect(`/login`);
        window.location.reload();
    }, [])

    return <></>

}
