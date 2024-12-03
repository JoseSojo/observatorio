import { ChangeEvent } from "react";

interface Props {
    cols: string;
    value: string,
    name: string,
    label: string,
    type: string,
    change: (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export default function CustomInput ({change,name,value,label,type,cols}:Props) {
    return (
        <label className={`flex flex-col col-span-${cols}`}>
            <span className="text-sm font-semibold select-none">{label}</span>
            {
                value
                ? <div className="input input-sm border border-gray-800 outline-none bg-gray-300 select-none">{value}</div>
                : <input onChange={change} name={name} type={type} className="input input-sm border border-gray-600 outline-none" />
            }
            </label>
    )
}
