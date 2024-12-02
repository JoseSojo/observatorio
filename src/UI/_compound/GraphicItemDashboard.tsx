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
                label: '',
                data: item.value,
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
