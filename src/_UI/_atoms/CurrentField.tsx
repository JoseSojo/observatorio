import { ChangeEvent, useState } from "react";
import { Filed } from "../../config/interface/current/generic/FormGuiInterface";

interface Props {
    data: Filed
}

export function CurrentField({data}: Props) {

    const [currentValue, setCurrentValue] = useState(data.value);

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value)
    }

    return (
        <label className="grid">
            <span className="text-sm text-gray-700 pl-1 mb-1 font-bold">{data.label}</span>
            <input
                onChange={HandleChange}
                className="px-3 py-2 rounded-md border outline-none text-gray-600"
                type={data.type}
                placeholder={data.placeholder}
                name={data.name}
                id={data.id}
                value={currentValue}
                required={data.required ? true : false}
            />
        </label>
    )
}
