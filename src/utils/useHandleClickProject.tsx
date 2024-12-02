import { useNavigate } from "react-router-dom";
import { ActionCrudInterface } from "../types/gui/CrudInterface";
import ModalTemplate from "../UI/_template/ModalTemplate";
import { useModal } from "../_context/ModalContext";
import ProjectCreate from "../app/manual/project/ProjectCreate";
import ProjectDelete from "../app/manual/project/ProjectDelete";
import ProjectUpdate from "../app/manual/project/ProjectUpdate";
import ProjectReport from "../app/manual/project/ProjectReport";
import ProjectDownload from "../app/manual/project/ProjectDownload";

interface Props {
    report:         () => void;
    reportDelete:   () => void;
}

export default function useHanldeClickProject ({report,reportDelete}:Props) {

    const navigate = useNavigate();
    const modal = useModal();

    const TransladeNav= (path: string) => {
        navigate(path, { viewTransition:true });
    }

    const PushModal = ({ico,id}:ActionCrudInterface) => {

        modal.show(<ModalTemplate>
            { ico === `download` && <ProjectDownload id={`${id}`} reload={report} /> }
            { ico === `create` && <ProjectCreate reload={report} /> }
            { ico === `delete` && <ProjectDelete report={reportDelete} id={`${id}`} /> }
            { ico === `update` && <ProjectUpdate customPublic downlaod report={report} id={`${id}`} /> }
        </ModalTemplate>)
    }
    
    const PushPage = ({ico,id}:ActionCrudInterface) => {
        if(ico === `list`) navigate(`/project`);
        if(ico === `unique`) navigate(`/project/${id}`);
        if(ico === `create`) navigate(`/project/create`);
    }
    
    const PushDownload = ({id}:ActionCrudInterface) => {
        modal.show(<ModalTemplate><ProjectReport translade={TransladeNav} report={report} id={id} /></ModalTemplate>)
    }

    const HandleActionsList = ({ico,label,use,path,id}: ActionCrudInterface) => {
        if(use === "download") PushDownload({path,ico,label,use,id});
        else if(use === "page") PushPage({path,ico,label,use,id});
        else if(use === "modal") PushModal({path,ico,label,use,id});
    }

    return {
        HandleActionsList,
        PushModal,
        PushPage,
        PushDownload
    }
}