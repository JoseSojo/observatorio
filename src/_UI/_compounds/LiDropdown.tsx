"use client";

import { SlideInterface } from "../../config/interface/admin/SlideInterface";
import { ReactNode, useState } from "react"
import { GetIcon } from "../_icons/IconsHandle";
import { CurrentButtom } from "../_atoms/CurrentButton";

interface Props {
    name: string;
    customClass: string;
    ico: any;
    child?: SlideInterface[];
    active?: boolean;
    children?: ReactNode;
    translade?: string;
    btnCls?: string;
}

export function LiDropdown({ active, customClass, btnCls, ico, name, children,translade }: Props) {

    const [activeMain, setActiveMain] = useState<boolean>(false);

    const Activity = () => setActiveMain(!activeMain);
    const currentIco = GetIcon(ico); 

    return (
        <li
            className={`${customClass} relative `}
        >
            <span className={`${!active && `block lg:hidden`} duration-500 lg:block text-custom-white-100 font-bold text-sm rounded-rounded-7 flex-[4] w-full`}>{name}</span>
            
            <CurrentButtom text="" ico={currentIco} click={Activity} customClass={btnCls ? btnCls : `bg-primary-200 rounded-rounded-7 flex-1 py-1 px-2 lg:px-0 text-lg w-full text-custom-white-100 flex justify-center items-center`} />

            <ul className={`${activeMain ? `scale-y-100 translate-y-0` : `scale-y-0 -translate-y-24`} ${translade}  max-h-[200px] overflow-y-auto duration-200 z-[500] absolute left-0 top-10 w-[225px] py-2 px-1 mt-1 flex flex-col gap-2 bg-primary rounded-rounded-7`}>
                {children}
            </ul>
        </li>

    )

}
