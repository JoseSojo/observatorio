import { useEffect, useState } from "react";
import { useStaticthis } from "../../../_hooks/gui/admin/useStaticthis";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { BaseStatictics } from "../../../config/interface/statictics/StaticticsInterface";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export function LineChartContent({ listMonth,listYear,listEvent,initId,initMonth,initYear,initType,event }: BaseStatictics) {
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<string[] | null>(null);
    const [events, setEvents] = useState(event);
    const [title, setTitle] = useState(``);
    const [id, setId] = useState<string>(initId);
    const [year, setYear] = useState<number>(initYear);
    const [month, setMonth] = useState<number>(initMonth);

    const { Execute } = useStaticthis({ type:initType, month, year, event: events, itemId: id });

    useEffect(() => {
        const ExecuteAsync = async () => {
            const { label, result, title, type } = await Execute();
            setTitle(title);
            setValues(result);
            setLabels(label);

        }
        ExecuteAsync();
    }, [events,year,month]);

    const currentData: any = {
        labels: labels,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: title,
                data: values,
                tension: 0.5,
                fill: true,
                backgroundColor: `#028288`,
                pointRadius: 5,
            }

        ],
    };

    const currentOptions = {
        scales: {
            y: {
                min: 0
            },
            x: {
                ticks: { color: `#515559` }
            }
        }
    };

    return (
        <div className="p-3 bg-custom-white-100 border-9 w-full rounded-lg shadow max-h-[400px]">
            <header className="flex justify-between items-center">
                <h3 className="text-sm font-black text-gray-700">{title}</h3>
                {
                    listEvent && listEvent.length > 0 && 
                    <select onChange={(e)=>setEvents(e.target.value)} className="p-1 text-xs border border-primary outline-none rounded-md">
                        <option value={``} selected>selecciona una acción</option>
                        {
                            listEvent.map((item) => (
                                <option value={item.objectName}>{item.label}</option>
                            ))
                        }
                    </select> 
                }
                {
                    listMonth && listMonth.length && 
                    <select onChange={(e)=>setMonth(Number(e.target.value))} className="p-1 text-xs border border-primary outline-none rounded-md">
                        <option value={``} selected>selecciona un mes</option>
                        {
                            listMonth.map((item,i) => (
                                <option value={i+1}>{item.label}</option>
                            ))
                        }
                    </select>
                }
                {
                    listYear && listYear.length && 
                    <select onChange={(e)=>setYear(Number(e.target.value))} className="p-1 text-xs border border-primary outline-none rounded-md">
                        <option value={``} selected>selecciona un año</option>
                        {
                            listYear.map((item) => (
                                <option value={item}>{item}</option>
                            ))
                        }
                    </select>
                }
            </header>
            <Line data={currentData} options={currentOptions} />
        </div>
    );
}