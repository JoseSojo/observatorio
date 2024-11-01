import { ChangeEvent } from "react";

export interface InputType {
    type:           `text` | `password` | `email` | `number` | `hiden`;
    class?:         string;
    placeholder?:   string;
    value?:         string;
    name?:          string; 
    required:       boolean;
    label:          string; 
    change:         (e: ChangeEvent<HTMLInputElement>) => void
}
