import { ActionUpdateInterface } from "../../../config/interface/crud/CrudApiInterface"

interface Props {
    update: ActionUpdateInterface;
    id: string
}

export function CrudActionUpdate ({update, id}: Props) {

    return (
        <div>actualizar {id}</div>
    )
}
