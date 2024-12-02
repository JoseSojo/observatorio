
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ListCustomAction } from "../../config/interface/admin/SlideInterface";
import { useGuiDashboard } from "../../_hooks/gui/admin/useGuiDashboard";
import { CustomNavbar } from "../../config/interface/admin/NavbarInterface";

interface DashboardGuiContextInterface {
    load:  boolean;
    error: boolean;
    message?: string;
    currentAction:          ListCustomAction[];
    currentCoutn:           ListCustomAction[];

    itemsNav:               CustomNavbar[]
}

const DashboardGuienticationContext = createContext<DashboardGuiContextInterface>({
    currentAction: [],
    currentCoutn: [],
    error: false,
    load: true,
    message: ``,
    itemsNav:[]
});

export const DashboardGuiProvider = ({children}:{children:ReactNode}) => {

    const [currentLoad, setCurrentLoad] = useState(true);


    const { data, error } = useGuiDashboard();

    useEffect(() => {
        if(data) setCurrentLoad(false)
    }, [])

    // if(!data) return;


    return (
        <DashboardGuienticationContext.Provider value={{ 
                currentAction:data ? data.currentAction : [], 
                currentCoutn: data ? data.currentCoutn : [],
                error,
                load: currentLoad,
                itemsNav: data ? data.currentNavbar : [],
            }}
        >
            {children}
        </DashboardGuienticationContext.Provider>
    )
}

export const useDashboardGui = () => useContext(DashboardGuienticationContext);
