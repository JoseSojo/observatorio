import { API } from "../../entorno";
import { CreateLoginInterface, ResponseLoginApi } from "../../types/auth/LoginInterface";
import { RequestOptionsCreate } from "../../utils/req/RequetsOptions";

export async function ExecuteLogin(data: CreateLoginInterface): Promise<ResponseLoginApi> {
    const url = `${API}/auth/login`;
    const req = RequestOptionsCreate({ body:data, method:`POST` });

    const result = await fetch(url, req);
    const jsonPromise = result.json();


    if(!result.ok) {
        const jsonError = await jsonPromise as ResponseLoginApi;
        return jsonError
    }
    
    const json = await jsonPromise as ResponseLoginApi;

    return json
}
