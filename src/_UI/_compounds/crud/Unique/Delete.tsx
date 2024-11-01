import { ReactNode } from "react";
import { Form } from "../../../../config/interface/current/generic/FormGuiInterface";
import { CurrentFormDelete } from "../../_master/FormDelete";

interface Props {
    form?: Form;
    reverse: () => void

}

export function ActionDelete({form,reverse}: Props): ReactNode {
    
    

    return (
        <>
            {
                form && form.delete
                ? <CurrentFormDelete reverse={reverse} data={form} /> 
                : <>No puedes eliminar</>

            }
        </>
    );
}
