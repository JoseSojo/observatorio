"use client";

import { FormType } from "../../config/interface/FormInterface";
import { ChangeEvent, FormEvent, useState } from "react";
import { CurrentLabelInput } from "../_atoms/CurrentLabelInput";
import { LoginInterface } from "../../config/interface/current/auth/LoginInterface";
import { usePreRequets } from "../../_hooks/requets/usePreRequets";
import { ResponseApi } from "../../config/interface/GlobalInterface";
import { useAuth } from "../../_context/auth/AuthContext";
import { CurrentButtom } from "../_atoms/CurrentButton";
import { SetToken } from "../../_hooks/storage/useToken";
import { Link } from "react-router-dom";

export function LoginForm ({ action,inputList,method }: FormType) {

    const auth = useAuth();
    const [data, setData] = useState<LoginInterface>({param:``,password:``});
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState(``);
    const [error, setError] = useState(false);

    const Action = async () => {
        setLoad(true);
        setError(false);
        setMessage(``);

        const req = usePreRequets({ action,body:data,method });

        const result = await fetch(req.Path, req.Options);
        const jsonPromise = result.json() as Promise<ResponseApi>;
        if(!result.ok) {
            const json = await jsonPromise;
            setMessage(json.message);
        }
        const json = await jsonPromise;
        if(json.error) {
            setMessage(json.message);
            setError(true);
            setLoad(false);
            return;
        }
        const currentBody = json.body as { token:string, user:any };
        window.localStorage.setItem(`user`, JSON.stringify(currentBody.user));
        SetToken(currentBody.token);
        auth.setSession(true);
        setMessage(json.message);
        setLoad(false);
        window.location.reload();
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Action();    
    }    

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={HandleSubmit} className="grid gap-5">
            <h1 className={`text-center text-5xl font-black text-custom-dark`}>Iniciar Sesión</h1>
            <p className="w-full">{error && message}</p>
            { inputList.map(item => (
                <CurrentLabelInput change={HandleChange} type={item.type} label={item.label} placeholder={item.placeholder} name={item.name} required={item.required}  />
            )) }
            <div className="flex justify-end">
                <Link to={`/restore`} className="text-sky-600 hover:text-sky-400 font-black text-xs">
                    ¿olvidaste tu contraseña?
                </Link>
            </div>
            <CurrentButtom type="submit" text={load ? "cargando" : "Iniciar sesión"} customClass="bg-primary rounded-rounded-7 font-semibold text-sm py-2 text-custom-white hover:bg-primary-100" />
        </form>
    )
}
