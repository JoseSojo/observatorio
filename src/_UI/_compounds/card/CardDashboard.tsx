import { GetIcon } from "../../../_UI/_icons/IconsHandle";
import { SlideInterface } from "../../../config/interface/admin/SlideInterface";

interface Props {
    data:       SlideInterface;
    customClass: string;
}

export function CardDashboard ({ data, customClass }: Props) {
    const ico = GetIcon(data.ico)

    return (
        <div 
            className={` ${customClass} rounded-rounded-7 gap-2 py-2 border bg-custom-white-100 flex flex-col justify-between px-3 items-center`}
        >
            <div className="flex items-center justify-between w-full gap-1">
                <div className="flex flex-col justify-center items-start">
                    <span className="rounded-rounded-20 bg-custom-white-100 py-2 text-xs font-black text-gray-500">{data.name}</span>
                    <span className="rounded-rounded-20 bg-custom-white-100 text-xl font-black text-gray-900">{data.name}</span>
                </div>
                <span className="rounded-rounded-20 text-xl font-black flex justify-center items-center px-3 py-1 bg-primary-100 text-white gap-3">{data.count} {ico}</span>
            </div>
        </div>
    )
}
