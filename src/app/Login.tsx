import { FormEvent, useState } from "react"
import LabelInput from "../UI/_compound/LabelInput"
import Button from "../UI/_atom/Button";
import { CreateLoginInterface } from "../types/auth/LoginInterface";
import { ExecuteLogin } from "../_service/auth/LoginService";
import { useNotification } from "../_context/NotificationContext";
import { setToken } from "../utils/token";
import { setUser } from "../utils/token copy";
import { useAuth } from "../_context/auth/AuthContext";
import NavbarPublic from "./public/NavbarPublic";
import LinkTo from "../UI/_atom/LinkTo";
import FooterPublic from "./public/FooterPublic";


export default function Login() {

    const noti = useNotification();
    const auth = useAuth();

    const [data, setData] = useState<CreateLoginInterface>({ param: ``, password: `` });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validar correo y password

        const Execute = async () => {
            const response = await ExecuteLogin(data);
            if (response.error) {
                noti.setMessage({ active: true, message: response.message, type: "error" });
                return;
            }

            // USER y TOKEN almacenados en localstorage
            setToken(response.body.token);
            setUser(response.body.user);

            noti.setMessage({ active: true, message: response.message, type: "success" });
            auth.setSession(true);
            window.location.reload();
        }
        Execute();
    }

    const HandleCHange = ({ name, value }: { name: string, value: string }) => {
        const prev = { ...data, [name]: value };
        setData(prev);
    }

    return (

        <div className="min-h-screen w-full flex flex-col justify-between">
            <header>
                <NavbarPublic />
            </header>
            <div className="h-full flex justify-center items-center mt-5">
                <div className="card bg-base-100 w-[90%] lg:w-[40%] shadow-lg border-t p-5">
                    <form onSubmit={HandleSubmit} className="w-full justify-center items-center flex flex-col">
                        <h1 className="text-2xl">Iniciar Sesión</h1>
                        <LabelInput 
                            name="param" 
                            change={HandleCHange} 
                            label="Correo" 
                            placeholder="ejemplo@ejemplo.com" 
                            type="email" 
                            value={data.param} 
                            customClass=""
                            />
                        <LabelInput
                                name="password" 
                                change={HandleCHange} 
                                label="Contraseña" 
                                placeholder="" 
                                type="password" 
                                value={data.password} 
                                customClass="" />
                        <Button type="submit" text="enviar" customClass="btn bg-blue-600 hover:bg-blue-500 text-white" />
                    </form>
                    <LinkTo 
                        customClass="text-sm font-light m-auto mt-4 text-sky-700 hover:text-sky-800" 
                        path="/register" 
                        text="¿No tienes cuenta?, Crear cuenta"
                        />
                </div>
            </div>
            <FooterPublic />
        </div>
    )
}
