import { useEffect, useState } from "react";
import { Graphic } from "../UI/_organism/DashboardGraphic";
import { API } from "../entorno";
import { RequestOptionsGetToken } from "../utils/req/RequetsOptions";
import GraphicItemDashboard from "../UI/_compound/GraphicItemDashboard";

export default function Analysis() {

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {
                graphic &&
                graphic.map((grp) => (
                    <GraphicItemDashboard item={grp} />
                ))
            }
        </div>
    );
}
