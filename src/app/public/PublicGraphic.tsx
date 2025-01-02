import { useEffect, useState } from "react"
import { API } from "../../entorno";
import { Graphic } from "../../UI/_organism/DashboardGraphic";
import GraphicItemDashboard from "../../UI/_compound/GraphicItemDashboard";

export default function PublicGraphic () {

    const [graphic, setGraphic] = useState<Graphic[] | null>(null);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/public/gui/graphic/`;
            const result = await fetch(url);
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
