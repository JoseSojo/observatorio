import { useState } from "react";
import { useModal } from "../../../_context/ModalContext";
import Subtitle from "../../_atom/Subtitle";
import CreateDataWork from "./compound/CreateDataWork";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { Icono } from "../../../_handler/IconHandler";
import Button from "../../_atom/Button";
import AbstractList from "../../../app/dashboard/AbstractList";

interface Props {
    user: any;
    userId: string;
}

export default function DataLaboral({  }: Props) {

    const modal = useModal();

    const [reload, setReload] = useState(false);
    const CustomReload = () => setReload(!reload);

    return (
        <div className="">

            <div className="flex justify-between py-3">
                <Subtitle customClass="" text="" />
                <Button
                    click={() => modal.show(<CreateDataWork reload={CustomReload} />)}
                    customClass={`${ButtonHandler({ param:`create` })} btn-sm`}
                    text="crear"
                    ico={Icono({ ico:`create` })}
                />
            </div>

            <AbstractList actions={[]} header={[ `Actual`, `Tipo Institución`,  `Institución`, `Ocupación`, `Cargo`, `Inicio`, `Fin`,]} path="/work/my" onAction={()=>{}} />

        </div>
    )
}
