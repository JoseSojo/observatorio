import { useModal } from "../../_context/ModalContext";
import Text from "../_atom/Text";
import Subtitle from "../_atom/Subtitle";
import { Icono } from "../../_handler/IconHandler";
import ButtonHandler from "../../_handler/ButtonsHandler";
import Button from "../_atom/Button";
import { deleteTokenAndUser } from "../../utils/token";

interface Props {
}

export default function Logout({ }: Props) {

    const modal = useModal();

    return (
        <div className="h-[50vh] flex flex-col justify-center items-center gap-3 bg-white rounded-xl">
            <Text customClass="p-6 rounded-full bg-slate-200 text-emerald-800 text-6xl" text={Icono({ ico: `logout` })} />
            <Subtitle customClass="text-2xl font-black " text="Cerrar sesión" />
            <div className="flex justify-center items-center gap-5">
                <Button
                    click={() => modal.hidden()}
                    customClass={`${ButtonHandler({ param: `` })} border`}
                    text="Cerrar"
                />
                <Button
                    click={() => {
                        deleteTokenAndUser();
                        window.location.reload();
                    }}
                    customClass={`${ButtonHandler({ param: `delete` })}`}
                    text="Salir"
                    ico={Icono({ ico: `logout` })}
                />
            </div>
            {/* <a target="_blank" className={`${load ? `btn skeleton` : ButtonHandler({ param:`logout` })}`} href={`${data && data.documentRef && data.documentRef.donwload ? `${API_STATIC}${data.documentRef.donwload}` : ``}`} download={true}>
                {Icono({ ico: load ? `load` : `logout` })}
                { load ? `Cargando...` : `Salir` }
            </a> */}
        </div>
    )
}
