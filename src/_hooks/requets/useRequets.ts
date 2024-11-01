"use client";

import { API_URL } from "../../config/constants";
import { METHOD_HTTP, ResponseApi } from "../../config/interface/GlobalInterface";
import { useState } from "react";

export function useRequets ({ body, method, action }: { body:any, method: METHOD_HTTP, action:string }) {

    const [error, setError] = useState(false);
    const [req, setReq] = useState<ResponseApi>();

    const Headers = {};
    const Body = body;
    const Path = `${API_URL}${action}`;
    const Method = method;

    const ExecuteRequets = async () => {
        setError(false);
        const resutl = await fetch(Path, {
            body: JSON.stringify(Body),
            headers: {
                ...Headers,
                "Content-Type":"application/json"
            },
            method:Method
        });
        if(resutl.ok) setError(true);

        const json = await resutl.json();
        setReq(json);
    }

    return { fn:ExecuteRequets, error, req };    
}
