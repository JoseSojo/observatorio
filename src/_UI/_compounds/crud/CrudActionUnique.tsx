import { useEffect, useState } from "react";
import { ActionShowInterface } from "../../../config/interface/crud/CrudApiInterface"
import { API_URL } from "../../../config/constants";
import { GetToken } from "../../../_hooks/storage/useToken";
import { UniqueAbstractResponse } from "../../../config/interface/RequetsInterface";
import { GetNameByArray } from "../../../config/util/GetNameByArray";
import { CurrentButtom } from "../../_atoms/CurrentButton";
import { GetIcon } from "../../_icons/IconsHandle";
import { CUSTOM_ACTIONS, GetColorAction } from "../../_icons/ColorHandle";
import { UniqueHistoryObject } from "./Unique/History";
import { Form } from "../../../config/interface/current/generic/FormGuiInterface";
import { UniqueUpdateAction } from "./Unique/Update";
import { ActionDelete } from "./Unique/Delete";
import { BaseStatictics } from "../../../config/interface/statictics/StaticticsInterface";
import { useStaticthisFound } from "../../../_hooks/gui/admin/useStaticthisFound";
import { LineChartContent } from "../chart/LineChart";

interface Props {
    show: ActionShowInterface;
    id: string;
    path: string;
    reverse: () => void;
    object: string;
}

export function CrudActionUnique({ show, id, path, reverse, object }: Props) {
    const [unique, setUnique] = useState<any | null>(null);
    const [actions, setActions] = useState<{ name: string, id: string, color: CUSTOM_ACTIONS }[] | null>(null);
    const [section, setSection] = useState<CUSTOM_ACTIONS | null>(null);
    const [load, setLoad] = useState(false);
    const [updateForm, setUpdateForm] = useState<Form>();
    const [deleteForm, setDeleteForm] = useState<Form>();

    const [listStatictics, setListStatictics] = useState<BaseStatictics[] | null>(null);
    const { Execute } = useStaticthisFound({ object, id });

    useEffect(() => {
        const Execute = async () => {
            setLoad(true);
            const result = await fetch(`${API_URL}${path}`, { headers: { token: `${GetToken()}` } });
            const json = await result.json() as UniqueAbstractResponse;
            setUnique(json.body);
            setUpdateForm(json.update);
            setDeleteForm(json.delete);
            setActions(json.actions);
            setLoad(false);
        }
        Execute();
    }, []);

    useEffect(() => {
        const AsyncFN = async () => {
            const list = await Execute();
            setListStatictics(list);
        }
        AsyncFN();
    }, []);

    return (
        <div>
            {
                load
                    ? <>cargando</>
                    : unique
                        ? <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 w-full mt-3 py-2">
                            <div className="border rounded-md py-3 px-5">
                                <div className="flex gap-x-5">
                                    {
                                        actions?.map((item) => (
                                            <CurrentButtom click={() => setSection(item.color)} text={item.color} customClass={`${GetColorAction(item.color)} flex justify-center items-center gap-3 px-4 py-2 rounded text-lg`} ico={GetIcon(item.color)} />
                                        ))
                                    }
                                </div>

                                {
                                    show.label.map((item, i) => (
                                        <div className="flex gap-3 mt-2">
                                            <span>{show.header[i]}: </span><br />
                                            <p className="overflow-x-auto font-bold"><GetNameByArray item={unique} param={item} /></p>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="border rounded-md p-3">
                                {
                                    section == `delete` ? <ActionDelete reverse={reverse} form={deleteForm} />
                                        : section == `history` ? <UniqueHistoryObject object={id} />
                                            : section == `update` ? <UniqueUpdateAction text="crear" reverse={reverse} form={updateForm} />
                                                : <></  >
                                }
                            </div>

                            <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 p-0 w-full mb-3 gap-3">
                                {
                                    listStatictics && listStatictics.map(item => (
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

                            </div>

                        </div>

                        : <div>not found</div>
            }
        </div>
    )
}
