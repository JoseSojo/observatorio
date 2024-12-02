import { useModal } from "../../_context/ModalContext"
import ButtonHandler from "../../_handler/ButtonsHandler"
import { Icono } from "../../_handler/IconHandler"
import ProjectInModal from "../../app/public/ProjectInModal"
import Button from "../_atom/Button"
import Paragraph from "../_atom/Paragraph"
import Subtitle from "../_atom/Subtitle"

interface Props {
    item: any
}

export default function CardLibrary ({item}:Props) {

    const modal = useModal();

    return (
        <div className="bg-white rounded shadow">
            {/* PORTADA */}
            <div className="group h-32 w-full bg-slate-600 rounded-t group-hover:bg-slate-700 flex justify-center items-center">
                {/* <span >{Icono({ ico:`show` })}</span> */}
                <Button
                    click={() => modal.show(<ProjectInModal item={item} />)}
                    customClass="text-[0px] group-hover:text-5xl group-hover:cursor-pointer duration-300"
                    text=""
                    ico={Icono({ ico:`show` })}
                />
                
            </div>
            <div className="p-3 flex flex-col justify-center items-center">
                <Subtitle text={item.title} customClass="text-md text-center font-semibold" />
                <Paragraph 
                    customClass="text-xs font-semibold text-slate-700 text-center" 
                    text={item.resumen.length > 50 ? `${item.resumen.slice(0, 50)}...` : item.resumen.slice(0, 50)}
                    />
                <Button
                    click={() => modal.show(<ProjectInModal item={item} />)}
                    customClass={`${ButtonHandler({ param:`create` })} m-auto duration-300 mt-3`}
                    text="ver"
                    ico={Icono({ ico:`show` })}
                />
            </div>
        </div>
    )
} 
