import { useState } from "react";
import Subtitle from "../_atom/Subtitle";
import Text from "../_atom/Text";
import { Card } from "../_organism/DashboardCards";
import Button from "../_atom/Button";
import { Icono } from "../../_handler/IconHandler";

interface Props {
    item: Card
}

export default function CardItemDashboard({ item }: Props) {

    if(item.child) {
        console.log(item.child);
    }

    const [label,setLabel] = useState<string>(item.label); 
    const [value,setValue] = useState<string | number>(item.value); 

    return (
        <div className="rounded-lg bg-white h-auto flex flex-1 justify-between items-center flex-col relative border-l-4 border-blue-600">
            <div className="flex justify-between items-center w-full p-1">
                <Subtitle customClass="pl-3 text-sm font-black" text={label} />

                {
                    item.child ?
                    <details className="dropdown">
                        <summary className="btn m-1">{Icono({ ico: `optionsV` })}</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 -left-40 shadow">
                            {
                                item.child.map(child => (
                                    <li>
                                        <Button 
                                            click={() => {
                                                setValue(child.value);
                                                setLabel(child.label);
                                            }}
                                            text={child.label}
                                            customClass="text-xs font-semibold" />
                                    </li>
                                ))
                            }
                        </ul>
                    </details>
                    : <span className="p-7"></span>
                }
            </div>
            <div className="w-full px-3 pb-1 relative h-full flex justify-start items-start">
                <Text customClass="text-xl font-bold" text={value} />
            </div>
        </div>
    )
}
