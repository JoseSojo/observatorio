import { CUSTOM_ICONS } from "../../../_UI/_icons/IconsHandle";
import { BaseStatictics } from "../statictics/StaticticsInterface";

type ActionsTypeProfile = `show` | `update` | `password` | `photo`;

export interface ActionsProfile {
    name: ActionsTypeProfile;
    path?: string;
    ico:    CUSTOM_ICONS;
}

export interface SectionActionsProfile {
    name: ActionsTypeProfile;
    body: any;
}

export interface ProfilePageInterface {
    name: string;
    header: {
        photo: string | null;
        fullname: string;
        rol: string;
        actions: ActionsProfile[]
    },
    body?: SectionActionsProfile[],
    statictics: BaseStatictics[] | null
}
