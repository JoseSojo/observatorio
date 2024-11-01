import { ProfilePageInterface } from "../../../config/interface/profile/ProfileInterface";
import { GetIcon } from "../../_icons/IconsHandle";
import { CurrentLink } from "../../_atoms/CurrentLink";
import { CurrentButtom } from "../../_atoms/CurrentButton";

interface Props {
    data: ProfilePageInterface;
    now: `show` | `password` | `security` | `photo`;
}


export function CardDataProfile({data,now}: Props) {

    const clsLi = `py-2 flex justify-center items-center rounded-md bg-primary text-custom-white`;

    return (
        <div className="col-span-1 bg-custom-white-100 rounded-md px-3 py-5">
            <div className="flex flex-col gap-3">
                <div className="w-[140px] h-[140px] m-auto bg-custom-white rounded-full"></div>
                <p className="p-3 w-[70%] m-auto border-b border-custom-white pb-1 text-center">{data.header.fullname}</p>
                <div className="p-1 w-[50%] m-auto rounded-rounded-20 text-primary text-center border border-primary text-xs font-bold ">{data.header.rol}</div>
                <div className="grid w-[70%] m-auto grid-cols-4 gap-3 place-content-center">
                    {
                        data.header.actions.map((item) => {
                            const ico = GetIcon(item.ico);
                            // if(item.name == now) return (
                            //     <CurrentButtom click={() => {}} ico={ico} customClass={clsLi}></CurrentButtom>
                            // )
                            return (
                                <CurrentLink
                                    path={`${item.path}`}
                                    ico={ico}
                                    customClass={`${clsLi} hover:bg-primary-100`}
                                ></CurrentLink>
                            )
                        })
                    }
                </div>

                {/* DETAILS */}

            </div>
        </div>
    )
}
