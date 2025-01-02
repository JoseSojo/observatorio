import { useEffect, useState } from "react"
import { API } from "../../entorno"
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions"
import ConstructorStatictics from "./ConstructorStatictics";

interface Props {
    crud: string
}

export default function AbstractStatictics ({crud}:Props) {

    const [staticstics, setStatictics] = useState<{path:string,label:string,title:string}[] | null>(null);

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}/statictics/found/?key=${crud}`;
            const req = RequestOptionsGetToken({ method:`GET` });
            const result = await fetch(url, req);
            const json = await result.json() as {path:string,label:string,title:string}[];
            setStatictics(json);
        }
        ExecuteRequets();
    }, [])

    return (
        <>
            {
                staticstics && staticstics.map((item) => (
                    <ConstructorStatictics statictics={item} />
                ))
            }
        </>
    )
}
