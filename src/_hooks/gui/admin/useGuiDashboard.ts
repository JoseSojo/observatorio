"use client";

import { API_URL } from "../../../config/constants";
import { useEffect, useState } from "react";
import { ListCustomAction } from "../../../config/interface/admin/SlideInterface";
import { CustomNavbar } from "../../../config/interface/admin/NavbarInterface";
import { GetToken } from "../../storage/useToken";

interface Response {
    currentAction:          ListCustomAction[];
    currentCoutn:           ListCustomAction[];
    currentNavbar:          CustomNavbar[];
}

export function useGuiDashboard() {
    const path = `${API_URL}/gui/admin/dashboard`;
    const [load,setLoad] = useState(false);
    const [error,setError] = useState(false);
    const [data, setData] = useState<Response | null>(null);

    const GetData = async () => {
        try {
            setLoad(true);
            setError(false);
            const result = await fetch(path, { headers:{token:`${GetToken()}`} });

            if(!result.ok) {
                setLoad(false);
                setError(true);
            }

            const json = await result.json() as Response;

            setData(json);
            setLoad(false);
            setError(false);
        } catch (error) {
            setLoad(false);
            setError(true);
        }
    }

    useEffect(() => {
        GetData();
    }, []);

    return {load,error,data};
}
