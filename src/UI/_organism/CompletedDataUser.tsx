import { useState } from "react";
import Button from "../_atom/Button";
import Subtitle from "../_atom/Subtitle";
import { getUser } from "../../utils/token copy";
import DataUser from "./DataUser/DataUser";
import DataEstudios from "./DataUser/DataEstudios";
import DataLaboral from "./DataUser/DataLaboral";
import DataProfile from "./DataUser/DataProfile";

interface Props {
    userId?: string
}

export default function CompletedDataUser({userId}:Props) {

    const [section, setSection] = useState(`DATA`); // DATA | ESTUDIOS | LABORAL | `PROFILE`

    const user = JSON.parse(getUser()) as any;

    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <div className="flex justify-between w-full">
                <div>
                    <Subtitle customClass="text-2xl font-bold flex-1" text={ section === `ESTUDIOS` ? `Ficha de usuario (Estudios)` : section === `LABORAL` ? `Ficha de usuario (Laboral)` : `Ficha de usuario (Datos)` } />
                </div>
                <div role="tablist" className="tabs tabs-lifted w-[50%]">
                    <Button click={() => setSection(`PROFILE`)} customClass={`tab text-sm ${section === `PROFILE` ? `tab-active font-black` : `font-semibold`}`} text="Foto de perfil" />
                    <Button click={() => setSection(`DATA`)} customClass={`tab text-sm ${section === `DATA` ? `tab-active font-black` : `font-semibold`}`} text="Perfil de datos" />
                    <Button click={() => setSection(`ESTUDIOS`)} customClass={`tab text-sm ${section === `ESTUDIOS` ? `tab-active font-black` : `font-semibold`}`} text="Perfil de Estudios" />
                    <Button click={() => setSection(`LABORAL`)} customClass={`tab text-sm ${section === `LABORAL` ? `tab-active font-black` : `font-semibold`}`} text="Perfil Laboral" />
                </div>
            </div>

            <div className="bg-white px-5 pb-5 rounded-b rounded-tl">
                { section === `PROFILE` && <DataProfile user={user} userId={userId ? userId : user.id } /> }
                { section === `DATA` && <DataUser update={userId ? true : false} user={user} userId={userId ? userId : user.id } /> }
                { section === `ESTUDIOS` && <DataEstudios user={user} userId={userId ? userId : user.id } /> }
                { section === `LABORAL` && <DataLaboral user={user} userId={userId ? userId : user.id } /> }
            </div>

        </div>
    )
}
