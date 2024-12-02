import { Link } from "react-router-dom";

interface Props {
    customClass:        string;
    text:               string;
    path:               string
}

export default function LinkTo ({customClass,text,path}: Props) {

    return (
        <Link to={path} className={`${customClass}`}>{text}</Link>
    );
}
