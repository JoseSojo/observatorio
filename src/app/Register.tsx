import { FormEvent, useState } from "react"
import LabelInput from "../UI/_compound/LabelInput"
import SingleCard from "../UI/_organism/Card/SingleCard"
import Button from "../UI/_atom/Button";
import { useNotification } from "../_context/NotificationContext";
import { setToken } from "../utils/token";
import { setUser } from "../utils/token copy";
import NavbarPublic from "./public/NavbarPublic";
import LinkTo from "../UI/_atom/LinkTo";
import { CreateRegisterInterface } from "../types/auth/RegisterInterface";
import { RegisterService } from "../_service/auth/RegisterService";
import { useNavigate } from "react-router-dom";


export default function Register() {

    const noti = useNotification();
    // const auth = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState<CreateRegisterInterface>({ email: ``, password: ``, ci: ``, lastname: ``, name: ``, username: ``, });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validar correo y password

        const Execute = async () => {
            const response = await RegisterService(data);
            if (response.error) {
                noti.setMessage({ active: true, message: response.message, type: "error" });
                return;
            }

            // USER y TOKEN almacenados en localstorage
            setToken(response.body.token);
            setUser(response.body.user);

            noti.setMessage({ active: true, message: response.message, type: "success" });
            navigate(`/login`, { replace:true })
            // auth.setSession(true);
            // window.location.reload();
        }
        Execute();
    }

    const HandleCHange = ({ name, value }: { name: string, value: string }) => {
        const prev = { ...data, [name]: value };
        setData(prev);
    }

    return (

        <div className="min-h-screen w-full">
            <header>
                <NavbarPublic />
            </header>
            <div className="h-full flex justify-center items-center mt-5">
                <SingleCard>
                    <form onSubmit={HandleSubmit} className="w-full justify-center items-center flex flex-col">
                        <h1 className="text-2xl">Crear cuenta</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                            <LabelInput
                                name="name"
                                change={HandleCHange}
                                label="Nombre"
                                placeholder="ejemplo@ejemplo.com"
                                type="text"
                                value={data.name}
                                customClass="" />

                            <LabelInput
                                name="lastname"
                                change={HandleCHange}
                                label="Apellido"
                                placeholder="ejemplo@ejemplo.com"
                                type="text"
                                value={data.lastname}
                                customClass="" />

                            <LabelInput
                                name="username"
                                change={HandleCHange}
                                label="Usuario"
                                placeholder="ejemplo@ejemplo.com"
                                type="text"
                                value={data.username}
                                customClass="" />

                            <LabelInput
                                name="ci"
                                change={HandleCHange}
                                label="Cédula"
                                placeholder="ejemplo@ejemplo.com"
                                type="ci"
                                value={data.ci}
                                customClass="" />

                            <LabelInput
                                name="email"
                                change={HandleCHange}
                                label="Correo"
                                placeholder="ejemplo@ejemplo.com"
                                type="email"
                                value={data.email}
                                customClass="" />

                            <LabelInput
                                name="password"
                                change={HandleCHange}
                                label="Contraseña"
                                placeholder=""
                                type="password"
                                value={data.password}
                                customClass="" />
                        </div>
                        <Button type="submit" text="enviar" customClass="btn bg-blue-600 hover:bg-blue-500 text-white" />
                    </form>
                    <LinkTo
                        customClass="text-sm font-light m-auto mt-4 text-sky-700 hover:text-sky-800"
                        path="/register"
                        text="¿Ya tienes cuenta?, Iniciar sesión"
                    />
                </SingleCard>
            </div>
        </div>
    )
}
