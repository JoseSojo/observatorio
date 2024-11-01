import { ObjectNameType } from "../../crud/CrudApiInterface";

export type METHOD_HTTP =   `POST` | `GET` | `PUT` | `DELETE`;

export interface Filed {
    type:           string;
    name:           string;
    value?:         string;
    id:             string;
    placeholder:    string;
    label:          string;
    required:        boolean;
    select: boolean;
    selectIn: ObjectNameType;

    check: boolean;
    childs: CheckItem[]
}

export interface CheckItem {
    label: string,
    value: string,
} 

export interface Select extends Filed {
    
}

export interface Form {
    delete?:    boolean;
    name:       string;
    path:       string;
    method:     METHOD_HTTP;
    fields:     (Filed | Select)[];
}