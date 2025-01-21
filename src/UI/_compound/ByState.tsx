// import { Graphic } from "../_organism/DashboardGraphic";
import { useEffect, useState } from "react";
import { API } from "../../entorno";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement, PointElement, LineElement } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement, PointElement, LineElement);



interface Props {
}

export default function GraphicByState({ }: Props) {
    // const [graphic, setGraphic] = useState<Graphic | null>(null);
    // const [hombre, setHombre] = useState<number[] | null>(null);
    // const [todos, setTodos] = useState<number[] | null>(null);
    // const [mujer, setMujer] = useState<number[] | null>(null);
    const [label, setLabel] = useState<string[] | null>(null);
    const [data, setData] = useState<any | null>(null)

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/gui/states`;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const json = await result.json() as any;
            setLabel(json.label);
            setData(json.data);   
            
            console.log(json.data);
        }
        Execute();
    }, [])

    
    return (
        <div className="col-span-2 rounded-lg bg-white flex-1 flex justify-center items-center flex-col relative">
            <div className="p-3 bg-custom-white-100 border-9 w-full rounded-lg shadow max-h-[400px] flex flex-col justify-center items-center py-5">
                <header className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-gray-700">Distribución por estados</h3>
                </header>
                <Bar data={{
                    labels: label ? label : [],
                    datasets: data ? data : []
                }} style={{ fontSize:6 }} />
            </div>
        </div>
    )
}
