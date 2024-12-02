import { getToken } from "./utils/token"

export const RequestOptions = ({method}:{method:string}) => {
    return {
        method,
        headers: {
            token:`${getToken()}`
        }
    }
}
