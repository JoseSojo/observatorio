import { useParams } from "react-router-dom"
import CompletedDataUser from "../../../UI/_organism/CompletedDataUser";
interface Props {}

export default function UserUniqueCrud ({}: Props) {

    const { id } = useParams() as { id:string };

    return (
        <div className="">
            <CompletedDataUser userId={id} />
        </div>
    )
}
