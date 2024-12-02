import { ReactNode } from "react"

interface Props {
    children?:      ReactNode;
    click?:         () => void;
    text?:          string;
    ico?:           ReactNode;
    customClass?:   string;
    type?:           `button` | `submit`    
}

export default function Button ({ico,children,click,customClass,text,type}: Props) {

    return (
        <button type={type ? type : `button`} className={`${customClass}`} onClick={click}>
            {children}
            {ico}
            {text}
        </button>
    );
}
