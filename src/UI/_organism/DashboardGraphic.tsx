import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import { API } from "../../entorno";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import GraphicItemDashboard from "../_compound/GraphicItemDashboard";

ChartJS.register(ArcElement, Tooltip, Legend);



export interface Graphic {
    label:      string[];
    value:      number[];
}


export default function DashboardGraphic () {

    const [graphic, setGraphic] = useState<Graphic[] | null>(null);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/gui/graphic`;
            const req = RequestOptionsGetToken({ method:`GET` });
            const result = await fetch(url, req);
            const json = await result.json() as Graphic[];
            setGraphic(json);
        }
        Execute();
    }, [])

    

    return (
        <>
            {
                graphic &&
                graphic.map((grp) => (
                    <GraphicItemDashboard item={grp} />
                ))
            }
        </>
    )
}
