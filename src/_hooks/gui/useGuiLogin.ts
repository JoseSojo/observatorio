"use client";

import { API_URL } from "../../config/constants";
import { FormType } from "../../config/interface/FormInterface";
import { useEffect, useState } from "react";

export function useGuiLogin() {
    const path = `${API_URL}/gui/auth/login`;
    const [form,setForm] = useState<FormType | null>(null);
    const [load,setLoad] = useState(false);
    const [error,setError] = useState(false);

    const GetForm = async () => {
        try {
            setLoad(true);
            setError(false);
            const result = await fetch(path);
            if(!result.ok) {
                setLoad(false);
                setError(true);
            }
            const json = await result.json() as {form:FormType};
            setForm(json.form);
            (json);

            setLoad(false);
            setError(false);
        } catch (error) {
            setLoad(false);
            setError(true);
        }
    }

    useEffect(() => {
        GetForm();
    }, [    ]);

    return {form,load,error};
}
