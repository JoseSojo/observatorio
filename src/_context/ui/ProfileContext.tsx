
import { createContext, ReactNode, useContext } from "react";
import { ProfilePageInterface } from "../../config/interface/profile/ProfileInterface";
import { GetToken } from "../../_hooks/storage/useToken";
import { API_URL } from "../../config/constants";

interface ProfileGuiContextInterface {
    data: Promise<ProfilePageInterface | null>;
}

const Get = async (path: string): Promise<ProfilePageInterface> => {
    const result = await fetch(path, { headers:{token:`${GetToken()}`} });

    const json = await result.json() as {page:ProfilePageInterface};
    return json.page
}

const path = `${API_URL}/gui/admin/profile`;
const profileResult = Get(path);

const ProfileGuiContext = createContext<ProfileGuiContextInterface>({
    data: profileResult,
});

export const ProfileGuiProvider = ({children}:{children:ReactNode}) => {

    return (
        <ProfileGuiContext.Provider value={{
            data: profileResult
        }}
        >
            {children}
        </ProfileGuiContext.Provider>
    )
}

export const useProfileGui = () => useContext(ProfileGuiContext);
