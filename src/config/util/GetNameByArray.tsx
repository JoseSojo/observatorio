import { GetIcon } from "../../_UI/_icons/IconsHandle";

interface Prop {
    param: string;
    item: string[];
}

export function GetNameByArray({param, item}: Prop) {

    const currentLa = param.split(`.`) as any[]; 

    if(currentLa.length === 1) {
        if(item[currentLa[0]]) return <>{item[currentLa[0]]}</>
        return <p className="w-full flex justify-center">{GetIcon(`default`)}</p>
    }
    else if(currentLa.length === 2) {
        if(item[currentLa[0]]) {
            if(item[currentLa[0]][currentLa[1]]) return <>{item[currentLa[0]][currentLa[1]]}</>
            return <p className="w-full flex justify-center">{GetIcon(`default`)}</p>
        }
    }
    return <p className="w-full flex justify-center">{GetIcon(`default`)}</p>
}
