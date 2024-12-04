import { useEffect, useState } from "react";
import { useModal } from "../../_context/ModalContext";
import ButtonHandler from "../../_handler/ButtonsHandler";
import { Icono } from "../../_handler/IconHandler";
import { ActionCrudInterface } from "../../types/gui/CrudInterface";
import Button from "../../UI/_atom/Button";
import Title from "../../UI/_atom/Title";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import { API } from "../../entorno";
import Text from "../../UI/_atom/Text";

interface Props {
    item: ActionCrudInterface;
    crud: string;
    translade: (path: string) => void;
    id?: string
}

export default function AbstractReport({ item, crud, translade, id }: Props) {

    const modal = useModal();
    const [load, setLoad] = useState(true);

    const [reportOptions, setReportOptions] = useState<{ label: string, path: string, value: string, id?: string }[] | null>(null);
    // const [report, setReport] = useState<any | null>(null);
    const [options, setOptions] = useState<{ label: string, path: string, value: string, id?: string } | null>(null);

    useEffect(() => {
        const Execute = async () => {
            setLoad(true);
            let url = `${API}/gui/report/${crud}/`;
            if(id) url += id;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const json = await result.json() as { report: any[] };

            setReportOptions(json.report);
            setLoad(false);
        }
        Execute();
    }, [])

    const Close = () => {
        modal.hidden();
    }

    const Download = () => {
        if (!options) return;
        modal.hidden();
        translade(`/dashboard${options.path}`);
    }

    return (
        <div className="flex flex-col items-center gap-4 text-">
            <i className="text-7xl w-[100px] h-[100px] rounded-full bg-slate-200 flex justify-center items-center text-red-500">{Icono({ ico: `report` })}</i>
            <Title customClass="text-3xl font-black text-center" text={item.label} />

            <div className="flex gap-4">
                {
                    reportOptions && reportOptions.length > 0 && reportOptions.map(report => (
                        <label className="flex text-sm">
                            <input onChange={() => setOptions(report)} type="radio" name="reportOption" />
                            <Text customClass="" text={report.label} />
                        </label>
                    ))
                }
            </div>

            {
                load
                    ? <div className="flex justify-center items-center gap-5">
                        <Button customClass={`${ButtonHandler({ param: `` })} skeleton text-gray-400 px-4 py-1 rounded`} text="Cancelar" ico={Icono({ ico: `close` })} />
                        <Button customClass={`${ButtonHandler({ param: `` })} skeleton text-gray-400 px-4 py-1 rounded`} text="Generando reporte..." ico={Icono({ ico: `load` })} />
                    </div>
                    :
                    options
                        ? <div className="flex justify-center items-center gap-5">
                            <Button click={Close} customClass={`${ButtonHandler({ param: `close` })} px-4 py-1 rounded`} text="Cancelar" ico={Icono({ ico: `close` })} />
                            <Button click={Download} customClass={`${ButtonHandler({ param: `report` })} px-4 py-1 rounded`} text={`Reporte "${options.label}"`} ico={Icono({ ico: `report` })} />
                        </div>
                        : <div className="flex justify-center items-center gap-5">
                            <Button customClass={`${ButtonHandler({ param: `close` })} px-4 py-1 rounded skeleton`} text="Cancelar" ico={Icono({ ico: `close` })} />
                            <Button customClass={`${ButtonHandler({ param: `default` })} px-4 py-1 rounded skeleton`} text="Seleccione una opción" ico={Icono({ ico: `load` })} />
                        </div>
            }


        </div>
    )
}
