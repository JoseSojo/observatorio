import { useLocation } from "react-router-dom";
import { ActionSlideInterfaceChilds } from "../../types/gui/SlideInterface";
import LinkTo from "../_atom/LinkTo";
import ItemSlideChild from "./ItemSlideChilds";

interface Props {
    item: ActionSlideInterfaceChilds
}

export default function ItemSlide({item}: Props) {

    const location = useLocation();

    const cls = location.pathname === `${item.path}` ? `text-blue-800 font-black bg-blue-50 hover:text-blue-950 hover:bg-blue-100` :`text-gray-700 font-bold hover:text-gray-800 hover:bg-base-100`;

    if(item.childs) {
        return (
            <ItemSlideChild item={item} />
        )
    }

    return (
        <li className={`${cls} p-2 rounded text-sm duration-200 w-full`}>
            <LinkTo customClass={`w-full`} path={item.path} text={item.label} />
        </li>
    )
}
