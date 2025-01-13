import { ChangeEvent, FormEvent, useState } from "react"
import ButtonHandler from "../../../../_handler/ButtonsHandler"
import { Icono } from "../../../../_handler/IconHandler"
import Button from "../../../_atom/Button"
import Subtitle from "../../../_atom/Subtitle"
import { useModal } from "../../../../_context/ModalContext"
import { useNotification } from "../../../../_context/NotificationContext"
import { API } from "../../../../entorno"
import { RequestOptionsCreateToken } from "../../../../utils/req/RequetsOptions"

interface Props {
    reload: () => void
}

export default function CreateDataEstudios ({reload}:Props) {

    const modal = useModal();
    const noti = useNotification();

    const [data, setData] = useState<any>({});

    const HandleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const prev = {...data, [e.target.name]: e.target.value};
        setData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!data.nivel) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Nivel de estudio"` });
        if(!data.profesion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Profesión"` });
        if(!data.yearEnd) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Año de culminación"` });
        if(!data.countryId) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "País"` });
        if(!data.institucion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Institución"` });
        if(!data.area) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Área"` });
        if(!data.subarea) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Subárea"` });

        const customData = {
            nivel: data.nivel,
            profesion: data.profesion,
            yearEnd: data.yearEnd,
            countryId: data.countryId,
            institucion: data.institucion,
            area: data.area,
            subarea: data.subarea
        }

        const ExecuteAsync = async () => {
            const url = `${API}/education/create`;
            const req = RequestOptionsCreateToken({method:`post`,body:customData});

            const result = await fetch(url, req);
            const json = await result.json();

            if(!result.ok || json.error) {
                if(json.message) {
                    modal.hidden();
                    noti.setMessage({ active:true,message:json.message,type:`error` })
                    return;
                }
                modal.hidden();
                noti.setMessage({ active:true,message:`Oops. hubo un error al crear`,type:`error` })
                return;
            }

            reload();
            modal.hidden();
        }
        ExecuteAsync();
    }

    return (
        <form onSubmit={HandleSubmit} className="gap-3 overflow-y-auto w-full lg:w-[80%] m-auto bg-white rounded p-3 grid place-items-center md:grid-cols-2 xl:grid-cols-3">
            <Subtitle text="Registrar Perfil Educativo" customClass="lg:col-span-2 xl:col-span-3 text-xl mb-3 text-gray-800" />

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Nivel de estudio</label>
                <select onChange={HandleChange} name="nivel" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>Nivel 1</option>
                    <option>Nivel 2</option>
                    <option>Nivel 3</option>
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Profesión</label>
                <select onChange={HandleChange} name="profesion" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>Profesión 1</option>
                    <option>Profesión 2</option>
                    <option>Profesión 3</option>
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Año de culminación</label>
                <input onChange={HandleChange} name="yearEnd" type="number" className="input input-sm border border-gray-400" />
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">País</label>
                <select onChange={HandleChange} name="countryId" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>País 1</option>
                    <option>País 2</option>
                    <option>País 3</option>
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Institución</label>
                <select onChange={HandleChange} name="institucion" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>Institución 1</option>
                    <option>Institución 2</option>
                    <option>Institución 3</option>
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Área</label>
                <select onChange={HandleChange} name="area" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>Área 1</option>
                    <option>Área 2</option>
                    <option>Área 3</option>
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Subárea</label>
                <select onChange={HandleChange} name="subarea" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>Subárea 1</option>
                    <option>Subárea 2</option>
                    <option>Subárea 3</option>
                </select>
            </label>

            <div className="col-span-2 xl:col-span-3">
                <Button
                    type="submit"
                    customClass={`${ButtonHandler({ param:`create` })} btn-sm`}
                    ico={Icono({ico:`submit`})}
                    text="crear"
                />
            </div>
        </form>
    )
}