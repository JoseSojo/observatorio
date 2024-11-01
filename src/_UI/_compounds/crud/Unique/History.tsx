import { useEffect, useState } from "react"
import { API_URL } from "../../../../config/constants";
import { GetToken } from "../../../../_hooks/storage/useToken";
import { CurrentLi } from "../../../_atoms/CurrentLi";
import { CurrentButtom } from "../../../_atoms/CurrentButton";
import { GetIcon } from "../../../_icons/IconsHandle";
import { ListAbstractResponse } from "../../../../config/interface/RequetsInterface";

interface Props {
    object: string
}

export function UniqueHistoryObject({ object }: Props) {

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(10);
    const [count, setCount] = useState(0);
    const [list, setList] = useState<any[] | null>([]);
    const [load, setLoad] = useState(false);
    const [pagination, setPagination] = useState<{
        count: number;
        next: boolean;
        previous: boolean;
    } | null>(null);

    const nextSkip = () => setSkip(skip + take);
    const previouesSkip = () => setSkip(skip - take);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API_URL}/history/object/?skip=${skip}&take=${take}&objectId=${object}`;
            const resutl = await fetch(url, { headers: { token: `${GetToken()}` } });
            const json = await resutl.json() as ListAbstractResponse;
            setList([]);
            setPagination({
                count: json.body.count,
                next: json.body.next,
                previous: json.body.previous
            });
            setList(json.body.list);
            setCount(json.body.count);
            setLoad(false);
        }
        Execute();
    }, [skip])

    const clsButtonAction = `bg-primary hover:bg-primary-100 text-custom-white-100`;
    const clsButtonNone = `bg-custom-white-100 text-gray-500 cursor-default`;

    return (
        <>
            {
                list
                    ? <div>
                        <ul className="flex justify-end items-center gap-3 px-5">
                            <CurrentLi customClass="flex gap-5 mb-2">
                                <CurrentButtom
                                    click={skip + take != 10 && pagination?.previous ? previouesSkip : ()=>{}}
                                    customClass={`${ skip + take != 10 && pagination?.previous ? clsButtonAction : clsButtonNone}  rounded-md px-3 py-1 flex text-lg items-center`}
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
                            <span className="flex-1 text-center text-xs font-black text-primary-200">Objecto</span>
                            <span className="flex-1 text-center text-xs font-black text-primary-200">Evento</span>
                            <span className="flex-1 text-center text-xs font-black text-primary-200">Fecha</span>
                        </div>
                        {
                            list.map((item) => {
                                return (
                                    <div className="flex justify-between items-center gap-3 mt-2 text-sm text-center">
                                        <span className="flex-1 text-center text-xs font-black text-primary-200">{item.objectName}</span>
                                        <span className="flex-1 text-center text-xs font-black text-primary-200">{item.eventName}</span>
                                        <span className="flex-1 text-center text-xs font-black text-primary-200">{item.createAt}</span>

                                    </div>
                                )
                            })
                        }
                    </div>

                    : <>cargando o no hay</>
            }
        </>
    )
}
