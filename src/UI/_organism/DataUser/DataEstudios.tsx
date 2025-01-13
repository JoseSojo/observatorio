import { useState } from "react";
import { useModal } from "../../../_context/ModalContext";
import Subtitle from "../../_atom/Subtitle";
import Button from "../../_atom/Button";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { Icono } from "../../../_handler/IconHandler";
import CreateDataEstudios from "./compound/CreateDataEstudios";
import AbstractList from "../../../app/dashboard/AbstractList";
import CreateDataCursos from "./compound/CreateDataCursos";

interface Props {
    user: any;
    userId: string;
}

export default function DataEstudios({ }: Props) {

    const modal = useModal();

    const [reload, setReload] = useState(false);
    const CustomReload = () => setReload(!reload);

    return (
        <>
            <div className="">

                <div className="flex justify-between py-3">
                    <Subtitle customClass="text-2xl font-semibold" text="Estudios - Títulos" />
                    <Button
                        click={() => modal.show(<CreateDataEstudios reload={CustomReload} />)}
                        customClass={`${ButtonHandler({ param: `create` })} btn-sm`}
                        text="crear"
                        ico={Icono({ ico: `create` })}
                    />
                </div>

                <AbstractList reload={reload} actions={[]} header={[`Nivel`, `Profesión`, `Área`, `Subárea`, `País`]} path="/education/my" onAction={() => { }} />

            </div>

            <div className="">

                <div className="flex justify-between py-3">
                    <Subtitle customClass="text-2xl font-semibold" text="Cursos - Capacitaciones" />
                    <Button
                        click={() => modal.show(<CreateDataCursos reload={CustomReload} />)}
                        customClass={`${ButtonHandler({ param: `create` })} btn-sm`}
                        text="crear"
                        ico={Icono({ ico: `create` })}
                    />
                </div>

                <AbstractList reload={reload} actions={[]} header={[`Descripción`,`Tipo`,`Institución`,`Área`,`Subárea`,`País`,]} path="/education/cursos/my" onAction={() => { }} />

            </div>
        </>
    )
}
