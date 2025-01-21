import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Graphic } from "../_organism/DashboardGraphic";
import { useModal } from "../../_context/ModalContext";
import Button from "../_atom/Button";
import ModalGraphicItem from "./ModalGraphicItem";
import { Icono } from "../../_handler/IconHandler";

ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
    item: Graphic
}

export default function GraphicItemDashboard({ item }: Props) {

    const modal = useModal();

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
                borderWidth: 2,
            },
        ],
    }

    const OnModal = () => {
        modal.show(<ModalGraphicItem data={data} />);        
        return;
    }
    
    return (
        <div className="rounded-lg bg-white flex-1 flex justify-center items-center flex-col relative">
            <Button
                click={() => OnModal()}
                // text="ver"
                ico={Icono({ico:`optionsV`})}
                customClass="btn btn-sm text-2xl bg-sky-700 hover:bg-sky-800 text-white absolute top-3 right-3"
            />
            <div className="p-3 bg-custom-white-100 border-9 w-full rounded-lg shadow max-h-[400px] flex flex-col justify-center items-center py-5">
                <header className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-gray-700">{item.title}</h3>
                </header>
                <Pie data={data} options={{ maintainAspectRatio: false,animation:true }} style={{ fontSize:6 }} />
            </div>
        </div>
    )
}
