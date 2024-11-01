import { ReactNode } from "react";

interface Props {
    type?:           `submit` | `button`;
    text?:           string;
    click?:          () => void;
    customClass?:   string;
    ico?:            any;
    children?:       ReactNode
}
 
export function CurrentButtom ({ click=()=>{},ico=``,text,type=`button`,customClass, children }: Props) {


    return (
        <button 
            type={type}
            className={`${customClass} `}
            onClick={click}
        >
            <span>{ico}</span>
            <span>{text}</span>
            { children }
        </button>
    )

}
