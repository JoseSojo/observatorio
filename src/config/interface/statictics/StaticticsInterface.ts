export type EventType = 
    | `application`
    | `application.country`
    | `application.state`
    | `application.city`
    | `application.coin`
    | `application.payment`
    | `application.subscription`
    | `application.permit`
    | `application.user`
    | `country`
    | `state`
    | `city`
    | `coin`
    | `payment`
    | `subscription`
    | `permit`
    | `user`
    ;

export type TypeStatictics = `year` | `month`

export interface objetTypeYear {
    en: number;
    fb: number;
    mz: number;
    ap: number;
    my: number;
    jn: number;
    jl: number;
    ag: number;
    sp: number;
    oc: number;
    nv: number;
    dc: number;
} 

export interface objetTypeMonth {
    one: number
    two: number
    three: number
    four: number
    five: number
    six: number
    seven: number
    eight: number
    nine: number
    ten: number
    eleven: number
    twelve: number
    thirteen: number
    fourteen: number
    fifteen: number  
    sixteen: number
    seventeen: number
    eighteen: number
    nineteen: number
    twenty: number
    twenty_one: number
    twenty_two: number
    twenty_three: number
    twenty_four: number
    twenty_five: number
    twenty_six: number
    twenty_seven: number
    twenty_eight: number
    twenty_nine: number
    thirty: number
    thirty_one: number
} 


export interface GenerateStatisticsInterface {
    event:  EventType;
    id?:    string;
    month?: number;
    year?:  number;
} 

export interface ResponseStaticticsApi {
    label: string[];
    result: string[];
    title: string,
    type: string
}

export interface BaseStaticticsCard {
    initType: `year` | `month`;
    event: string,
}

export interface BaseStatictics extends BaseStaticticsCard {
    initId: string,
    initMonth: number,
    initYear: number,
    listMonth?: {id:string,label:string}[],
    listYear?:   number[],
    listEvent?:  {label:string,objectName:string}[]
}

export type StaticticsPieName = `user_in_permit` | `coin_in_payment` | `state_in_country` | `city_in_state` | `user_in_subscription` | `user_in_city`;

export interface BaseStaticticsPie {
    name: StaticticsPieName
}

