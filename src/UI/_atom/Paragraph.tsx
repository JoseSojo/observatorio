
interface Props {
    customClass:        string;
    text:               string;
}

export default function Paragraph ({customClass,text}: Props) {

    return (
        <p className={`${customClass}`}>{text}</p>
    );
}
