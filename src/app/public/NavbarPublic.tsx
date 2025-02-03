import { useNavigate } from "react-router-dom";
import Button from "../../UI/_atom/Button";
import Input from "../../UI/_atom/Input";
import LinkTo from "../../UI/_atom/LinkTo";
import { getUser } from "../../utils/token copy";
import { useModal } from "../../_context/ModalContext";
import Logout from "../../UI/_organism/Logout";
import SearchAnimate from "../../UI/AnimateIcons/SearchAnimate";

interface Props {
    changeSearch?: ({ name, value }: { name: string, value: string }) => void;
    reload?: () => void
}

export default function NavbarPublic({ changeSearch,reload }: Props) {

    const navigate = useNavigate();
    const modal = useModal();

    const user = JSON.parse(getUser());
    return (
        <nav className="flex justify-between items-center w-full py-3 px-5 bg-gray-50 shadow lg:gap-5">

<<<<<<< Updated upstream
            <img src="/logo2.png" className="w-20"/>
            <LinkTo path="/" customClass="text-2xl font-black" text="Observatorio de Investigación, Ciencia, Tecnoliogía e Innovación UNERG" /> 
            
=======
           <img src="/logo2.png" alt="logo" className="w-20"/>
           
            <LinkTo path="/" customClass="text-2xl font-black" text="Observatorio de Investigación, Ciencia, Tecnología, e Innovación UNERG." />
>>>>>>> Stashed changes

            {
                changeSearch &&
                <div className="flex pl-3 gap-1 justify-between items-center">
                    <Button
                        click={() => {if(reload) reload()}}
                        customClass="hover:bg-slate-300 py-3 px-3 rounded"
                        ico={<SearchAnimate size={25} />}
                    />
                    <Input change={changeSearch} customClass="flex-1 p-3 shadow-lg rounded outline-none border text-gray-500" name="find" type="text" placeholder="Buscar..." />
                </div>
            }

            <ul className="flex-1 flex justify-end items-center gap-5">

                {
                    user
                        ? <>
                            <li>
                                <Button
                                    click={() => navigate(`/dashboard`)}
                                    customClass="text-xs font-black hover:bg-gray-200 p-3 rounded flex justify-center items-center gap-3"
                                    text="Administración"
                                >
                                    {/* <span className="text-xl font-black text-red-600">{Icono({ ico:`send` })}</span> */}
                                </Button>
                            </li>
                            <li>
                                <Button
                                    click={() => navigate(`/profile`)}
                                    customClass="text-xs font-black hover:bg-gray-200 p-3 rounded flex justify-center items-center gap-3"
                                    text="Perfíl"
                                >
                                    {/* <span className="text-xl font-black text-red-600">{Icono({ ico:`send` })}</span> */}
                                </Button>
                            </li>
                            <li>
                                <Button
                                    click={() => modal.show(<Logout />)}
                                    customClass="text-xs font-black hover:bg-gray-200 p-3 rounded flex justify-center items-center gap-3"
                                    text="Salir"
                                >
                                    {/* <span className="text-xl font-black text-red-600">{Icono({ ico:`send` })}</span> */}
                                </Button>
                            </li>
                        </>
                        : <>
                            <li>
                                <Button
                                    click={() => navigate(`/login`)}
                                    customClass="text-xs font-black hover:bg-gray-200 p-3 rounded flex justify-center items-center gap-3"
                                    text="Iniciar sesión"
                                >
                                    {/* <span className="text-xl font-black text-red-600">{Icono({ ico:`send` })}</span> */}
                                </Button>
                            </li>
                            <li>
                                <Button
                                    click={() => navigate(`/register`)}
                                    customClass="text-xs font-black hover:bg-gray-200 p-3 rounded flex justify-center items-center gap-3"
                                    text="Crear cuenta"
                                >
                                    {/* <span className="text-xl font-black text-red-600">{Icono({ ico:`send` })}</span> */}
                                </Button>
                            </li>
                        </>

                }


            </ul>

        </nav>
    )
}
