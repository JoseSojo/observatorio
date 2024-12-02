
import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";
import { 
    BsBarChartLineFill,
    BsBookHalf,
    BsCardText,
    BsCheckCircleFill,
    BsClockHistory,
    BsDownload,
    BsExclamationOctagonFill,
    BsExclamationTriangleFill,
    BsEyeFill,
    BsFillFilePdfFill,
    BsFillFloppyFill,
    BsFillPersonFill,
    BsFillTrashFill,
    BsFillXCircleFill,
    BsGripHorizontal,
    BsGripVertical,
    BsListTask,
    BsPenFill,
    BsPower,
    BsSendFill

} from "react-icons/bs";

type ICONS =
    | `category`
    | `program`
    | `line`
    | `dashboard`
    | `profile`
    | `logout`
    | `create`
    | `delete`
    | `update`
    | `unique`
    | `show`
    | `list`
    | `report`
    | `recovery`
    | ``
    | `optionH`
    | `optionsV`
    | `submit`
    | `danger`
    | `warning`
    | `success`
    | `close`
    | `download`
    | `student`
    | `estudiante`
    | `load`
    | string


export function Icono ({ico}:{ico: ICONS}) {

    if(ico === `category`) return <TfiLayoutWidthDefaultAlt />
    if(ico === `dashboard`) return <BsBarChartLineFill />
    if(ico === `line`) return <BsBookHalf />
    if(ico === `profile`) return <BsFillPersonFill />
    if(ico === `program`) return <BsListTask />
    if(ico === `logout`) return <BsPower />
    if(ico === `create`) return <BsFillFloppyFill />
    if(ico === `delete`) return <BsFillTrashFill />
    if(ico === `list`) return <BsCardText />
    if(ico === `recovery`) return <></>
    if(ico === `report`) return <BsFillFilePdfFill />
    if(ico === `show`) return <BsEyeFill />
    if(ico === `unique`) return <BsEyeFill />
    if(ico === `update`) return <BsPenFill />
    if(ico === `optionsV`) return <BsGripVertical />
    if(ico === `optionH`) return <BsGripHorizontal />
    if(ico === `submit`) return <BsSendFill />
    if(ico === `danger`) return <BsExclamationOctagonFill />
    if(ico === `success`) return <BsCheckCircleFill />
    if(ico === `warning`) return <BsExclamationTriangleFill />
    if(ico === `close`) return <BsFillXCircleFill />
    if(ico === `download`) return <BsDownload />
    if(ico === `load`) return <BsClockHistory />

    return <TfiLayoutWidthDefaultAlt />
} 
