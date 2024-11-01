import { useEffect, useState } from "react"
import { API_URL } from "../../../config/constants";
import { GetToken } from "../../../_hooks/storage/useToken";
import { Form } from "../../../config/interface/current/generic/FormGuiInterface";
import { CurrentForm } from "./Form";

interface Props {
    action: string,
    text: `crear` | `actualizar`
}

export function GenericForm ({ action,text }: Props) {

    const [load, setLoad] = useState(true);
    const [error, setError] = useState(false);
    const [custom, setCustom] = useState<Form | null>(null);

    useEffect(() => {
        setLoad(true);
        setError(false);
        const Execute = async () => {
            const resultPromise = await fetch(`${API_URL}${action}`, { headers:{ token:`${GetToken()}` } })
            const resultJson = await resultPromise.json() as Form;
            setCustom(resultJson);
            setLoad(false);
            setError(false);
        }
        Execute();
    }, [])

    return (
        <>
            {
                load 
                ? <>load</>
                : error
                    ? <>error</>
                    : custom
                        ? <CurrentForm text={text} data={custom} />
                        : <>oops</>
            }
        </>
    )
}
