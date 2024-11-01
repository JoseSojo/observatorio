import { FormEvent, useState } from "react";
import { Filed, Form } from "../../../config/interface/current/generic/FormGuiInterface";
import { CurrentButtom } from "../../_atoms/CurrentButton";
import { GetIcon } from "../../_icons/IconsHandle";
import { GetToken } from "../../../_hooks/storage/useToken";
import { API_URL } from "../../../config/constants";
import { ResponseApi } from "../../../config/interface/GlobalInterface";
import { useNotification } from "../../../_context/NotificationContext";

interface Props {
    data: Form;
    reverse: () => void
}

export function CurrentFormDelete ({data, reverse}: Props) {

    const [load, setLoad] = useState(true);
    const [error, setError] = useState(false);

    const noti = useNotification();

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const Execute = async () => {
            try {
                const RequetsOptions = {
                    method:data.method,
                    headers: {
                        token: `${GetToken()}`
                    }
                }
                const resultPromise = await fetch(`${API_URL}${data.path}`, RequetsOptions);
                const resultJson = await resultPromise.json() as ResponseApi;

                if(resultJson.error === false && reverse) reverse();

                noti.setMessage({ type:resultJson.error ? `error` : `success`, message:resultJson.message, active:true });

                setLoad(false);
                setError(false);
            } catch (error) {
            }
        }
        Execute();
    }

    return (
        <form onSubmit={HandleSubmit}>

            <div className="flex justify-between items-center mt-3">
                <h2 className="text-xl font-bold text-gray-700 up">{data.name}</h2>
                <div>
                    
                </div>
            </div>

            <div className="flex justify-center items-center">
                <CurrentButtom type="submit" customClass="flex items-center px-3 py-2 text-2xl rounded bg-red-700 hover:bg-red-500 text-custom-white-100 hover:text-custom-white">
                    <span className="text-sm font-bold mr-3">eliminar</span>
                    {GetIcon(`delete`)}
                </CurrentButtom>
            </div>
        </form>
    )
}
