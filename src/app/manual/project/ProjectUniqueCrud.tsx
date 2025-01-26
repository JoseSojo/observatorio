import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ActionCrudInterface } from "../../../types/gui/CrudInterface";
import Title from "../../../UI/_atom/Title";
import Button from "../../../UI/_atom/Button";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { Icono } from "../../../_handler/IconHandler";
import { LogicUniqueService } from "../../../_service/crud/LogicUniqueService";
import ExtractValue from "../../../utils/ExtractValue";
import useHanldeClickProject from "../../../utils/useHandleClickProject";
import ProjectUpdate from "./ProjectUpdate";
import Text from "../../../UI/_atom/Text";
import Subtitle from "../../../UI/_atom/Subtitle";

interface Props {}

export default function ProjectUniqueCrud ({}: Props) {

    const { id } = useParams() as { id:string };
    const location = useLocation();
    const navigate = useNavigate();

    const [header, setHeader] = useState<string[]>([]);
    const [dataList, setDataList] = useState<string[]>([]); 
    const [title, setTitle] = useState(``);
    const [actionsList, setActionsList] = useState<ActionCrudInterface[]>([]);
    const [body, setBody] = useState<any>([]);

    const [reload, setReload] = useState(false);
    const Reload = () => setReload(!reload);
    const ReloadDelete = () => navigate(`/project/`);

    const { HandleActionsList } = useHanldeClickProject({ report:Reload, reportDelete:ReloadDelete, });

    useEffect(() => {
        const Execute = async () => {
            const param = {
                crud: `project`,
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
                <Title customClass="text-2xl flex-1 max-w-3xl font-black flex items-center" text={title} />

                <ul className="flex gap-3 justify-center items-center">
                    {
                        actionsList.map((item) => (
                            <Button
                                click={() => {
                                    HandleActionsList({ id:body[`id`],ico:item.ico,label:item.label,path:item.path,use:item.use });
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
                                <li className="grid grid-cols-3 mt-2">
                                    <span>{header[i]}:</span>
                                    <span className="col-span-2 font-bold">{ExtractValue({ extractBy:item, item:body })}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="card bg-base-100 p-4 col-span-3">
                    <div className="grid grid-cols-1 gap-2">
                        <Subtitle customClass="text-xl font-bold" text={`Autores`} />

                        <div className="grid grid-cols-2">
                            {
                                body && body.authos && body.authos.map && body.authos.map((autor: any) => (
                                    <Text text={`${autor.createByRef.name} ${autor.createByRef.lastname}`} customClass="text-slate-700 text-md text-serif font-semibold" />
                                )) 
                            }
                        </div>
                    </div>
                    <ProjectUpdate 
                        customPublic={ body[`public`] ? true : false }
                        downlaod={ body[`downloader`] ? true : false }
                        id={id} 
                        report={Reload}
                        />
                </div>
                {/* <div className="card bg-base-100 p-4 col-span-5">
                    <AbstractCustomList url={`${API}/project/${id}/history`} />
                </div> */}
            </div>
        </div>
    )
}
