import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarController,BarElement,PointElement,LineElement } from 'chart.js';
import { useModal } from "../../_context/ModalContext";
import Button from "../_atom/Button";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,BarController,BarElement,PointElement,LineElement);


interface Props {
    data: any
}

type TYPE_GRAPHIC = `PIE` | `BAR` | `CIRCLE` | `Doughnut` | `LINE`;

export default function ModalGraphicItem({ data }: Props) {

    const [type, setType] = useState<TYPE_GRAPHIC>(`PIE`);

    const modal = useModal();

    return (
        <div className="col-span-2 rounded-lg bg-white flex-1 flex justify-center items-center flex-col relative">
            <div className="absolute top-3 right-3 flex gap-5">
                <select
                    onChange={(e) => {
                        const type = e.target.value as TYPE_GRAPHIC;
                        setType(type);
                    }}
                    className="btn btn-sm bg-sky-700 hover:bg-sky-800 text-white outline-none"
                >
                    <option value={`PIE`} selected>Pie</option>
                    <option value={`BAR`}>Barras</option>
                    <option value={`Doughnut`}>Dona</option>
                    <option value={`LINE`}>Línea</option>
                </select>
                <Button
                    click={() => modal.hidden()}
                    text="cerrar"
                    customClass="btn btn-sm bg-sky-700 hover:bg-sky-800 text-white "
                />
            </div>
            <div className="p-3 bg-custom-white-100 border-9 w-full rounded-lg shadow max-h-[400px] flex flex-col justify-center items-center py-5">
                <header className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-gray-700">Gráfico</h3>
                </header>
                {
                    type === "PIE" ? <Pie data={data} />
                    : type === "Doughnut" ? <Doughnut data={data} />
                    : type === "BAR" ? <Bar data={data} />
                    : type === `LINE` ? <Line data={data}  />
                    : <Pie data={data} />
                }
                
            </div>
        </div>
    )
}
