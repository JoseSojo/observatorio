
import { BsPersonCircle, BsPersonFill, BsCoin, BsBellFill, BsEyeFill, BsVectorPen } from "react-icons/bs";
import { IoIosPlanet } from "react-icons/io";
import { FaCity } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore,MdSave, MdOutlinePayment, MdOutlinePhotoCameraFront, MdRealEstateAgent, MdHistoryEdu, MdSubscriptions, MdOutlineSecurity } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { SiGoogletranslate } from "react-icons/si";
import { VscGraphLine } from "react-icons/vsc";
import { RiDashboardHorizontalFill, RiAdminFill, RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosMenu, IoIosChatboxes, IoIosSend } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";
import { CgDanger } from "react-icons/cg";
import { LiaUserCogSolid, LiaUserShieldSolid } from "react-icons/lia";
import { PiWarningCircleFill } from "react-icons/pi";
import { GrStatusGood } from "react-icons/gr";
import { CUSTOM_ACTIONS } from "./ColorHandle";


export type CUSTOM_ICONS = CUSTOM_ACTIONS | `dashboard` | `success` | `warning` | `error` | `delete` | `eye` | `previous` | `next` | `list` | `submit` | `save` | `default` | `user.update` | `user.security` | `user.photo` | `messages` | `logout` | `notification` | `main` | `master` | `permit` | `user` | `user.circle` | `coin` | `payment` | `country` | `state` | `city` | `subscription` | `detail` | `history` | `statictics` | `languaje`;  

export const GetIcon = (ico: CUSTOM_ICONS) => {

    if(ico == "city") return <FaCity />
    else if(ico == "country") return <IoIosPlanet />
    else if(ico == "coin") return <BsCoin />
    else if(ico == "payment") return <MdOutlinePayment />
    else if(ico == "state") return <MdRealEstateAgent />
    else if(ico == "user") return <BsPersonFill />
    else if(ico == "user.circle") return <BsPersonCircle />
    else if(ico == "history") return <MdHistoryEdu />
    else if(ico == "detail") return <BiDetail />
    else if(ico == "languaje") return <SiGoogletranslate />
    else if(ico == "statictics") return <VscGraphLine />
    else if(ico == "subscription") return <MdSubscriptions />
    else if(ico == "permit") return <MdOutlineSecurity />
    else if(ico == "master") return <RiAdminFill />
    else if(ico == "main") return <IoIosMenu />
    else if(ico == "notification") return <BsBellFill />
    else if(ico == "logout") return <AiOutlinePoweroff />
    else if(ico == "messages") return <IoIosChatboxes />
    else if(ico == "user.update") return <LiaUserCogSolid />
    else if(ico == "user.security") return <LiaUserShieldSolid />
    else if(ico == "user.photo") return <MdOutlinePhotoCameraFront />
    else if(ico == "default") return <TfiLayoutWidthDefaultAlt />
    else if(ico == "save") return <MdSave />
    else if(ico == "submit") return <IoIosSend />
    else if(ico == "list") return <FaListUl />
    else if(ico == "next") return <MdOutlineNavigateNext />
    else if(ico == "previous") return <MdOutlineNavigateBefore />
    else if(ico == "eye") return <BsEyeFill />

    else if(ico == "delete") return <RiDeleteBin6Fill />
    else if(ico == "create") return <MdSave />
    else if(ico == "update") return <BsVectorPen />
    else if(ico == "error") return <CgDanger />
    else if(ico == "success") return <GrStatusGood />
    else if(ico == "warning") return <PiWarningCircleFill />

    else if(ico == "dashboard") return <RiDashboardHorizontalFill />
    return <TfiLayoutWidthDefaultAlt />;

}
