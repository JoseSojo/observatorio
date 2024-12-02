import { useNavigate } from "react-router-dom";
import AbstractCreate from "../app/dashboard/AbstractCreate";
import { ActionCrudInterface } from "../types/gui/CrudInterface";
import ModalTemplate from "../UI/_template/ModalTemplate";
import { useModal } from "../_context/ModalContext";
import AbstractReport from "../app/dashboard/AbstractReport";
import AbstractDelete from "../app/dashboard/AbstractDelete";
import AbstractUpdate from "../app/dashboard/AbstractUpdate";

export default function useHanldeClick ({ title, crud, reload,deleteFn,id }: {id?:string,title:string, crud:string, reload:()=> void, deleteFn: () => void}) {

    const navigate = useNavigate();
    const modal = useModal();

    const TransladePage = (path: string) => navigate(path);

    const HandleActionsList = ({ico,label,use,path}: ActionCrudInterface) => {
        if(use === "download") PushDownload({path,ico,label,use});
        else if(use === "page") PushPage({path,ico,label,use});
        else if(use === "modal") PushModal({path,ico,label,use});
    }
    
    const PushModal = ({path,ico,label,use}:ActionCrudInterface) => {

        modal.show(<ModalTemplate>
            { ico === `create` && <AbstractCreate reload={reload} crud={crud} item={{path,ico,label:`${label} ${title}`,use}} /> }
            { ico === `delete` && <AbstractDelete crud={crud} reload={deleteFn} item={{path,ico,label:`${label} ${title}`,use}} /> }
            { ico === `update` && <AbstractUpdate crud={crud} reload={reload} item={{path,ico,label:`${label} ${title}`,use}} /> }
        </ModalTemplate>)
    }
    
    const PushPage = ({path,ico}:ActionCrudInterface) => {
        if(ico === `list`) navigate(path);
        if(ico === `unique`) navigate(path);
    }
    
    const PushDownload = ({path,ico,label,use}:ActionCrudInterface) => {
        modal.show(<ModalTemplate><AbstractReport id={id} translade={TransladePage} crud={crud} item={{ ico, label:`${label} ${title}`, path,use }} /></ModalTemplate>)
    }

    return {
        HandleActionsList,
        PushModal,
        PushPage,
        PushDownload
    }
}