import { CUSTOM_ACTIONS } from "../../_UI/_icons/ColorHandle";
import { Form } from "./current/generic/FormGuiInterface";
import { StaticticsPieName } from "./statictics/StaticticsInterface";

export interface AbstractResposne {
    message: string;
    error: false
}   


export interface ListAbstractResponse extends AbstractResposne {
    body: {
        list: any[];
        count: number;
        next: boolean;
        previous: boolean;
        nowSkip: number;
        nowTake: number;
    },
    pie?: {name:StaticticsPieName}[]
} 

export interface UniqueAbstractResponse {
    body: any,
    actions: {name:string,id:string,color:CUSTOM_ACTIONS}[],
    error: boolean,
    message: string,
    update?: Form,
    delete: Form
} 


