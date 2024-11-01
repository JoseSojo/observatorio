import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
    children?:  ReactNode;
    text?:      string;
    ico?:       any;
    path:       string;
    customClass:string;
}

export function CurrentLink ({children,ico,text,path,customClass} :Props) {

    return (
        <Link to={path} className={`${customClass}`}>
            {text}
            {ico}
            {children}
        </Link>
    )
}
