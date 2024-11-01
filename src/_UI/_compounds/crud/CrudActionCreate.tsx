import { ActionCreateInterface } from "../../../config/interface/crud/CrudApiInterface";
import { CurrentForm } from "../_master/Form";

interface Props {
    create: ActionCreateInterface;
    reverse: () => void
}

export function CrudActionCreate ({create, reverse}: Props) {


    return (
        <div>
            <div>
                <CurrentForm text="crear" reverse={reverse} data={create.form} />
            </div>
        </div>
    )
}
