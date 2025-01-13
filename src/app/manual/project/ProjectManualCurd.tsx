import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ActionCrudInterface } from "../../../types/gui/CrudInterface";
import { LogicCrudService } from "../../../_service/crud/LogicCrudService";
import AbstractList from "../../dashboard/AbstractList";
import Title from "../../../UI/_atom/Title";
import Button from "../../../UI/_atom/Button";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { Icono } from "../../../_handler/IconHandler";
import useHanldeClickProject from "../../../utils/useHandleClickProject";
import AbstractStatictics from "../../dashboard/AbstracStatictics";

export default function ProjectManualCrud() {

    const location = useLocation();

    // const [path, setPath] = useState(``);
    const [title, setTitle] = useState(``);
    const [actionsList, setActionsList] = useState<ActionCrudInterface[]>([]);
    const [actionsUnique, setActionsUnique] = useState<ActionCrudInterface[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);

    const [reload, setReload] = useState(false);
    const Reload = () => setReload(!reload);

    const { HandleActionsList } = useHanldeClickProject({ report: Reload, reportDelete: Reload });

    useEffect(() => {
        const Execute = async () => {
            const response = await LogicCrudService({ crud: `project` });
            setTitle(response.title);
            setActionsList(response.actions);
            setActionsUnique(response.actionsUnique);
            setHeaders(response.header);
        }
        Execute();
    }, [location]);

    return (
        <>
            <div className="bg-white p-5 rounded-lg">
                <div className="flex justify-between">
                    <Title customClass="text-2xl font-black flex items-center" text={title} />

                    <ul className="flex gap-3 justify-center items-center">
                        {
                            actionsList.map((item) => {
                                if (item.use == "modal" && item.label == `Crear`) return <></>

                                return (
                                    <Button
                                        click={() => {
                                            HandleActionsList({ id: item.id, ico: item.ico, label: item.label, path: item.path, use: item.use });
                                        }}
                                        customClass={`${ButtonHandler({ param: item.ico })} btn-sm`}
                                        ico={Icono({ ico: item.ico })}
                                        text={`${item.label}`}
                                    />
                                )
                            })
                        }
                    </ul>
                </div>

                <AbstractList loadReload={Reload} reload={reload} onAction={HandleActionsList} actions={actionsUnique} header={headers} path={`/project`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                <AbstractStatictics crud={`project`} />
            </div>
        </>
    )
}
