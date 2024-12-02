import { API } from "../../entorno";
import { ResponseActionSlide } from "../../types/gui/SlideInterface";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";

export async function SlideGui (): Promise<ResponseActionSlide> {

    const url = `${API}/gui/slide`;
    const req = RequestOptionsGetToken({ method:`GET` });

    const result = await fetch(url, req);
    const jsonPromise = result.json();


    if(!result.ok) {
        const jsonError = await jsonPromise;
        return {
            body: [],
            error: true,
            message: jsonError.message
        } 
    }
    
    const json = await jsonPromise as ResponseActionSlide;
    return json
}
