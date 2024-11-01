import { CUSTOM_ICONS } from "../../../_UI/_icons/IconsHandle";

export interface SlideInterface {
    name:       string;
    path:       string;
    ico:        CUSTOM_ICONS;
    count?:      number;
}

export interface GroupAction {
    name:       string;
    ico:        CUSTOM_ICONS;
    path:       string;
    count?:     number;
    child:      SlideInterface[]
}

export type ListCustomAction = GroupAction | SlideInterface;

