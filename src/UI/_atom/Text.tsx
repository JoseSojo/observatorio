import { ReactNode } from "react";

interface Props {
    customClass:        string;
    text:               string | ReactNode;
}

export default function Text ({customClass,text}: Props) {

    return (
        <span className={`${customClass}`}>{text}</span>
    );
}
