import { ChangeEvent, FormEvent, useState } from "react"
import ButtonHandler from "../../../../_handler/ButtonsHandler"
import { Icono } from "../../../../_handler/IconHandler"
import Button from "../../../_atom/Button"
import Subtitle from "../../../_atom/Subtitle"
import { useModal } from "../../../../_context/ModalContext"
import { RequestOptionsCreateToken } from "../../../../utils/req/RequetsOptions"
import { API } from "../../../../entorno"
import { useNotification } from "../../../../_context/NotificationContext"

interface Props {
    reload: () => void
}

export default function CreateDataWork ({reload}:Props) {

    const modal = useModal();
    const noti = useNotification();

    const [data, setData] = useState<any>({});

    const HandleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const prev = {...data, [e.target.name]: e.target.value};
        setData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if(!data.actual) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Actual"` });
        if(!data.tipoInstitucion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Tipo Institución"` });
        if(!data.institucion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Institución"` });
        if(!data.ocupacion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Ocupación"` });
        if(!data.cargo) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Cargo"` });
        if(!data.dateStart) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Fecha Inicio"` });
        // if(!data.dateEnd) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Fecha Fin"` });

        const customData = {
            actual: data.actual ? true : false,
            tipoInstitucion: data.tipoInstitucion,
            // yearEnd: data.yearEnd ? data.yearEnd : undefined, 
            ocupacion: data.ocupacion,
            institucion: data.institucion,
            dateEnd: data.dateEnd,
            cargo: data.cargo,
            dateStart: data.dateStart,
        }

        const ExecuteAsync = async () => {
            const url = `${API}/work/create`;
            const req = RequestOptionsCreateToken({method:`post`,body:customData});

            const result = await fetch(url, req);
            const json = await result.json();
            console.log(json);
            reload();
            modal.hidden();
        }
        ExecuteAsync();
    }

    return (
        <form onSubmit={HandleSubmit} className="gap-3 overflow-y-auto w-full lg:w-[80%] m-auto bg-white rounded p-3 grid place-items-center md:grid-cols-2 xl:grid-cols-3">
            <Subtitle text="Registrar Perfil Educativo" customClass="lg:col-span-2 xl:col-span-3 text-xl mb-3 text-gray-800" />

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Trabajo actual</label>
                <input onChange={HandleChange} name="actual" type="checkbox" className="checkbox m-auto border border-gray-400" />
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Tipo de institución</label>
                <select onChange={HandleChange} name="tipoInstitucion" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>Tipo 1</option>
                    <option>Tipo 2</option>
                    <option>Tipo 3</option>
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
                <label className="text-sm text-gray-600 font-semibold">Ocupación</label>
                <select onChange={HandleChange} name="ocupacion" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>ocupación 1</option>
                    <option>ocupación 2</option>
                    <option>ocupación 3</option>
                </select>    
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Cargo</label>
                <select onChange={HandleChange} name="cargo" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>cargo 1</option>
                    <option>cargo 2</option>
                    <option>cargo 3</option>
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Fecha Inicio</label>
                <input onChange={HandleChange} name="dateStart" type="date" className="input input-sm border border-gray-400" />
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Fecha Fin</label>
                <input onChange={HandleChange} name="dateEnd" type="date" className="input input-sm border border-gray-400" />
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
