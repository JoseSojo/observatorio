import DashboardCards from "../UI/_organism/DashboardCards";
import DashboardGraphic from "../UI/_organism/DashboardGraphic";

export default function Dashboard () {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-row w-full gap-3">
                <DashboardCards />
            </div>
            <DashboardGraphic />
        </div>
    )
}
