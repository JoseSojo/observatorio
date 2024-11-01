import { API_URL } from "../../../config/constants";
import { GetToken } from "../../storage/useToken";
import { ResponseStaticticsApi } from "../../../config/interface/statictics/StaticticsInterface";

interface Props {
    itemId?: string;
    event?: string;
    month?: number;
    year?: number;
    type: `year` | `month`;
}

export function useStaticthis ({ event, itemId,month,year,type }: Props) {    

    const Execute = async (): Promise<ResponseStaticticsApi> => {
        let queryString = `?`;
        if(event) queryString += `event=${event}`;
        if(itemId) queryString += `&id=${itemId}`;
        if(type == `month` && month) queryString += `&month=${month}`;
        if(year) queryString += `&year=${year}`;

        const url = `${API_URL}/gui/statistics/${type}/${queryString}`;
        const RequetsOptions = {
            headers: { token:`${GetToken()}` }
        }

        const result = await fetch(url, RequetsOptions);
        const jsonResponse = await result.json() as ResponseStaticticsApi;
        
        if(!result.ok) return { label:[], result:[], title:``, type:`` }
        return jsonResponse
    }

    return {
        Execute
    }
}
