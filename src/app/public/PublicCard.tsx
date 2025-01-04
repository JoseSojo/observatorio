import { useEffect, useState } from "react"
import { Card } from "../../UI/_organism/DashboardCards";
import { API } from "../../entorno";
import Subtitle from "../../UI/_atom/Subtitle";
import Text from "../../UI/_atom/Text";

export default function PublicCard() {

    const [cards, setCards] = useState<Card[] | null>();

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}/public/gui/card`;
            const result = await fetch(url);
            const json = await result.json();
            if (json) setCards(json);
            console.log(json);
        }
        ExecuteRequets();
    }, [])

    return (
        <>
            {
                cards && cards.map((item) => (
                    <div className="rounded-lg bg-white h-auto flex flex-1 justify-between items-center flex-col relative">
                        <div className="flex flex-col justify-center items-center w-full p-1">
                            <Subtitle customClass="pl-3 text-md font-light text-slate-600" text={item.label} />
                            <Text customClass="text-4xl font-bold font-mono mt-3" text={item.value} />
                        </div>
                    </div>
                ))
            }
        </>
    )
}
