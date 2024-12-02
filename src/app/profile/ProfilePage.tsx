import { getUser } from "../../utils/token copy";
import AbstractUpdate from "../dashboard/AbstractUpdate";

export default function ProfilePage () {

    const user = JSON.parse(getUser());

    return (
        <div className="grid grid-cols-[250px_1fr] gap-10">
            <div className="h-full flex justify-center items-start">
                <div className="rounded-full w-[200px] h-[200px] bg-slate-100 shadow-lg shadow-slate-900"></div>
            </div>
            <div>
                {/* <Subtitle customClass="text-2xl font-bold" text="Actualizar datos" /> */}
                <AbstractUpdate crud="user" item={{ ico:`update`,label:`Actualizar usuario`, path:`/${user.id}`, use:`page` }} reload={() => {}} />
            </div>            
        </div>
    )
}
