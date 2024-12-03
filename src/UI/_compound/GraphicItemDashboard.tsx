import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Graphic } from "../_organism/DashboardGraphic";

ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
    item: Graphic
}

export default function GraphicItemDashboard({ item }: Props) {

    const data = {
        labels: item.label,
        datasets: [
            {
                label: 'Totalidad',
                data: item.value,
                backgroundColor: [
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
                ],
                borderColor: '#eff6ff',
                borderWidth: 1,
            },
        ],
    }
    
    return (
        <div className="col-span-2 rounded-lg bg-white flex-1 flex justify-center items-center flex-col relative">
            <div className="p-3 bg-custom-white-100 border-9 w-full rounded-lg shadow max-h-[400px] flex flex-col justify-center items-center py-5">
                <header className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-gray-700">Gráfico</h3>
                </header>
                <Pie data={data} />
            </div>
        </div>
    )
}
