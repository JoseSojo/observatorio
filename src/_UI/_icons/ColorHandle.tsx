

export type CUSTOM_ACTIONS = `delete` | `create` | `update` | `list` | `history`;  

export const GetColorAction = (ico: CUSTOM_ACTIONS) => {

    if(ico == "create") return `bg-emerald-600 hover:bg-emerald-500 text-white font-bold`
    else if(ico == "delete") return `bg-red-600 hover:bg-red-500 text-white font-bold`
    else if(ico == "list") return `bg-blue-600 hover:bg-blue-500 text-white font-bold`
    else if(ico == "update") return `bg-sky-600 hover:bg-sky-500 text-white font-bold`
    else if(ico == "history") return `bg-amber-600 hover:bg-amber-500 text-white font-bold`
    return `bg-gay-600 hover:bg-gay-500 text-white font-bold`;

}
