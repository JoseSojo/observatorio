import { API } from "../../entorno";
import { ResposneAbstractUniqueCrud } from "../../types/gui/CrudInterface";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";

export async function LogicUniqueService ({ crud,id }: {crud:string,id:string}) {
    const url = `${API}/gui/${crud}/${id}`;
    const req = RequestOptionsGetToken({ method:`GET` });

    const result = await fetch(url, req);
    const jsonPromise = result.json() as Promise<ResposneAbstractUniqueCrud>;

    if(!result.ok) {
        const jsonError = await jsonPromise;
        return jsonError
    }    
    const json = await jsonPromise;

    return json
}
