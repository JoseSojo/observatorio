
import { useEffect, useState } from "react";
import { useLocation, useParams, useRoutes } from "react-router-dom";
import { useCrudController } from "../../../_hooks/gui/crud/useCrudController";
import { ActionCrudInterface, ObjectNameType, PathApiUrl } from "../../../config/interface/crud/CrudApiInterface";
import { GhostCrudListController } from "../../../_UI/_ghost/crud/GhostCrudListController";
import { MainCrud } from "./MainCrud";

interface Props {
}

export default function DinamiCRUD({} : Props) {
    const { crud } = useParams() as { crud: ObjectNameType };
    const [load, setLoad] = useState(true);
    const [path, setPath] = useState<PathApiUrl | null>(null); 
    const [actions, setActions] = useState<ActionCrudInterface[] | null>(null); 
    const [reload, setReload] = useState(false);
    const location = useLocation();
    const [title, setTitle] = useState(``);
    
    const { Execute } = useCrudController({ crud });

    useEffect(() => {
        (async function () {
            setLoad(true);
            const { actions, path, title } = await Execute();
            
            setActions(actions);
            setTitle(title);
            setPath(path);
            setLoad(false);
        })()
    }, [location.pathname])

    return (
        <>
            {
                load 
                ?   <GhostCrudListController />
                :   actions && path
                    ?   <MainCrud object={crud} title={title} reload={reload} actions={actions} path={path}  />                        
                    :   <GhostCrudListController />
            }
        </>
    );
}