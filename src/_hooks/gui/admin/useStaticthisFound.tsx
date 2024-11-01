import { API_URL } from "../../../config/constants";
import { GetToken } from "../../storage/useToken";
import { BaseStatictics } from "../../../config/interface/statictics/StaticticsInterface";


interface Props {
    object?: string;
    id?: string
}

export function useStaticthisFound ({object,id}: Props) {    

    const Execute = async (): Promise<BaseStatictics[]> => {
        const url = `${API_URL}/gui/statistics/?object=${object ? object : ``}&id=${id ? id : ``}`;
        const RequetsOptions = {
            headers: { token:`${GetToken()}` }
        }

        const result = await fetch(url, RequetsOptions);
        const jsonResponse = await result.json() as BaseStatictics[];
        
        console.log(jsonResponse);
        return jsonResponse;
    }

    return {
        Execute
    }
}
