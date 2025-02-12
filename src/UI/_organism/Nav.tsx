import { useNavigate } from "react-router-dom";
import { Icono } from "../../_handler/IconHandler";
import Button from "../_atom/Button";
import LinkTo from "../_atom/LinkTo";
import { useModal } from "../../_context/ModalContext";
import Logout from "./Logout";

interface Props {}

export default function Nav({}: Props) {

    const navigate = useNavigate();
    const modal = useModal(); 

    return (
        <nav className="flex p-3 px-5 justify-between bg-slate-900">
            <LinkTo path="/" customClass="uppercase text-white font-black text-xl" text="Biblioteca - UNERG" /> 
            <img src="/dist/logo3.png" alt="logo" className="w-20"/>
            <ul className="flex gap-4">
                <li className="flex-1 flex justify-center items-center">
                    <Button
                        click={() => navigate(`/profile`)}
                        customClass="text-xl text-white hover:text-gray-300"
                        ico={<Icono ico="profile" />}
                    />
                </li>
                <li className="flex-1 flex justify-center items-center">
                    <Button
                        click={() => modal.show(<Logout />)}
                        customClass="text-xl text-red-600 hover:text-red-800"
                        ico={<Icono ico="logout" />}
                    />
                </li>
            </ul>
        </nav>
    )
}
