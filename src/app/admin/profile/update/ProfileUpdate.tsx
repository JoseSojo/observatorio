"use client";

import { useEffect, useState } from "react";
import { ProfileShowGhots } from "../../../../_UI/_ghost/profile/ProfileShowGhots";
import { ProfileGuiTemplate } from "../../../../_UI/_template/ProfileGuiTemplate";
import { useProfileGui } from "../../../../_context/ui/ProfileContext";
import { ProfilePageInterface } from "../../../../config/interface/profile/ProfileInterface";
import { ProfileSectionUpdate } from "../../../../_UI/_compounds/profile/ProfileUpdate";

export default function ProfileUpdate () {
    const [currentData, setCurrentData] = useState<ProfilePageInterface | null>(null);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    const { data } = useProfileGui();

    useEffect(() => {
        (async function () {
            setLoad(true);
            setError(false);

            const main = await data;
            setCurrentData(main);

            setLoad(false);
            setError(false);
        })()
    }, [])

    return (
        <ProfileGuiTemplate>
            {
                load
                ? <ProfileShowGhots />
                : error
                    ? <>error</>
                    : currentData && <ProfileSectionUpdate data={currentData} />
            }
        </ProfileGuiTemplate>
    )
}
