import { useState } from "react"
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
    const [user, setUser] = useState<any | null>(null);

    return (
        <div className="bg-white max-h-[80vh] h-[80vh] rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-[.7fr_1fr]">
            <div className="bg-gradient-to-r from-slate-400 to-slate-500 rounded-l-2xl">

                {
                    user
                        ? <div className="w-full h-full flex justify-center items-center text-slate-600 select-none">
                            <div className="h-56 w-72 absolute flex justify-center items-center">
                                {
                                    user.profilePath
                                        ? <img
                                            className="object-cover h-20 w-20 rounded-full scale-125 -translate-y-10"
                                            src={`${API_STATIC}${user.profilePath ? user.profilePath : ``}`}
                                            alt="Profile"
                                        />
                                        : <div className="object-cover h-20 w-20 rounded-full scale-125 -translate-y-10 bg-slate-400"></div>
                                }
                            </div>

                            <div className="h-56 mx-4 w-5/6 bg-gradient-to-r from-slate-600 to-slate-300 rounded-3xl shadow-md sm:w-80 sm:mx-0">
                                <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5">
                                    <p className="text-white text-xs font-bold">@{user.username ? user.username : ``}</p>
                                    <span></span>
                                </div>

                                <div className="bg-white h-1/2 w-full rounded-3xl flex flex-col justify-around items-center">
                                    <div className="w-full h-1/2 flex justify-between items-center px-3 pt-2">
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-gray-500 text-sm">Correo</p>
                                            <p className="text-gray-600 text-xs font-bold">{user.email ? user.email : ``}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-gray-500 text-sm">Teléfono</p>
                                            <p className="text-gray-600 text-xs font-bold">{user.phone ? user.phone : ``}</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-1/2 flex flex-col justify-center items-center">
                                        <p className="text-gray-700 font-bold">{user.name ? user.name : ``} {user.lastname ? user.lastname : ``}</p>
                                        <p className="text-gray-500 text-sm">{
                                            user.parroquiaReference
                                            && user.parroquiaReference.municipioReference
                                            && user.parroquiaReference.municipioReference.stateReference
                                            && user.parroquiaReference.municipioReference.stateReference.name
                                            } 
                                            <b>
                                                {
                                                    user.parroquiaReference && `, ${user.parroquiaReference.name}`
                                                }
                                            </b>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className="w-full h-full flex justify-center items-center text-slate-600 select-none">
                            sección informativa
                        </div>
                }

            </div>
            <div className="bg-white p-4 scale-y-110 flex justify-between items-center flex-col">
                <div>
                    <Subtitle customClass="text-3xl font-bold text-center" text={item.title} />

                    <Subtitle customClass="text-sm w-full text-center -bottom-3 relative" text="Autores" />
                    <div className="flex justify-center flex-wrap items-center gap-3 mt-3">
                        {
                            item.authos.map((autor: any) => (
                                <Button
                                    click={() => setUser(autor.createByRef)}
                                    customClass="flex items-center gap-3 bg-gradient-to-r from-slate-100 to-slate-300 rounded-full pr-3 text-sm font-bold"
                                >
                                    {
                                        autor.createByRef.profilePath &&
                                        <img src={`${API_STATIC}${autor.createByRef.profilePath}`} className="scale-125 object-cover rounded-full" style={{ width: 30, height: 30 }} />
                                    }
                                    <span className="py-1 px-2">{autor.createByRef.name ? autor.createByRef.name : ``} {autor.createByRef.lastname ? autor.createByRef.lastname : ``}</span>
                                </Button>
                            ))
                        }
                    </div>

                    <Subtitle customClass="text-sm w-full text-center -bottom-3 relative" text="Palabras clave" />
                    <div className="flex justify-center flex-wrap items-center gap-3 mt-3">
                        {
                            item.keywords.split(` `).map((item: string) => (
                                <span className="text-xs font-bold px-3 py-1 rounded-[20px] border border-slate-500">{item}</span>
                            ))
                        }
                    </div>
                    <Paragraph customClass="text-sm text-center mt-5" text={item.resumen} />

                    <ul className="timeline w-full flex justify-center">
                        <li className="flex-1">
                            <div className="timeline-start text-xs font-light flex justify-center items-end">categoría</div>
                            <div className="timeline-middle text-xs font-black">
                                {item.programRef.categoryRef.name}
                            </div>
                            <hr />
                        </li>
                        <li className="flex-1">
                            <hr />
                            <div className="timeline-start text-xs font-light flex justify-center items-end">Programa</div>
                            <div className="timeline-middle text-xs font-black">
                                {item.programRef.name}
                            </div>
                            { item.lineRef && <hr /> }
                        </li>
                        {
                            item.lineRef &&
                            <li className="flex-1">
                                <hr />
                                <div className="timeline-start text-xs font-light flex justify-center items-end">línea de investigación</div>
                                <div className="timeline-middle text-xs font-black">
                                    {item.lineRef.name}
                                </div>
                            </li>
                        }
                    </ul>

                </div>

                <div className="flex justify-between items-center gap-3">
                    <Button
                        click={() => modal.hidden()}
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
