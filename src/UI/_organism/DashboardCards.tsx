import { useEffect, useState } from "react";
import { API } from "../../entorno";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import CardItemDashboard from "../_compound/CardItemDashboard";


export interface Card {
    label:      string;
    value:      number;
    ico:        string;
    child?: {
        label:      string;
        value:      string;
    }[]
}


export default function DashboardCards () {

    const [cards, setCards] = useState<Card[] | null>(null);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/gui/card`;
            const req = RequestOptionsGetToken({ method:`GET` });
            const result = await fetch(url, req);
            const json = await result.json() as Card[];

            setCards(json);
        }
        Execute();
    }, [])

    return (
        <>
            {
                cards && cards.map(item => (
                    <CardItemDashboard item={item} />
                ))
            }
        </>
    )
}
