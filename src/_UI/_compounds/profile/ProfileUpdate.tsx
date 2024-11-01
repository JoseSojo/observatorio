
import { ProfilePageInterface } from "../../../config/interface/profile/ProfileInterface";
import { GenericForm } from "../_master/GenericForm";
import { CardDataProfile } from "../card/CardDataProfile";

interface Props {
    data: ProfilePageInterface
}

export function ProfileSectionUpdate ({data}: Props) {

    return (
        <div className="grid grid-cols-3 gap-5">
            <CardDataProfile data={data} now="show" />
            <div className="col-span-2 bg-custom-white-100 rounded-md px-3 py-5">
                <GenericForm text="crear" action="/gui/profile/form/update" />
            </div>
        </div>
    )
}
