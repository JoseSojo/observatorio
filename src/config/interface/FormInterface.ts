import { METHOD_HTTP } from "./GlobalInterface";
import { InputType } from "./InputInterface";

export interface FormType {

    action:             string;
    method:             METHOD_HTTP;
    inputList:          InputType[]   

}
