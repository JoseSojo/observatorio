"use client";

import { Link, useParams } from "react-router-dom";
import { AuthPublicTemplate } from "../../_UI/_template/AuthPublicTemplate";
import { CurrentButtom } from "../../_UI/_atoms/CurrentButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { CurrentLabelInput } from "../../_UI/_atoms/CurrentLabelInput";
import { API_URL } from "../../config/constants";
import { ResponseApi } from "../../config/interface/GlobalInterface";

export default function RestorePasswordToken() {
    const { token } = useParams() as { token: string };
    // const { error, form, load } = useGuiLogin();
    const [load, setLoad] = useState(false);
    const [password, setPassword] = useState(``);
    const [repeatPassword, setRepeatPassword] = useState(``);
    const [message, setMessage] = useState(``);

    const HandelSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);

        const Execute = async () => {
            const RequetsOptions = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({ password, repeatPassword })
            }
            const url = `${API_URL}/auth/restore/save/password`;

            try {
                const result = await fetch(url, RequetsOptions);
                const json = await result.json() as ResponseApi; 
                setMessage(json.message);
                setLoad(false);
            } catch (error) {
               setLoad(false);
            }
        }
        Execute();
    }

    return (
        <AuthPublicTemplate>
            <form onSubmit={HandelSubmit} autoComplete="off" className="grid gap-5">
                <h1 className={`text-center text-5xl font-black text-custom-dark`}>Recuperar cuenta</h1>
                <p className="w-full text-xs font-black">{message}</p>
                
                <input value={token} name="tokenRequets" type="hidden" />

                <CurrentLabelInput
                    change={(e: ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)}
                    label="Contraseña"
                    required
                    type="password"
                    class=""
                    name="newPassword"
                    />

                <CurrentLabelInput
                    change={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    label="Recuperar contraseña"
                    required
                    type="password"
                    class=""
                    name="repeatPassword"
                    />

                <div className="flex justify-end">
                    <Link to={`/login`} className="text-sky-600 hover:text-sky-400 font-black text-xs">
                        iniciar sesión
                    </Link>
                </div>
                <CurrentButtom type="submit" text={load ? "cargando" : "Recuperar cuenta"} customClass="bg-primary rounded-rounded-7 font-semibold text-sm py-2 text-custom-white hover:bg-primary-100" />
            </form>
        </AuthPublicTemplate>
    );
}
