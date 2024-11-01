
import { ProfilePageInterface } from "../../../config/interface/profile/ProfileInterface";
import { GetUser } from "../../../config/util/UserStorage";
import { CardDataProfile } from "../card/CardDataProfile";
import { LineChartContent } from "../chart/LineChart";
import { UniqueHistoryObject } from "../crud/Unique/History";

interface Props {
    data: ProfilePageInterface
}

export function ProfileSectionShow ({data}: Props) {

    const user = GetUser();

    return (
        <div className="grid grid-cols-3 gap-5">
            <CardDataProfile data={data} now="show" />
            <div className="col-span-2 bg-custom-white-100 rounded-md px-3 py-5">
                <UniqueHistoryObject object={user.id} />
            </div>
            <div className="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-5">
                {
                    data.statictics && data.statictics.map(item => (
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
    )
}
