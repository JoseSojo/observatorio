
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface AuthContextInterface {
    session: boolean;
    setSession: Dispatch<SetStateAction<boolean>>;
    user: any
}

const AuthenticationContext = createContext<AuthContextInterface>({ user:{}, session:false, setSession:()=>{} });

export const AuthProvider = ({children}:{children:ReactNode}) => {

    const defUser = window.localStorage.getItem(`user`);
    const defState = window.localStorage.getItem(`token`);
    const [state, setState] = useState(defState ? true : false);

    return (
        <AuthenticationContext.Provider value={{ user: defUser, session:state, setSession:setState }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useAuth = () => useContext(AuthenticationContext);
