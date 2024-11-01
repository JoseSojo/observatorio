import { GetToken } from "../../_hooks/storage/useToken";
import { API_URL } from "../../config/constants";
import { StaticticsPieName } from "../../config/interface/statictics/StaticticsInterface";

export async function PieStatic({param}: {param: StaticticsPieName}) {
    
    const RequetsOptions = {
        headers: {
            token:`${GetToken()}`
        }
    }
    const url = `${API_URL}/gui/statistics/pie/${param}`;
    const result = await fetch(url, RequetsOptions);
    const json = await result.json() as { label:string[], value:number[], title:string };

    return json;
}
