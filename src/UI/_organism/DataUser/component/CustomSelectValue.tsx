import { ChangeEvent, ReactNode } from "react";

interface Props {
    cols: string;
    value: string,
    name: string,
    label: string,
    change: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    children: ReactNode
}

export default function CustomSelectValue({ change, name, value, label, children,cols }: Props) {
    return (
        <label className={`flex flex-col col-span-${cols}`}>
            <span className="text-sm font-semibold select-none">{label}</span>
            {
                value
                    ? <div className="input input-sm border border-gray-800 outline-none bg-gray-300 select-none">{value}</div>
                    : <select onChange={change} name={name} className="input input-sm border border-gray-600 outline-none">
                        {children}
                    </select>
            }
        </label>
    )
}
