import { useEffect, useState } from "react";
import Button from "../_atom/Button";
import Text from "../_atom/Text";
import { API } from "../../entorno";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import { Icono } from "../../_handler/IconHandler";
import { Select } from "../../types/gui/FromInterface";

interface Props {
    change: ({ name, value }: { name: string, value: string }) => void;

    downText?: string;

    select: Select;

    query?: string

}

export default function LabelSelect({ change, select,query }: Props) {

    const [selectActive, setSelectActive] = useState(false);
    const [list, setList] = useState<{ id: string, label: string }[]>([]);
    const [param, setParam] = useState(``);
    const [loadSelect, setLoadSelect] = useState(true);
    const [label, setLabel] = useState(select.label);

    useEffect(() => {
        setLoadSelect(true);
        const Execute = async () => {
            const url = `${API}/select/${select.selectIn}/?param=${param ? param : ``}${query ? `&${query}` : ``}`;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const json = await result.json();
            setList(json.list);
            setLoadSelect(false);
        }
        Execute();
    }, [param, query]);

    const HandleChange = ({ name,value,label }: { name:string,value:string,label:string }) => {
        setLabel(label);
        setSelectActive(false);
        change({ name, value });
    }

    return (
        <label className="form-control w-full relative">
            <div className="label">
                <Text customClass="label-text text-lg font-semibold" text={select.label} />
            </div>

            <Button click={() => setSelectActive(!selectActive)} customClass="py-1 input w-full border border-slate-400 flex justify-center items-center h-full" ico={Icono({ ico: `student` })} text={label} />
            <ul className={`z-10 absolute w-full overflow-y-auto bg-white border rounded-b-xl top-[70px] p-1 duration-300 ${selectActive ? `scale-1 max-h-52` : `scale-0 h-0`}`}>
                <input value={param} onChange={(e) => setParam(e.target.value)} placeholder="Escriba para buscar" className="outline-none border border-slate-400 w-full rounded p-2" name="search" type="text" />
                {
                    loadSelect
                        ? <>loadSelect</>
                        : list
                            ? list.map((item) => (
                                <Button
                                    click={() => HandleChange({ name:select.name,value:item.id,label:item.label })}
                                    customClass="w-full py-1 text-center text-xs font-bold"
                                    text={item.label}
                                />
                            ))
                            : <>no hay resultados</>
                }
            </ul>

            <div className="label">
                {/* <Text customClass="label-text-alt" text={downText ? downText : ``} /> */}
                {/* <span className="label-text-alt">Bottom Right label</span> */}
            </div>
        </label>
    )
}
