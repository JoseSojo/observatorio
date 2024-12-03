import Input from "../_atom/Input";
import Text from "../_atom/Text";

interface Props {
    type:           `text` | `password` | `email` | string;
    customClass?:   string;
    placeholder:    string;
    value:          string;
    change:         ({name,value}:{name:string,value:string}) => void;

    downText?:      string;
    label:          string;
    name:           string;
}

export default function LabelInput({type, name, customClass, placeholder, change, value, downText, label}: Props) {


    const cls = customClass ? customClass : `input input-bordered w-full`

    return(
        <label className="form-control w-full ">
            <div className="label">
                <Text customClass="label-text text-lg font-semibold" text={label} />
                {/* <span className="label-text-alt">Top Right label</span> */}
            </div>
            <Input name={name} type={type} customClass={cls} placeholder={placeholder} change={change} value={value}  />
            <div className="label">
                <Text customClass="label-text-alt" text={downText ? downText : ``} />
                {/* <span className="label-text-alt">Bottom Right label</span> */}
            </div>
        </label>
    )
}
