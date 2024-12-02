import { API } from "../../entorno";
import { ResposneAbstractCrud } from "../../types/gui/CrudInterface";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";

export async function LogicCrudService ({ crud }: {crud:string}) {
    const url = `${API}/gui/${crud}`;
    const req = RequestOptionsGetToken({ method:`GET` });

    const result = await fetch(url, req);
    const jsonPromise = result.json() as Promise<ResposneAbstractCrud>;

    if(!result.ok) {
        const jsonError = await jsonPromise;
        return jsonError
    }
    
    const json = await jsonPromise;

    return json
}
