import { useModal } from "../../../_context/ModalContext";
import { useNotification } from "../../../_context/NotificationContext";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { Icono } from "../../../_handler/IconHandler";
import { API } from "../../../entorno";
import Button from "../../../UI/_atom/Button";
import Paragraph from "../../../UI/_atom/Paragraph";
import Title from "../../../UI/_atom/Title";
import { RequestOptionsGetToken } from "../../../utils/req/RequetsOptions";

interface Props {
    id: string;
    report: () => void
}

export default function ProjectDelete ({id,report}: Props) {

    const modal = useModal();
    const noti = useNotification();

    const Close = () => {
        modal.hidden();
    }

    const Delete = () => {
        // const customId = item.path.split(`/`).pop(); 
        const Execute = async () => {
            const url = `${API}/project/${id}/delete`;
            const req = RequestOptionsGetToken({ method:`PUT` });

            const result = await fetch(url, req);
            const json = await result.json();
            noti.setMessage({ active:true,message:json.message,type:json.errror ? `error` : `success` });

            modal.hidden();
            report();
        }
        Execute();
    }


    return (
        <div className="flex flex-col items-center gap-4">
            <i className="text-7xl w-[100px] h-[100px] rounded-full bg-gray-900 flex justify-center items-center text-amber-400">{Icono({ ico:`warning` })}</i>
            <Title customClass="text-3xl font-black text-center" text="Eliminar Projecto" />
            <Paragraph customClass="col-" text={`Al Eliminar Projecto no se podrá recuperar.`} />
            <div className="flex justify-center items-center gap-5">
                <Button click={Close} customClass={`${ButtonHandler({ param:`close` })} px-4 py-1 rounded`} text="Cancelar" ico={Icono({ ico:`close` })} />
                <Button click={Delete} customClass={`${ButtonHandler({ param:`delete` })} px-4 py-1 rounded`} text="Eliminar" ico={Icono({ ico:`delete` })} />
            </div>
        </div>
    )
}
