import { ReactNode } from "react";
import { Icono } from "../_handler/IconHandler";

interface Props {
    item: any;
    extractBy: string;
    current?: boolean
}

export default function ExtractValue ({extractBy,item,current}: Props) {

    const extract = extractBy.split(`.`);

    if(extract.length == 1) {
        if(extract[0] === `downloader` || extract[0] === `public`) {
            // return `${item[extract[0]]}`
            if(current) {
                return item[extract[0]] 
                ? `SÍ`
                : `NO`
            } 
            return item[extract[0]] 
                ? <span className="badge badge-sm text-xs font-light p-2 badge-success">SÍ</span> 
                : <span className="badge badge-sm text-xs font-light p-2 badge-error">NO</span>
            ;
        }

        if(extract[0] === `keywords`) {
            const data = item[extract[0]].split(` `) as string[];

            const currentFields: ReactNode[] = [];

            data.map(item => {
                currentFields.push(<span className="badge badge-sm text-xs font-light p-2">{item}</span>)
            });

            return <p className="flex gap-1">{currentFields}</p>;
        }

        return item[extract[0]]
    }
    else if(extract.length == 2) return item[extract[0]][extract[1]]
    else if(extract.length == 3) return item[extract[0]][extract[1]][extract[2]]
    else if(extract.length == 4) return item[extract[0]][extract[1]][extract[2]][extract[3]]
    else if(extract.length == 5) return item[extract[0]][extract[1]][extract[2]][extract[3]][extract[4]]
    else if(extract.length == 6) return item[extract[0]][extract[1]][extract[2]][extract[3]][extract[4]][extract[5]]
    else if(extract.length == 7) return item[extract[0]][extract[1]][extract[2]][extract[3]][extract[4]][extract[5]][extract[6]]
    else if(extract.length == 8) return item[extract[0]][extract[1]][extract[2]][extract[3]][extract[4]][extract[5]][extract[6]][extract[7]]

    return Icono({ ico:`` });
}
