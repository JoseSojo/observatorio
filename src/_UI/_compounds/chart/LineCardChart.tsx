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
import { BaseStaticticsCard } from "../../../config/interface/statictics/StaticticsInterface";

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

export function LineCardChart({ initType, event }: BaseStaticticsCard) {
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<string[] | null>(null);
    const [title, setTitle] = useState(``);

    const { Execute } = useStaticthis({ type:initType, event });

    useEffect(() => {
        const ExecuteAsync = async () => {
            const { label, result, title, type } = await Execute();
            setTitle(title);
            setValues(result);
            setLabels(label);

        }
        ExecuteAsync();
    }, []);

    const currentData: any = {
        labels: labels,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: title,
                data: values,
                tension: 0.5,
                fill: true,
                backgroundColor: `#72BF78`,
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
                ticks: { color: `#50ad56` }
            }
        }
    };

    return (
        <div className="p-3 bg-custom-white-100 border-9 w-full rounded-lg shadow max-h-[400px]">
            <Line data={currentData} options={currentOptions} />
        </div>
    );
}