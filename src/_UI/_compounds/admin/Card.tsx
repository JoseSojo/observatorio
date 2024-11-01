import { CardDashboardGhost } from "../../../_UI/_ghost/CardDashboardGhost";
// import { GetIcon } from "../../../_UI/_icons/IconsHandle";
import { ListCustomAction } from "../../../config/interface/admin/SlideInterface";
import { CardDashboard } from "../card/CardDashboard";

interface Props {
    cards:      ListCustomAction[] | null;
    uiLoad:     boolean;
    uierror:    boolean;
}


export function ContainerCardDashboard ({cards,uiLoad,uierror}: Props) {


    return (
        <>
            {
                uiLoad 
                ? <CardDashboardGhost />
                : uierror 
                    ? <span>error</span>
                    : cards && 
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-0 mb-3 gap-3">
                        {
                            cards
                            ? cards.map(card => {
                                    // const ico = GetIcon(card.ico);
                                    return (
                                        <CardDashboard customClass="" data={card} />
                                    )
                                })
                            : <CardDashboardGhost />
                        }
                    </div>
            }
        </>
    )

}
