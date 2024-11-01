import { CurrentLi } from "../../../_UI/_atoms/CurrentLi";
import { GetIcon } from "../../../_UI/_icons/IconsHandle";
import { GroupAction, ListCustomAction } from "../../../config/interface/admin/SlideInterface";
import { LiDropdown } from "../LiDropdown";
import { CurrentButtom } from "../../../_UI/_atoms/CurrentButton";
import { useDashboardGui } from "../../../_context//ui/DashboardContext";
import { CurrentLink } from "../../_atoms/CurrentLink";

interface Props {
    list: ListCustomAction[];
    active: boolean;
    close: () => void
}

export function Slide({ close, active }: Props) {

    const { currentAction } = useDashboardGui();

    const clsLi = "group hover:bg-primary-200 duration-200 rounded-sm p-2 px-4 w-full flex justify-between items-center gap-5";

    return (
        <ul className="flex flex-col gap-y-3 px-3 py-5 relative h-full">
            <CurrentLink customClass="" path={`/`}>
                <CurrentLi customClass={clsLi}>
                    <span className={`${!active && `block lg:hidden`} duration-500 lg:block text-custom-white-100 font-bold text-sm rounded-rounded-7 flex-[4] w-full`}>Panel</span>
                    <span className="bg-primary-200 rounded-rounded-7 flex-1 py-1 px-2 lg:px-0 text-lg w-full text-custom-white-100 flex justify-center items-center">
                        {GetIcon(`dashboard`)}
                    </span>
                </CurrentLi>
            </CurrentLink>
            <CurrentButtom click={close} text="cerrar" ico={``} customClass={`lg:hidden font-bold text-sm text-custom-white hover:bg-primary-200 duration-200 bg-primary rounded-sm p-2 px-4 w-full flex justify-center`} />
            {
                currentAction.map((li) => {
                    const ico = GetIcon(li.ico);

                    const current = li as any;
                    if (current && current.child && current.child.length > 0) {
                        const current2 = li as GroupAction;
                        return <LiDropdown active={active} child={current2.child} customClass={clsLi} ico={current2.ico} name={current2.name}>
                            {
                                current2.child.map((item) => {
                                    const ico = GetIcon(item.ico);

                                    return (
                                        <CurrentLink customClass="" path={item.path}>
                                            <CurrentLi customClass={`${clsLi} bg-primary-200`}>
                                                <span className="text-custom-white-100 font-bold text-sm rounded-rounded-7 flex-[4] w-full">{item.name}</span>
                                                <span className="bg-primary-200 rounded-rounded-7 flex-1 py-1 px-3 lg:px-0 text-lg w-full text-custom-white-100 flex justify-center items-center">
                                                    {ico}
                                                </span>
                                            </CurrentLi>
                                        </CurrentLink>
                                    )
                                })
                            }
                        </LiDropdown>
                    }

                    return (
                        <CurrentLink customClass="" path={li.path}>
                            <CurrentLi customClass={clsLi}>
                                <span className={`${!active && `block lg:hidden`} duration-500 lg:block text-custom-white-100 font-bold text-sm rounded-rounded-7 flex-[4] w-full`}>{li.name}</span>
                                <span className="bg-primary-200 rounded-rounded-7 flex-1 py-1 px-2 lg:px-0 text-lg w-full text-custom-white-100 flex justify-center items-center">
                                    {ico}
                                </span>
                            </CurrentLi>
                        </CurrentLink>
                    )
                })
            }
        </ul>
    );

};
