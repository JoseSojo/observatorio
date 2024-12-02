
interface Props {
    path:           string;
    alt:            string;
    customClass:    string;
}

export default function Image ({alt,customClass,path}: Props) {

    return (
        <img src={path} className={`${customClass}`} alt={alt} />
    );
}
