import { useEffect, useState } from "react";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import { API } from "../../entorno";
import ExtractValue from "../../utils/ExtractValue";
import { ActionCrudInterface } from "../../types/gui/CrudInterface";
import Button from "../../UI/_atom/Button";
import { Icono } from "../../_handler/IconHandler";
import { useLocation } from "react-router-dom";

interface Props {
    path: string;
    header: string[];
    actions: ActionCrudInterface[];
    onAction: ({ ico, label, path, use, id }: ActionCrudInterface) => void;
    reload?: boolean;
    loadReload?: () => void;
    superUrl?: string
}

export default function AbstractList({ header, path, actions, onAction, reload,superUrl }: Props) {

    const location = useLocation();
    const [list, setList] = useState<any[]>([]);
    const [dataList, setDataList] = useState<string[]>([]);

    // const [count, setCount] = useState(0);
    const [now, setNow] = useState(0);
    const [next, setNext] = useState(false);
    const [previws, setPreviws] = useState(false);

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(10);

    useEffect(() => {
        const Execute = async () => {
            setTake(take);
            const url = superUrl ? superUrl : `${API}${path}/?skip=${skip}&take=${take}`;
            const req = RequestOptionsGetToken({ method: `GET` });

            const result = await fetch(url, req);
            const jsonPromise = result.json();
            if (!result.ok) {
                const jsonError = await jsonPromise;
                return jsonError
            }

            setList([]);

            const json = await jsonPromise;
            setList(json.body.list);
            setNow(json.body.now);
            setNext(json.body.next ? true : false);
            setPreviws(json.body.previous ? true : false);
            setDataList(json.body.dataList);
        }
        Execute();
    }, [reload, location.pathname, skip, take]);

    return (
        <>
            <table className="w-full mt-3 table-xs border">
                <thead>
                    <tr className="bg-slate-900 rounded-t-xl">
                        {actions && actions.length > 0 && <td className="border border-slate-900"></td>}
                        {
                            header.map((item) => (
                                <td className="border border-slate-900 text-center text-xs font-black py-2 text-white">{item}</td>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {

                        list.map((item) => (
                            <tr>
                                {actions && actions.length > 0 && <td className="border border-slate-900">
                                    <details className="dropdown">
                                        <summary className="btn m-1 btn-xs text-xl">{Icono({ ico: `optionH` })}</summary>
                                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                            {
                                                actions.map((ac) => (
                                                    <li>
                                                        <Button
                                                            click={() => onAction({ ...ac, path: `${ac.path}${item.id}`, id: item.id })}
                                                            ico={Icono({ ico: ac.ico })}
                                                            text={ac.label}
                                                        />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </details>
                                </td>}
                                {
                                    dataList.map(extract => (
                                        <td className="text-sm font-semibold border border-slate-900">{ExtractValue({ extractBy: extract, item })}</td>
                                    ))
                                }

                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="flex justify-end mt-2">
                <div className="join">
                    <Button click={()=>{
                        if(previws) setSkip(skip-take)
                    }} customClass={`join-item btn ${previws ? `bg-slate-200 hover:bg-slate-400` : `bg-slate-200 hover:bg-slate-200`}`} text="«" />
                    <span className={`join-item btn bg-slate-200 hover:bg-slate-200`}>{now}</span>
                    <Button click={()=>{
                        if(next) setSkip(skip+take)
                    }} customClass={`join-item btn ${next ? `bg-slate-200 hover:bg-slate-400` : `bg-slate-200 hover:bg-slate-200`}`} text="»" />
                </div>
            </div>

        </>
    )
}
