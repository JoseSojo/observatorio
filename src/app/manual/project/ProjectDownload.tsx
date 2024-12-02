import { useEffect, useState } from "react"
import { useModal } from "../../../_context/ModalContext";
import { useNotification } from "../../../_context/NotificationContext";
import Text from "../../../UI/_atom/Text";
import { Icono } from "../../../_handler/IconHandler";
import Subtitle from "../../../UI/_atom/Subtitle";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { RequestOptionsGetToken } from "../../../utils/req/RequetsOptions";
import { API, API_STATIC } from "../../../entorno";
interface Props {
    reload: () => void;
    id: string
}

export default function ProjectDownload({ reload,id }: Props) {

    const modal = useModal();
    const noti = useNotification();

    const [data,setData] = useState<any>({});

    const [load, setLoad] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const Execute = async () => {
            setLoad(true)
            setError(null);

            const url = `${API}/project/${id}/unique`;
            const req = RequestOptionsGetToken({ method:`GET` });

            const result = await fetch(url, req);
            const json = await result.json();

            if(json.body) setData(json.body);
            setLoad(false);
            setError(null);
        }
        Execute();
    }, []);

    return (
        <div className="h-[50vh] flex flex-col justify-center items-center gap-3">
            <Text customClass="p-6 rounded-full bg-slate-200 text-emerald-800 text-6xl" text={Icono({ ico:`download` })} />
            <Subtitle customClass="text-2xl font-black " text="Descargar Trabajo" />
            <a target="_blank" className={`${load ? `btn skeleton` : ButtonHandler({ param:`download` })}`} href={`${data && data.documentRef && data.documentRef.donwload ? `${API_STATIC}${data.documentRef.donwload}` : ``}`} download={true}>
                {Icono({ ico: load ? `load` : `download` })}
                { load ? `Cargando...` : `Descargar` }
            </a>
        </div>
    )
}
