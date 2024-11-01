import { CUSTOM_ICONS } from "@/_UI/_icons/IconsHandle";

export interface ActionNavbar {
    name:       string;
    ico:        string;
    path:       string;
    count?:     number;
}

export interface CustomNavbar {
    name:       string;
    ico:        CUSTOM_ICONS;
    path:       string;
    count?:     number;
    child?:      ActionNavbar[]
}