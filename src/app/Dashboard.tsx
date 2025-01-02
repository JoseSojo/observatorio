import CompletedDataUser from "../UI/_organism/CompletedDataUser";
import DashboardCards from "../UI/_organism/DashboardCards";
import DashboardGraphic from "../UI/_organism/DashboardGraphic";
import { getUser } from "../utils/token copy";
import AbstractStatictics from "./dashboard/AbstracStatictics";

export default function Dashboard() {

    const user = JSON.parse(getUser()) as any;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {
                user.rolReference.name === `OBRERO_ADMINISTRATIVO` || user.rolReference.name === `DOCENTE`
                    ? <CompletedDataUser />
                    : <>
                        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-row w-full gap-3">
                            <DashboardCards />
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-row w-full gap-3 ">
                            <DashboardGraphic />
                        </div>
                        <AbstractStatictics crud={`dashboard`} />
                    </>
            }
        </div>
    )
}
