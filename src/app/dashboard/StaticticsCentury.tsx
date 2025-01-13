import { useEffect, useState } from "react";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import { API } from "../../entorno";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement, PointElement, LineElement } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement, PointElement, LineElement);

interface Props {
    statictics: { path: string, title: string };
}

export default function StaticticsCentury({ statictics }: Props) {

    const [header, setHeader] = useState<string[] | null>(null);
    const [value, setValue] = useState<{label:string,value:any[]}[] | null>(null);
    const [title, setTitle] = useState(``);

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}${statictics.path}`;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const json = await result.json() as { header: string[], value: {label:string,value:any[]}[], title: string, filter: any | null };
            setHeader(json.header);
            setValue(json.value);
            setTitle(json.title);
        }
        ExecuteRequets();
    }, [])

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

    return (
        <div className="bg-white p-3 bg-custom-white-100 border-9 w-full rounded-lg shadow max-h-[400px] flex flex-col justify-center items-center py-5">
            <header className="flex justify-between items-center">
                <h3 className="text-sm font-black text-gray-700">{title}</h3>
            </header>
            <Bar data={{
                xLabels: header ? header : [],
                datasets: value ? value.map((item,i) => { 
                    return {
                        data:item.value,
                        backgroundColor: colors[i],
                    }
                }) : [],
            }} />
        </div>
    )
}
