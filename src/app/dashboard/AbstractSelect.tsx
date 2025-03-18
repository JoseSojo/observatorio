import { useEffect, useState } from "react";
import { Select } from "../../types/gui/FromInterface";
import Button from "../../UI/_atom/Button";
// import { Icono } from "../../_handler/IconHandler";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import { API } from "../../entorno";
import Input from "../../UI/_atom/Input";

interface Props {
    item: Select;
    change: ({name,value}:{name:string,value:string}) => void
}

export default function AbstractSelect({item,change}: Props) {

    const [label, setLabel] =useState(item.label);
    const [selectActive, setSelectActive] = useState(false);
    const [list, setList] = useState<{id:string,label:string}[]>([]);
    const [param, setParam] = useState(``);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        setLoad(true);
        const Execute = async () => {
            const url = `${API}/select/${item.name}/?param=${param ? param : ``}`;
            const req = RequestOptionsGetToken({ method:`GET` });
            const result = await fetch(url, req);
            const json = await result.json();
            setList(json.list);
            setLoad(false);
        }
        Execute();
    }, [param]); 

    const HandleChange = ({id,label}:{id:string,label:string}) => {
        change({ name:item.name,value:id });
        setLabel(label);
        setSelectActive(false);
    }

    return (
        <div className="relative">
            <Button click={()=>setSelectActive(!selectActive)} customClass="select select-sm w-full flex justify-center items-center h-full border border-slate-400 gap-3 rounded-lg" text={label} />
            <ul className={`absolute z-50 w-full bg-white border rounded-b-xl top-10 p-1 duration-300 overflow-y-visible ${selectActive ? `scale-1 max-h-52` : `scale-0 h-0`}`}>
                <Input change={(e) => setParam(e.value)} placeholder="Escriba para buscar" customClass="outline-none border border-slate-400 w-full rounded p-2" name="search" type="text" />
                {
                    load
                    ?   <>load</>
                    :   list 
                    ?   list.map((item) => (
                        <Button click={() => HandleChange(item)} customClass="w-full py-1 text-center text-xs font-bold" text={item.label} />
                        // <li className={`p-2 rounded text-xs duration-200 w-full`}>
                        //     {item.label}
                        // </li>
                    ))
                    : <>no hay resultados</>
                }
        </ul>
        </div>
    );
}
