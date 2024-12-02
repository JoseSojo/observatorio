import { useState } from "react";
import { useModal } from "../../../_context/ModalContext";
import { useNotification } from "../../../_context/NotificationContext";
import Title from "../../../UI/_atom/Title";
import { getToken } from "../../../utils/token";
import { API } from "../../../entorno";

interface Props {
    id: string;
    report: () => void;
    customPublic: boolean;
    downlaod: boolean;
}

export default function ProjectUpdate({ id, report, customPublic, downlaod }: Props) {

    const modal = useModal();
    const noti = useNotification();

    const [currentDownlaod,setCurrentDownlaod] = useState(downlaod);
    const [currentPublic,setCurrentPublic] = useState(customPublic);

    const [load, setLoad] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const HanldeSubmitDownload = () => {
        const Execute = async () => {
            setLoad(true);
            setError(null);

            // lógica

            const RequetsOptions = {
                method: `PUT`,
                headers: {
                    // "Content-Type": "multipart/form-data",
                    token: `${getToken()}`
                }
            }
            const url = `${API}/project/${id}/download`;
            const result = await fetch(url, RequetsOptions);
            const json = await result.json() as { body: any, message: string, error: boolean };
            noti.setMessage({ active: true, message: json.message, type: json.error ? `error` : `success` })
            modal.hidden();
            setCurrentDownlaod(!currentDownlaod);
            report();
            setLoad(false);
            setError(null);
        }

        Execute();
    }

    const HanldeSubmitPublic = () => {
        const Execute = async () => {
            setLoad(true);
            setError(null);
            const RequetsOptions = {
                method: `PUT`,
                headers: {
                    // "Content-Type": "multipart/form-data",
                    token: `${getToken()}`
                }
            }
            const url = `${API}/project/${id}/public`;
            const result = await fetch(url, RequetsOptions);
            const json = await result.json() as { body: any, message: string, error: boolean };

            noti.setMessage({ active: true, message: json.message, type: json.error ? `error` : `success` })
            modal.hidden();
            report();
            setCurrentPublic(!currentPublic);
            setLoad(false);
            setError(null);
        }

        Execute();
    }

    return (
        <>
            <div className="grid gap-3">
                <div className="flex justify-between mt-3">
                    <Title customClass="text-2xl font-black mb-2 text-center" text="Descargable" />

                    <label className="relative inline-flex items-center cursor-pointer">
                        
                        <input onChange={() => HanldeSubmitDownload()} type="checkbox" checked={currentDownlaod} value="" className="sr-only peer" />
                            <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-12 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-10 after:w-10 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                            </div>
                    </label>
                </div>
            </div>

            <div className="h-auto">
                <div className="flex justify-between mt-3">
                    <Title customClass="text-2xl font-black mb-2 text-center" text="Público" />

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={() => HanldeSubmitPublic()} type="checkbox" checked={currentPublic} value="" className="sr-only peer" />
                            <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-12 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-10 after:w-10 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                            </div>
                    </label>
                </div>
            </div>
        </>
    )
}
