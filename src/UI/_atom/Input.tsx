
interface Props {
    type:           `text` | `password` | `email` | string;
    change:         ({name,value}:{name:string,value:string}) => void
    value?:          string;
    placeholder?:   string;
    customClass:    string;
    name:           string;
}

export default function Input ({change,type,value,placeholder,customClass,name}: Props) {

    return (
        <input name={name} className={`${customClass}`} type={type} onChange={(e) => change({ name:e.target.name, value:e.target.value })} value={value} placeholder={placeholder} />
    );
}
