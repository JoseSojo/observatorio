import { useLocation } from "react-router-dom";
import { ActionSlideInterfaceChilds } from "../../types/gui/SlideInterface";
import Button from "../_atom/Button";
import { useState } from "react";
import LinkTo from "../_atom/LinkTo";

interface Props {
    item: ActionSlideInterfaceChilds
}

export default function ItemSlide({item}: Props) {

    const [active, setActive] = useState(false);
    const location = useLocation();

    const cls = location.pathname === `${item.path}` ? `text-blue-800 font-black bg-blue-50 hover:text-blue-950 hover:bg-blue-100` :`text-gray-700 font-bold hover:text-gray-800 hover:bg-base-100`;

    return (
        <li className={`${cls} ${active ? `bg-white` : ``} p-2 rounded text-sm duration-200 w-full relative`}>
            <Button click={()=>setActive(!active)} customClass={`w-full text-start`} text={item.label} />
            <ul className={`w-full bg-white p-1 duration-300 ${active ? `scale-1 max-h-52` : `scale-0 h-0`}`}>
                {
                    item.childs.map((item) => (
                        <li className={`${cls} p-2 rounded text-xs duration-200 w-full`}>
                            <LinkTo customClass={`w-full`} path={item.path} text={item.label} />
                        </li>
                    ))
                }
            </ul>
        </li>
    )
}
