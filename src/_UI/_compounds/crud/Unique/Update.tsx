import { Form } from "../../../../config/interface/current/generic/FormGuiInterface";
import { CurrentForm } from "../../_master/Form";

interface Props {
    form?: Form;
    reverse: () => void,
    text: `actualizar` | `crear`
}

export function UniqueUpdateAction({form,reverse,text}: Props) {


    return (
        <>
            {
                form
                ? <CurrentForm text={text} reverse={reverse} data={form} />
                : <>no hay</>
            }
        </>
    )

} 
