import { useModal } from "../../_context/ModalContext"
import ButtonHandler from "../../_handler/ButtonsHandler"
import ProjectInModal from "../../app/public/ProjectInModal"
import Button from "../_atom/Button"
import Paragraph from "../_atom/Paragraph"
import Subtitle from "../_atom/Subtitle"
import AnimatedEye from "../AnimateIcons/AnimateEye"

interface Props {
    item: any
}

export default function CardLibrary({ item }: Props) {

    const modal = useModal();

    return (
        <div className="bg-white rounded shadow">
            {/* PORTADA */}
            <div className="p-3 flex flex-col justify-center items-center">
                <Subtitle text={item.title} customClass="text-md text-center font-semibold" />
                <Paragraph
                    customClass="text-xs font-semibold text-slate-700 text-center"
                    text={item.resumen.length > 50 ? `${item.resumen.slice(0, 50)}...` : item.resumen.slice(0, 50)}
                />
                <Button
                    click={() => modal.show(<ProjectInModal item={item} />)}
                    customClass={`${ButtonHandler({ param: `` })} bg-slate-300 hover:bg-slate-100 m-auto duration-300 mt-3`}
                    text="ver"
                    ico={<AnimatedEye size={30} />}
                />
            </div>
        </div>
    )
} 
