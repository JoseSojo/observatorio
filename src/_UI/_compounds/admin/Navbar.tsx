import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDashboardGui } from "../../../_context//ui/DashboardContext";
import { CurrentButtom } from "../../../_UI/_atoms/CurrentButton";
import { CurrentLi } from "../../../_UI/_atoms/CurrentLi";
import { CurrentLink } from "../../../_UI/_atoms/CurrentLink";
import { NavbarListGhost } from "../../../_UI/_ghost/NavbarLiGhost";
import { GetIcon } from "../../../_UI/_icons/IconsHandle";
import { Badge } from "../global/Badge";
import { LiDropdown } from "../LiDropdown";
import { GroupAction } from "../../../config/interface/admin/SlideInterface";
import { CustomNavbar } from "../../../config/interface/admin/NavbarInterface";

interface Props {
    activeSlide: boolean;
    setActiveSlide: Dispatch<SetStateAction<boolean>>;
}

export function Navbar({ activeSlide, setActiveSlide }: Props) {

    const [load, setLoad] = useState(true);
    const { itemsNav, error } = useDashboardGui();

    useEffect(() => {
        if (itemsNav) setLoad(false)
    }, [itemsNav])

    const logoutIco = GetIcon(`logout`);

    return (
        <nav className="flex items-center justify-between px-5 py-2 bg-custom-white-100 shadow">
            <CurrentButtom text="" click={() => setActiveSlide(!activeSlide)} customClass="text-2xl hover:bg-primary rounded-rounded-20 font-bold p-1 duration-500 hover:text-custom-white-100" ico={GetIcon(`main`)} />
            <h2 className="font-black text-md">Admin</h2>

            <ul className="flex gap-5">
                <LogicNavbar error={error} itemsNav={itemsNav} load={load} logoutIco={logoutIco} />
            </ul>
        </nav>
    )
}

interface PropsLogic {
    load: boolean;
    error: boolean;
    itemsNav: CustomNavbar[];
    logoutIco: any
}

function LogicNavbar({load,error,itemsNav,logoutIco }: PropsLogic) {

    const clsLi = "group duration-200 bg-primary rounded-sm p-2 px-4 w-full flex justify-between items-center gap-5";
    const navLi = "group duration-200 rounded-sm p-2 px-4 w-full flex justify-between items-center gap-5 rounded-lg hover:bg-primary";


    return (
        <>
            {
                load
                    ? <NavbarListGhost />
                    : error
                        ? <>error</>
                        : itemsNav && itemsNav.map(item => {
                            const ico = GetIcon(item.ico);

                            const current = item as any;
                            if (current && current.child && current.child.length > 0) {
                                const current2 = item as GroupAction;
                                return <LiDropdown
                                    btnCls="rounded-rounded-7 flex-1 py-1 px-2 lg:px-0 text-lg w-full text-primary-200 group-hover:text-custom-white-100 flex justify-center items-center"
                                    translade="-translate-x-40"
                                    child={current2.child}
                                    customClass={navLi}
                                    ico={current2.ico}
                                    name={current2.name}
                                >
                                    {
                                        current2.child.map((item) => {
                                            const ico = GetIcon(item.ico);

                                            return (
                                                <CurrentLi customClass={`${clsLi}`}>
                                                    <span className="text-custom-white-100 font-bold text-sm rounded-rounded-7 flex-[4] w-full">{item.name}</span>
                                                    <span className="bg-primary-200 rounded-rounded-7 flex-1 py-1 px-3 lg:px-0 text-lg w-full text-custom-white-100 flex justify-center items-center">
                                                        {ico}
                                                    </span>
                                                </CurrentLi>
                                            )
                                        })
                                    }
                                </LiDropdown>
                            }

                            return (
                                <CurrentLi customClass="relative flex-1 flex justify-center items-center px-3 py-2 text-lg bg-primary-100 hover:bg-primary-200 text-custom-white hover:text-custom-white-100 rounded-rounded-7 duration-200">
                                    {
                                        item.path
                                        ? <CurrentLink customClass="" path={item.path} ico={ico} text="" />
                                        : <>
                                            {item.count && <Badge count={item.count} />}
                                            {ico}
                                        </>
                                    }
                                    
                                </CurrentLi>
                            )
                        })
            }
            <CurrentLi customClass="flex-1 flex justify-center items-center px-3 py-2 text-lg bg-primary-100 hover:bg-primary-200 text-custom-white hover:text-custom-white-100 rounded-rounded-7 duration-200">
                <CurrentLink customClass="" path="/logout" ico={logoutIco} text="" />
            </CurrentLi>
        </>
    )
}
