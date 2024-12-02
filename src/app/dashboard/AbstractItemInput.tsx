import { Check, Filed, Select } from "../../types/gui/FromInterface";
import AbstractSelect from "./AbstractSelect";
import LabelInput from "../../UI/_compound/LabelInput";
import Text from "../../UI/_atom/Text";

interface Props {
    item: Filed | Select | Check;
    change: ({ name, value }: { name: string, value: string }) => void;
    value: string
}

export default function AbstractItemInput({ item, change, value }: Props) {

    const select = item as Select;
    // const check = item as Check;

    if (select.select) return <label className="form-control w-full">
        <div className="label">
            <Text customClass="label-text text-lg font-semibold" text={item.label} />
            {/* <span className="label-text-alt">Top Right label</span> */}
        </div>
        <AbstractSelect change={change} item={select} />
        <div className="label">
            {/* <span className="label-text-alt">Bottom Right label</span> */}
        </div>
    </label>

    return (
        <LabelInput value={value} label={item.label} placeholder="" downText="" change={change} customClass="input border border-slate-400 px-3 py-2 outline-none" name={item.name} type={item.type} />
    )
}
