
export default function ButtonHandler ({param}: {param:string}) {

    if(param === `create`) return `btn bg-green-500 hover:bg-green-600 text-white`;
    else if(param === `delete`) return `btn bg-red-500 hover:bg-red-400 text-white`;
    else if(param === `update`) return `btn bg-sky-500 hover:bg-sky-600 text-white`;
    else if(param === `list`) return `btn bg-blue-500 hover:bg-blue-600 text-white`;
    else if(param === `download`) return `btn bg-emerald-700 hover:bg-emerald-800 text-white`;
    else if(param === `report`) return `btn bg-red-700 hover:bg-red-800 text-white`;
    else return `btn`;
}
