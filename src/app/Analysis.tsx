import { useEffect, useState } from "react";
import { Graphic } from "../UI/_organism/DashboardGraphic";
import { API } from "../entorno";
import { RequestOptionsGetToken } from "../utils/req/RequetsOptions";
import GraphicItemDashboard from "../UI/_compound/GraphicItemDashboard";
import AbstractStatictics from "./dashboard/AbstracStatictics";

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

    /**
     * FINS STATICTICS CENTURY
     */

    return (
        <div className="grid gap-4">
            <div className="gap-3 grid lg:grid-cols-3">
                {
                    graphic &&
                    graphic.map((grp) => (
                        <GraphicItemDashboard item={grp} />
                    ))
                }
                <div className="grid grid-cols-1 lg:col-span-3 gap-3 mt-3">
                    <AbstractStatictics crud={`analysis`} />

                    {/* <StaticticsCentury statictics={{ path:`/statictics/projects/century`, title:`Estadisticas` }} /> */}
                </div>
            </div>
        </div>
    );
}
