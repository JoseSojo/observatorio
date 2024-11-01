"use client";

import { API_URL } from "../../config/constants";
import { METHOD_HTTP } from "../../config/interface/GlobalInterface";

export function usePreRequets ({ body, method, action }: { body:any, method: METHOD_HTTP, action:string }) {

    // const [req, setReq] = useState<ResponseApi>();

    const Headers = {};
    const Body = body;
    const Path = `${API_URL}${action}`;
    const Method = method;

    const Options = {
        body: JSON.stringify(Body),
        headers: {
            ...Headers,
            "Content-Type":"application/json"
        },
        method:Method
    }

    return { Options, Path };    
}
