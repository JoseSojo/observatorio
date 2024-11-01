import { CrudResponseInterface, ObjectNameType } from "../../../config/interface/crud/CrudApiInterface";
import { GetToken } from "../../storage/useToken";
import { API_URL } from "../../../config/constants";

interface Props {
    crud: ObjectNameType
}

export function useCrudController ({crud}: Props) {

    const Execute = async () => {
        const RequetsOptions = {
            method: `GET`,
            headers: {
                token: `${GetToken()}` 
            }
        }
        const url = `${API_URL}/gui/crud/${crud}/?objectName=${crud}`;
        const result = await fetch(url, RequetsOptions);
        const json = await result.json() as CrudResponseInterface;
        return json;
    }

    return {Execute}
}
