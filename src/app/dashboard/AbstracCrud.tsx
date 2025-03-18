import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { LogicCrudService } from "../../_service/crud/LogicCrudService";
import { ActionCrudInterface } from "../../types/gui/CrudInterface";
import Title from "../../UI/_atom/Title";
import Button from "../../UI/_atom/Button";
import ButtonHandler from "../../_handler/ButtonsHandler";
import { Icono } from "../../_handler/IconHandler";
import AbstractList from "./AbstractList";
import HanldeClick from "../../utils/useHandleClick";
// import AbstractStatictics from "./AbstracStatictics";

interface Props {}

export default function AbstractCrud ({}: Props) {
    const { crud } = useParams() as { crud:string };
    const location = useLocation();

    // const [path, setPath] = useState(``);
    const [title, setTitle] = useState(``);
    const [actionsList, setActionsList] = useState<ActionCrudInterface[]>([]);
    const [actionsUnique, setActionsUnique] = useState<ActionCrudInterface[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [param, setParam] = useState(``);

    const [reload, setReload] = useState(false);
    const Reload = () => setReload(!reload);

    const { HandleActionsList } = HanldeClick({ deleteFn:()=>{  },title, crud, reload:Reload });

    useEffect(() => {
        const Execute = async () => {
            const param = crud as string;
            const response = await LogicCrudService({ crud:param });
            setTitle(response.title);
            setActionsList(response.actions);
            setActionsUnique(response.actionsUnique);
            setHeaders(response.header);
            console.log(response);

        }
        Execute();
    }, [location]);

    return (
        <div className="bg-white p-5 rounded-lg">
            <div className="flex justify-between">
                <Title customClass="text-2xl font-black flex items-center" text={title} />

                <ul className="flex gap-3 justify-center items-center">
                    <input className="inpit input-sm border rounded outline-none" onChange={(e) => setParam(e.target.value)} />
                    {
                        actionsList.map((item) => (
                            <Button
                                click={() => {
                                    HandleActionsList({ ico:item.ico,label:item.label,path:item.path,use:item.use });
                                }}
                                customClass={`${ButtonHandler({ param:item.ico })} btn-sm`}
                                ico={Icono({ ico:item.ico })}
                                text={item.label}
                            />
                        ))
                    }
                </ul>
            </div>

            <AbstractList param={param} loadReload={Reload} reload={reload} onAction={HandleActionsList} actions={actionsUnique} header={headers} path={`/${crud}`} />
        
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                <AbstractStatictics crud={crud} />
            </div> */}
        </div>
    )
}
