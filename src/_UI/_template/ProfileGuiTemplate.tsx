
import { ReactNode } from "react";
import { ProfileGuiProvider } from "../../_context//ui/ProfileContext";

interface Props {
    children: ReactNode
}

export function ProfileGuiTemplate({ children }: Props) {
    
    return (
        <ProfileGuiProvider>
            { children }
        </ProfileGuiProvider>
    );
}
