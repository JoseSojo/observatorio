import { useModal } from "../../_context/ModalContext"
import ButtonHandler from "../../_handler/ButtonsHandler"
import { API_STATIC } from "../../entorno"
import Button from "../../UI/_atom/Button"
import Paragraph from "../../UI/_atom/Paragraph"
import Subtitle from "../../UI/_atom/Subtitle"
import DownloadAnimate from "../../UI/AnimateIcons/DownloadAnimate"

interface Props {
    item: any
}

export default function ProjectInModal({ item }: Props) {

    const modal = useModal();

    return (
        <div className="bg-white max-h-[80vh] h-[80vh] rounded shadow-xl grid grid-cols-1 lg:grid-cols-[.7fr_1fr]">
            <div className="bg-slate-900 rounded-l">

            </div>
            <div className="bg-white p-4 scale-y-110 flex justify-between items-center flex-col">
                <div>
                    <Subtitle customClass="text-3xl font-bold text-center" text={item.title} />

                    <Subtitle customClass="text-sm w-full text-center -bottom-3 relative" text="Autores" />
                    <div className="flex justify-center flex-wrap items-center gap-3 mt-3">
                        {
                            item.authos.map((autor: any) => (
                                <span className="badge badge-lg shadow">{autor.createByRef.name} {autor.createByRef.lastname}</span>
                            ))
                        }
                    </div>

                    <Subtitle customClass="text-sm w-full text-center -bottom-3 relative" text="Palabras clave" />
                    <div className="flex justify-center flex-wrap items-center gap-3 mt-3">
                        {
                            item.keywords.split(` `).map((item: string) => (
                                <span className="badge  shadow shadow-slate-600">{item}</span>
                            ))
                        }
                    </div>
                    <Paragraph customClass="text-sm text-center mt-5" text={item.resumen} />
                </div>

                <div className="flex justify-between items-center gap-3">
                    <Button
                        click={()=>modal.hidden()}
                        customClass="btn btn-md text-white btn-error"
                        text="cerrar"
                    />
                    {
                        item.downloader &&
                        <a target="_blank" className={`${ButtonHandler({ param: `` })} border border-slate-300 hover:bg-slate-300`} href={`${item && item.documentRef && item.documentRef.donwload ? `${API_STATIC}${item.documentRef.donwload}` : ``}`} download={true}>
                            <DownloadAnimate size={38} />
                            Descargar
                        </a>
                    }

                </div>

            </div>
        </div>
    )
}
