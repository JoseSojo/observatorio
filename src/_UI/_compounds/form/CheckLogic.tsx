import { CheckItem } from "../../../config/interface/current/generic/FormGuiInterface";

interface Props {
    data: CheckItem;
    name: string
}

export function CheckLogic({ data,name }: Props) {

    return (
        <label className="flex gap-3">
            <input type="checkbox" name={name} value={data.value} />
            <span className="text-sm text-gray-700 pl-1 mb-1 font-bold">{data.label}</span>
        </label>
    )
}
