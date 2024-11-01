import { useEffect, useState } from "react";
import { ActionListInterface } from "../../../config/interface/crud/CrudApiInterface"
import { API_URL } from "../../../config/constants";
import { GetToken } from "../../../_hooks/storage/useToken";
import { ListAbstractResponse } from "../../../config/interface/RequetsInterface";
import { CurrentButtom } from "../../_atoms/CurrentButton";
import { CurrentLi } from "../../_atoms/CurrentLi";
import { GetIcon } from "../../_icons/IconsHandle";
import { GetNameByArray } from "../../../config/util/GetNameByArray";
import { LineChartContent } from "../chart/LineChart";
import { BaseStatictics, StaticticsPieName } from "../../../config/interface/statictics/StaticticsInterface";
import { useStaticthisFound } from "../../../_hooks/gui/admin/useStaticthisFound";
import { PieChartContent } from "../chart/PieChart";

interface Props {
    action: ActionListInterface;
    path: string;
    isShow: boolean;
    changePage: (id: string) => void;
    reverse: () => void;
    object: string,
}

export function CrudActionList({ action, path, changePage, isShow, object }: Props) {

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(10);
    const [count, setCount] = useState(0);
    const [list, setList] = useState<any[] | null>([]);
    const [load, setLoad] = useState(false);
    const [currentPie, setCurrentPie] = useState<StaticticsPieName | null>(null);
    const [statictics, setStatictics] = useState<BaseStatictics[] | null>(null);
    const [pagination, setPagination] = useState<{
        count: number;
        next: boolean;
        previous: boolean;
    } | null>(null);

    const { Execute } = useStaticthisFound({ object });

    const nextSkip = () => {
        setSkip(skip + take);
    }

    const previouesSkip = () => {
        setSkip(skip - take);
    }

    useEffect(() => {

        const AsyncFN = async () => {
            const executePromise = Execute();
            setLoad(true);
            const result = await fetch(`${API_URL}${path}/?skip=${skip}`, { headers: { token: `${GetToken()}` } });
            const json = await result.json() as ListAbstractResponse;
            if(json.pie) setCurrentPie(json.pie[0].name);
            setList([]);
            setPagination({
                count: json.body.count,
                next: json.body.next,
                previous: json.body.previous
            });
            setList(json.body.list);
            setCount(json.body.count);

            const statictics = await executePromise;
            setStatictics(statictics);
            setLoad(false);

        }

        AsyncFN();
    }, [skip])

    const clsButtonAction = `bg-primary hover:bg-primary-100 text-custom-white-100`;
    const clsButtonNone = `bg-custom-white-100 text-gray-500 cursor-default`;

    return (
        <div>
            {
                load
                    ? <>cargando</>
                    : list && list.length > 0
                        ?<>
                            <div className="grid w-full mt-3 border py-2">
                                <ul className="flex justify-end items-center gap-3 px-5">
                                    <CurrentLi customClass="flex gap-5 mb-2">
                                        <CurrentButtom
                                            click={skip + take != 10 && pagination?.previous ? previouesSkip : ()=>{}}
                                            customClass={`${skip + take != 10 && pagination?.previous ? clsButtonAction : clsButtonNone}  rounded-md px-3 py-1 flex text-lg items-center`}
                                            ico={GetIcon(`previous`)}
                                        />
                                        <CurrentButtom
                                            click={() => { }}
                                            customClass={`cursor-default bg-primary-100 text-custom-white-100 rounded-md px-3 py-1 flex text-lg items-center`}
                                            text={`${skip + take > count ? count : skip + take} / ${count}`}
                                        />
                                        <CurrentButtom
                                            click={pagination?.next ? nextSkip : ()=>{}}
                                            customClass={`${pagination?.next ? clsButtonAction : clsButtonNone}  rounded-md px-3 py-1 flex text-lg items-center`}
                                            ico={GetIcon(`next`)}
                                        />
                                    </CurrentLi>
                                </ul>
                                <div className="flex justify-between items-center gap-3 border-b">
                                    {
                                        action.header.map(head => (
                                            <span className="flex-1 text-center text-xs font-black text-primary-200">{head}</span>
                                        ))
                                    }
                                </div>
                                {
                                    list.map((item) => {
                                        return (
                                            <div className="flex justify-between items-center gap-3 mt-2 text-sm text-center">
                                                {
                                                    action.label.map((la) => (
                                                        <span className="flex-1 text-center text-xs font-black text-primary-200">
                                                            <GetNameByArray item={item} param={la} />
                                                        </span>
                                                    ))
                                                }
                                                {
                                                    isShow && <span className="flex-1 flex justify-center items-center">
                                                        <CurrentButtom click={() => changePage(item.id)} customClass="px-4 py-2 rounded-md text-custom-white-100 bg-primary hover:bg-primary-100" ico={GetIcon(`eye`)} type="button" />
                                                    </span>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                                {
                                    statictics && statictics.length > 0 && statictics.map((item) => (
                                        <LineChartContent 
                                            event={item.event} 
                                            initId={item.initId} 
                                            initMonth={item.initMonth} 
                                            initType={item.initType} 
                                            initYear={item.initYear}
                                            listEvent={item.listEvent}
                                            listMonth={item.listMonth}
                                            listYear={item.listYear}
                                            />
                                    ))                                    
                                }
                                {
                                    currentPie && <PieChartContent name={currentPie} />
                                }                                
                            </div>
                        </>
                        : <div>not found</div>
            }
        </div>
    )
}
