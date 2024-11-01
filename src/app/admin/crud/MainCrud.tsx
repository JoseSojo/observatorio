import { useEffect, useState } from "react";
import { CrudActionCreate } from "../../../_UI/_compounds/crud/CrudActionCreate";
import { CrudActionList } from "../../../_UI/_compounds/crud/CrudActionList";
import { CrudActionUnique } from "../../../_UI/_compounds/crud/CrudActionUnique";
import { ActionCrudInterface, ActionsCrudType, ObjectNameType, PathApiUrl } from "../../../config/interface/crud/CrudApiInterface";
import { CurrentButtom } from "../../../_UI/_atoms/CurrentButton";
import { GetIcon } from "../../../_UI/_icons/IconsHandle";


interface Props {
    actions: ActionCrudInterface[];
    path: PathApiUrl;
    reload: boolean;
    title: string;
    object: ObjectNameType
}

export function MainCrud({actions, path, reload, title, object }: Props) {

    const PathUnique = (id: string) => {
        return `${path.list}/${id}`;
    }

    const [section, setSection] = useState<ActionsCrudType>(`list`);

    const [id, setId] = useState<string | null>(null);
    const [create, setCreate] = useState<ActionCrudInterface | null>(null);
    const [report, setReport] = useState<ActionCrudInterface | null>(null);
    const [list, setList] = useState<ActionCrudInterface | null>(null);
    const [show, setShow] = useState<ActionCrudInterface | null>(null);

    const HandleChange = (set: ActionsCrudType) => {if (set != section) setSection(set);}

    const ReverseList = () => HandleChange(`list`);

    const ChangeToShow = (id: string) => {
        setSection(`show`);
        setId(id);
    }
    useEffect(() => {
        actions.forEach(item => {
            console.log(item.action);
            if(item.action == "create") setCreate(item);
            else if(item.action == "search") setReport(item);
            else if(item.action == "list") setList(item);
            else if(item.action == "show") setShow(item);
        });
    }, [reload])

    return (
        <div className="flex flex-col">
            <header className="flex justify-between items-center">
                <h3 className="text-xl font-semibold uppercase">{title}</h3>
                <ul className="flex gap-3">
                    { list && <CurrentButtom click={() => HandleChange("list")} customClass="text-xl px-4 py-2 rounded-md bg-primary-100 hover:bg-primary-200 text-custom-white" ico={GetIcon(`list`)} /> }
                    { create && <CurrentButtom click={() => HandleChange("create")} customClass="text-xl px-4 py-2 rounded-md bg-primary-100 hover:bg-primary-200 text-custom-white" ico={GetIcon(`save`)} /> }
                    { report && <CurrentButtom click={() => HandleChange("search")} customClass="text-xl px-4 py-2 rounded-md bg-primary-100 hover:bg-primary-200 text-custom-white" ico={GetIcon(`save`)} /> }
                </ul>
            </header>
            { section === `create` && create?.create && <CrudActionCreate reverse={ReverseList} create={create.create} /> }
            { section === `list` && list?.list && <CrudActionList object={object}  reverse={ReverseList} changePage={ChangeToShow} isShow={show ? true : false} path={path.list} action={list.list} /> }
            { section === `show` && show?.show && id && <CrudActionUnique object={object} reverse={ReverseList} path={PathUnique(id)} id={id} show={show.show} /> }
        </div>
    )
}
