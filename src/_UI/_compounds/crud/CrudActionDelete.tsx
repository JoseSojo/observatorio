import { ActionDeleteInterface } from "../../../config/interface/crud/CrudApiInterface"

interface Props {
    shofDelete: ActionDeleteInterface;
    id: string
}

export function CrudActionDelete ({id,shofDelete}: Props) {

    return (
        <div>eliminar {id}</div>
    )
}
