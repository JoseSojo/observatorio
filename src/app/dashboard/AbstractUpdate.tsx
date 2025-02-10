import { FormEvent, useEffect, useState } from "react";
import { useModal } from "../../_context/ModalContext";
import { useNotification } from "../../_context/NotificationContext";
import { ActionCrudInterface } from "../../types/gui/CrudInterface";
import { FORM } from "../../types/gui/FromInterface";
import { API } from "../../entorno";
import { RequestOptionsCreateToken, RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import Title from "../../UI/_atom/Title";
import Button from "../../UI/_atom/Button";
import { Icono } from "../../_handler/IconHandler";
import ButtonHandler from "../../_handler/ButtonsHandler";
import LabelInput from "../../UI/_compound/LabelInput";

interface Props {
    item: ActionCrudInterface;
    reload: () => void;
    crud: string;
} 

export default function AbstractUpdate ({item,reload,crud}: Props) {

    const modal = useModal();
    const noti = useNotification();

    const [form, setForm] = useState<FORM | null>(null);
    const [data, setData] = useState<any>();

    useEffect(() => {
        const Execute = async () => {
            const customId = item.path.split(`/`).pop(); 
            const url = `${API}/gui/update/${crud}/${customId}`;
            const req = RequestOptionsGetToken({ method:`GET` });

            const result = await fetch(url, req);
            const jsonPromise = result.json() as Promise<{ title:string,form:FORM, update:string }>;

            if(!result.ok) {
                const jsonError = await jsonPromise;
                return jsonError
            }
            
            const json = await jsonPromise;
            setForm(json.form);

        }
        Execute();
    }, []);

    const HandleChange = ({name,value}:{ name: string, value: string }) => {
        const prev = {...data, [name]: typeof value === "string" ? name === `password` || name === `email` ? value : value.toLocaleUpperCase() : value };
        setData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const Execute = async () => {
            if(!form) return;
            const url = `${API}${form.path}`;
            const req = RequestOptionsCreateToken({ method:form.method, body:data });

            const result = await fetch(url, req);
            const jsonPromise = result.json() as Promise<{ message:string,error:boolean }>;

            if(!result.ok) {
                const jsonError = await jsonPromise;
                return jsonError
            }
            reload();
            
            const json = await jsonPromise;
            noti.setMessage({ active:true,message:json.message, type:"success" })
            // setForm(json.form);
            modal.hidden();
        }

        Execute();
    }

    return (
        <div>
            {
                form 
                ? <form onSubmit={HandleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 pt-3 place-content-center">
                    
                    <div className="lg:col-span-2 flex justify-between">
                        <Title text={item.label} customClass="text-xl font-black" />
                        <Button type="submit" ico={Icono({ ico:`submit` })} text="Guardar" customClass={ButtonHandler({ param:`create` })} />
                    </div>
                    {
                        form.fields.map(item => {
                            return (
                                <LabelInput value={item && data && data[item.name] ? data[item.name] : ``} change={HandleChange} label={item.label} name={item.name} placeholder={item.value ? item.value : ``} type={item.type} customClass={``} />
                            )
                        })
                    }
                    
                </form>
                : <p className="py-3 px-5 w-full mt-3 text-center text-xs font-black">No hay resultados o buscando</p>
            }
        </div>
    )
}
