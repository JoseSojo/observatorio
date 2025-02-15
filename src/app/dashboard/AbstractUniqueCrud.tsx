import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ActionCrudInterface } from "../../types/gui/CrudInterface";
import Title from "../../UI/_atom/Title";
import Button from "../../UI/_atom/Button";
import ButtonHandler from "../../_handler/ButtonsHandler";
import { Icono } from "../../_handler/IconHandler";
import { LogicUniqueService } from "../../_service/crud/LogicUniqueService";
import HanldeClick from "../../utils/useHandleClick";
import ExtractValue from "../../utils/ExtractValue";
import AbstractUpdate from "./AbstractUpdate";
// import AbstractCustomList from "./AbstractCustomList";
// import { API } from "../../entorno";

interface Props {}

export default function AbstractUniqueCrud ({}: Props) {

    const { crud,id } = useParams() as { crud:string,id:string };
    const location = useLocation();
    const navigate = useNavigate();

    // const [list, setList] = useState<any[]>([]);
    const [header, setHeader] = useState<string[]>([]);
    const [dataList, setDataList] = useState<string[]>([]); 
    const [title, setTitle] = useState(``);
    const [actionsList, setActionsList] = useState<ActionCrudInterface[]>([]);
    // const [actionsUnique, setActionsUnique] = useState<ActionCrudInterface[]>([]);
    const [body, setBody] = useState<any>([]);
    // const [headers, setHeaders] = useState<string[]>([]);

    const [reload, setReload] = useState(false);
    const Reload = () => setReload(!reload);
    const ReloadDelete = () => navigate(`/dashboard/${crud}`) 

    const { HandleActionsList } = HanldeClick({ title, crud, reload:Reload, deleteFn: ReloadDelete,id });

    useEffect(() => {
        const Execute = async () => {
            const param = {
                crud: crud as string,
                id: id as string
            };
            const response = await LogicUniqueService(param);

            setActionsList(response.actions);
            setDataList(response.dataList);
            setHeader(response.header);
            setTitle(response.title);
            setBody(response.body);
        }
        Execute();
    }, [location,reload]);

    return (
        <div className="">
            <div className="flex justify-between">
                <Title customClass="text-2xl font-black flex items-center" text={title} />

                <ul className="flex gap-3 justify-center items-center">
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

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mt-3">
                <div className="card bg-base-100 p-4 col-span-2">
                    <ul>
                        {
                            dataList.map((item, i) => (
                                <li className="grid grid-cols-3">
                                    <span>{header[i]}:</span>
                                    <span className="col-span-2 font-bold">{ExtractValue({ extractBy:item, item:body })}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="card bg-base-100 p-4 col-span-3">
                    <AbstractUpdate crud={crud} item={{ ico:`update`, label:title, path:`/${crud}/${id}`, use:`page` }} reload={Reload} />
                </div>

                {/* <div className="card bg-base-100 p-4 col-span-5">
                    <AbstractCustomList url={`${API}/${crud}/${id}/history`} />
                </div> */}
            </div>
        </div>
    )
}
