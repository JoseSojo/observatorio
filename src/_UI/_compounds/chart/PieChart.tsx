import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BaseStaticticsPie } from "../../../config/interface/statictics/StaticticsInterface";
import { PieStatic } from "../../../service/statictics/PieStatictics";
ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChartContent({ name }: BaseStaticticsPie) {
    const [labels, setLabels] = useState<string[]>([]);
    const [title, setTitle] = useState<string | null>(null);
    const [values, setValues] = useState<number[] | null>(null);

    useEffect(() => {
        const ExecuteAsync = async () => {
            const pieResult = await PieStatic({ param: name });
            setLabels(pieResult.label);
            setValues(pieResult.value);
            setTitle(pieResult.title);
        }
        ExecuteAsync();
    }, []);


    const data = {
        labels,
        datasets: [
            {
                label: '# of Votes',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="p-3 bg-custom-white-100 border-9 w-full rounded-lg shadow max-h-[400px] flex flex-col justify-center items-center py-5">
            <header className="flex justify-between items-center">
                <h3 className="text-sm font-black text-gray-700">{title}</h3>

            </header>
            {/* <Doughnut data={CurrentData} options={CurrentOptions} className="w-11" style={{ width: 550, height: 400 }} /> */}
            <Doughnut data={data} />
        </div>
    );
}