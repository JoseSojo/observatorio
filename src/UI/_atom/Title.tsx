
interface Props {
    customClass:        string;
    text:               string;
}

export default function Title ({customClass,text}: Props) {

    return (
        <h1 className={`${customClass}`}>{text}</h1>
    );
}
