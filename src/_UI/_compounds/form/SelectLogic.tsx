import { ChangeEvent, useEffect, useState } from "react";
import { ObjectNameType } from "../../../config/interface/crud/CrudApiInterface";
import { GetToken } from "../../../_hooks/storage/useToken";
import { API_URL } from "../../../config/constants";
import { Filed } from "../../../config/interface/current/generic/FormGuiInterface";
import { LoadingSm } from "../global/LoadingSm";
import { CurrentInput } from "../../_atoms/CurrentInput";
import { CurrentButtom } from "../../_atoms/CurrentButton";

interface Props {
    object: ObjectNameType;
    data: Filed;
}

export function SelectLogic({ object, data }: Props) {

    const [list, setList] = useState<{ name: string, id: string }[]>();
    const [param, setParam] = useState(``);
    const [load, setLoad] = useState(true);
    const [active, setActive] = useState(false);
    const [id, setId] = useState(``); 
    const [name, setName] = useState(``); 

    useEffect(() => {
        const Execute = async () => {
            setLoad(true);
            const RequestOptions = {
                headers: {
                    token: `${GetToken()}`
                }
            }
            const result = await fetch(`${API_URL}/gui/profile/form/select/${object}?param=${param}`, RequestOptions);
            const json = await result.json() as { list: { name: string, id: string }[] };
            setList(json.list);
            setLoad(false);
        }
        Execute();
    }, [param])

    const HandelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setParam(e.target.value)
    }

    const SettingIdForInput = ({name,id}:{name: string,id: string}) => {
        setActive(!active);
        setName(name);
        setId(id);
    }

    return (
        <>
        <input type="hidden" name={data.name} value={id} />
        <div className="relative">
            <span className="font-bold text-gray-800 text-sm">Seleccionar</span>
            <CurrentButtom text={name ? name : `Seleccionar`} click={() => setActive(!active)} customClass="w-full text-center border py-2 text-md text-gray-600" />
            <div className={`absolute w-full top-16 rounded-md p-3 bg-custom-white-100 duration-200 ${active ? `scale-y-100` : `scale-y-0`}`}>
                <CurrentInput change={HandelChange} label="Buscar" required={false} type="text" value={param} />
                {
                    load
                        ? <LoadingSm />
                        : list
                            ? list.map(item => (
                                <CurrentButtom click={() => SettingIdForInput(item)} text={item.name} customClass="w-full py-2 border-b hover:bg-custom-white font-bold text-sm" />
                            ))
                            : <p>no hay resultados</p>
                }
            </div>
        </div>
        </>
    )
}
