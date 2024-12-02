// import lg from '../../assets/';

import { useEffect, useState } from "react";
import { SlideGui } from "../../_service/gui/Slide";
import { ActionSlideInterfaceChilds } from "../../types/gui/SlideInterface";
import ItemSlide from "../_compound/ItemSlide";

export default function Slide() {

    const [actions, setActions] = useState<ActionSlideInterfaceChilds[]>([])

    useEffect(() => {
        const Execute = async () => {
            const response = await SlideGui();
            if (response.body) setActions(response.body);
        }
        Execute();
    }, [])

    return (
        <div className="pt-3 px-3 h-full">

            {/* <Title customClass="font-black text-2xl uppercase text-center" text="Biblioteca" /> */}

            <ul className="grid border-t pt-5 gap-2">
                {
                    actions.map((item) => <ItemSlide key={item.path} item={item} />)
                }
            </ul>
        </div>
    )
}
