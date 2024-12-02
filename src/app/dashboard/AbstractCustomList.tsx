import { useEffect, useState } from "react";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import ExtractValue from "../../utils/ExtractValue";
import Button from "../../UI/_atom/Button";

interface Props {
    url: string
}

export default function AbstractCustomList({ url }: Props) {

    const [list, setList] = useState<any[]>([]);
    const [dataList, setDataList] = useState<string[]>([]);
    const [header, setHeader] = useState<string[] | null>(null);

    // const [count, setCount] = useState(0);
    const [now, setNow] = useState(0);
    const [next, setNext] = useState(false);
    const [previws, setPreviws] = useState(false);

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(10);

    useEffect(() => {
        const Execute = async () => {
            setTake(take);
            const req = RequestOptionsGetToken({ method: `GET` });

            const result = await fetch(url, req);
            const jsonPromise = result.json();
            if (!result.ok) {
                const jsonError = await jsonPromise;
                return jsonError
            }

            setList([]);

            const json = await jsonPromise;
            console.log(json);
            setList(json.body.list);
            setHeader(json.body.header);
            // setCount(Number(json.body.count));
            setNow(json.body.now);
            setNext(json.body.next ? true : false);
            setPreviws(json.body.previous ? true : false);
            setDataList(json.body.dataList);
        }
        Execute();
    }, [skip, take]);

    return (
        <>
            <table className="w-full mt-3 table-xs border">
                <thead>
                    <tr className="bg-slate-900 rounded-t-xl">
                        {
                            header && header.map((item) => (
                                <td className="border border-slate-900 text-center text-xs font-black py-1 text-white">{item}</td>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {

                        list.map((item) => (
                            <tr>
                                {
                                    dataList.map(extract => (
                                        <td className="text-xs font-semibold border border-slate-900">{ExtractValue({ extractBy: extract, item })}</td>
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
