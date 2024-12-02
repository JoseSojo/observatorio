
interface Props {
    customClass:        string;
    text:               string;
}

export default function Subtitle ({customClass,text}: Props) {

    return (
        <h2 className={`${customClass}`}>{text}</h2>
    );
}
