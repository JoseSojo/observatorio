import { API } from "../../entorno";
import { CreateRegisterInterface, ResponseRegisterApi } from "../../types/auth/RegisterInterface";
import { RequestOptionsCreate } from "../../utils/req/RequetsOptions";

export async function RegisterService(data: CreateRegisterInterface): Promise<ResponseRegisterApi> {
    const url = `${API}/auth/register`;
    const req = RequestOptionsCreate({ body:data, method:`POST` });

    const result = await fetch(url, req);
    const jsonPromise = result.json();


    if(!result.ok) {
        const jsonError = await jsonPromise as ResponseRegisterApi;
        return jsonError
    }
    
    const json = await jsonPromise as ResponseRegisterApi;

    return json
}
