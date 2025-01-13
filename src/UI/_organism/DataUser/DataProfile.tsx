import { FormEvent, useRef, useState } from "react";
import Button from "../../_atom/Button";
import { Icono } from "../../../_handler/IconHandler";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { API, API_STATIC } from "../../../entorno";
import { getToken } from "../../../utils/token";
import { setUser } from "../../../utils/token copy";
import Subtitle from "../../_atom/Subtitle";


interface Props {
    user: any;
    userId: string;
}

export default function DataProfile({ user }: Props) {

    const [file, setFile] = useState<File | null>(null);
    const [path, setPath] = useState(user.profilePath ? user.profilePath : ``);
    const divRef = useRef<HTMLDivElement | null>(null)

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const ExecuteRequets = async () => {
            if (!file) return;

            const url = `${API}/user/upload`;
            const formData = new FormData();
            formData.append(`file`, file);
            const req = { 
                method: `POST`,
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    token: `${getToken()}`
                },
                body: formData
            }
            const result = await fetch(url, req);
            const json = await result.json();
            setPath(json.file);
            const customUser = user;
            customUser.profilePath = json.file
            setUser(customUser);
        }
        ExecuteRequets();
    }

    return (
        <>
            <div className="grid lg:grid-cols-3 pt-3 gap-4">
            <Subtitle customClass="text-xl font-black text-blue-800 mt-4 col-span-3" text="Foto de perfil" />
                <div ref={divRef} className="h-64">
                    {
                        path
                        ? <img src={`${API_STATIC}${path}`} className="bg-gray-400 rounded-full" style={{ width:divRef.current ? divRef.current.getBoundingClientRect().width : `auto`, height:divRef.current ? divRef.current.getBoundingClientRect().height : `auto` }} />
                        : <div className="bg-gray-400 p-5 rounded-full object-cover" style={{ width:divRef.current ? divRef.current.getBoundingClientRect().width : `auto`}}></div>
                    }
                </div>

                <div className="col-span-2">
                    <form onSubmit={HandleSubmit}>
                        <input
                            required
                            type="file"
                            onChange={(e) => {
                                if (e.target.files) setFile(e.target.files[0])
                            }}
                            className="file-input file-input-ghost w-full border border-slate-600"
                            />
                        <Button
                            type="submit"
                            customClass={`${ButtonHandler({ param: `create` })} btn-sm mt-3`}
                            ico={Icono({ ico: `submit` })}
                            text="Crear"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}
