
import { useEffect, useState } from "react";
import { ContainerCardDashboard } from "../../_UI/_compounds/admin/Card";
import { useDashboardGui } from "../../_context//ui/DashboardContext";
import { LineChartContent } from "../../_UI/_compounds/chart/LineChart";
import { useStaticthisFound } from "../../_hooks/gui/admin/useStaticthisFound";
import { BaseStatictics } from "../../config/interface/statictics/StaticticsInterface";

interface Props {
}

export default function Dashboard({} : Props) {
    const [load, setLoad] = useState(true);
    const [listStatictics, setListStatictics] = useState<BaseStatictics[] | null>(null);
    const { error, currentCoutn } = useDashboardGui();
    const { Execute } = useStaticthisFound({ object:`application` });

    useEffect(() => {
        if(currentCoutn) setLoad(false);
        const AsyncFN = async () => {
            const list = await Execute();
            setListStatictics(list);
        }
        AsyncFN();
    }, []);

    return (
        <div>
            <ContainerCardDashboard cards={currentCoutn} uiLoad={load} uierror={error} />

            <div className="grid grid-cols-1 lg:grid-cols-2 p-0 w-full mb-3 gap-3">
                {
                    listStatictics && listStatictics.map(item => (
                        <LineChartContent 
                            event={item.event} 
                            initId={item.initId} 
                            initMonth={item.initMonth} 
                            initType={item.initType} 
                            initYear={item.initYear}
                            listEvent={item.listEvent}
                            listMonth={item.listMonth}
                            listYear={item.listYear}
                            />
                    ))
                }

            </div>
        </div>
    );
}