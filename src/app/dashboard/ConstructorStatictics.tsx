import { useEffect, useState } from "react";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import { API } from "../../entorno";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement, PointElement, LineElement } from 'chart.js';
import { Bar } from "react-chartjs-2";
import Text from "../../UI/_atom/Text";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement, PointElement, LineElement);

interface Props {
    statictics: { path: string, label: string, title: string };
}

export default function ConstructorStatictics({ statictics }: Props) {

    const [data, setData] = useState<any>(null);
    const [header, setHeader] = useState<string[] | null>(null);
    const [value, setValue] = useState<{label:string,value:any[]}[] | null>(null);
    const [title, setTitle] = useState(``);
    const [filter, setFilter] = useState<any[] | null>(null);
    const [filterName, setFilterName] = useState<`month` | `year`>(`month`);

    const [customFilter, setCustomFilter] = useState<{ month?: string, year?: string } | null>(null);

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}${statictics.path}`;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const json = await result.json() as { header: string[], value: string[], title: string, filter: any | null, filterName: `month` | `year` | null };
            setTitle(json.title);
            if (json.filter) setFilter(json.filter);
            if (json.filterName) setFilterName(json.filterName);
        }
        ExecuteRequets();
    }, [])

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}${statictics.path}&month=${customFilter && customFilter.month ? customFilter.month : ``}&year=${customFilter && customFilter.year ? customFilter.year : ``}`;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const json = await result.json() as { header: string[], value: {label:string,value:any[]}[], title: string, filter: any | null };
            setHeader(json.header);
            setValue(json.value);
        }
        ExecuteRequets();
    }, [customFilter, customFilter?.month, customFilter?.year])

    const colors = [
        '#0ea5e9',
        '#0284c7',
        '#3b82f6',
        '#2563eb',
        '#0369a1',
        '#1d4ed8',
        '#075985',
        '#1e40af',
        '#0c4a6e',
        '#1e3a8a'
    ]
    // {
    //     label: 'Totalidad',
    //     data: value,
    //     backgroundColor: ,
    //     borderColor: '#eff6ff',
    //     borderWidth: 2,
    // }

    useEffect(() => {
        const data: any = {
            labels: header,
            datasets: value ? value.map((item,i) => { 
                return {
                    label:item.label,
                    data:item.value,
                    backgroundColor: colors[i],
                }
            }) : [],
        }
        setData(data);
    }, [value])

    

    return (
        <div className="bg-white p-3 bg-custom-white-100 border-9 w-full rounded-lg shadow max-h-[400px] flex flex-col justify-center items-center py-5">
            <header className="flex justify-between items-center">
                <h3 className="text-sm font-black text-gray-700">{title}</h3>
            </header>
            {
                filter &&
                <div className="flex justify-between items-center gap-3">
                    <Text customClass="text-sm text-gray-600" text={`Filtros`} />
                    <ul>
                        <li>
                            <select
                                onChange={(e) => {
                                    setCustomFilter({ ...customFilter, [filterName]: e.target.value });
                                }}
                                className="select select-xs border-slate-600"
                            >
                                <option selected></option>
                                {
                                    filter.map(fl => (
                                        <option value={fl.id}>{fl.label}</option>
                                    ))
                                }
                            </select>
                        </li>
                    </ul>
                </div>
            }
            { data && <Bar data={data} /> }
        </div>
    )
}
