import { useState } from "react";
import Title from "../../UI/_atom/Title";
import LabelSelect from "../../UI/_compound/LabelSelect";
import Button from "../../UI/_atom/Button";
import ButtonHandler from "../../_handler/ButtonsHandler";
import { Icono } from "../../_handler/IconHandler";
import LabelInput from "../../UI/_compound/LabelInput";
import { ReportInterface } from "../../types/report/ReportInterface";
import { useModal } from "../../_context/ModalContext";
import ReportDocument from "./ReportDocument";
import { API } from "../../entorno";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";

export default function ReportProject() {

    const modal = useModal();

    const [data, setData] = useState<any>({});
    const [report, setReport] = useState<ReportInterface | null>(null);
    const [load, setLoad] = useState(false);

    const HandleChangeSelect = ({ name, value }: { name: string, value: string }) => {
        const prev = { ...data, [name]: value }
        setData(prev)
    }

    const Execute = async (cb: () => void) => {
        setLoad(true);
        let query = ``;
        if(data[`category`]) query += `&category=${data[`category`]}`;
        if(data[`line`]) query += `&line=${data[`line`]}`;
        if(data[`program`]) query += `&program=${data[`program`]}`;
        if(data[`dateEnd`]) query += `&dateEnd=${data[`dateEnd`]}`;
        if(data[`dateStart`]) query += `&dateStart=${data[`dateStart`]}`;

        const url = `${API}/report/?${query}`;
        const req = RequestOptionsGetToken({ method:`GET` });

        const result = await fetch(url, req);
        const json = await result.json() as ReportInterface;
        setReport(json);
        setLoad(false);
        cb();
        return;
        
    }

    const HandleClick = async () => {
        const callback = () => {
            if(!report) return;
            modal.show(<ReportDocument filter={data} item={report} />);
        }
        await Execute(callback);
    }

    return (
        <div className="w-full h-full p-5 bg-slate-50 rounded-lg grid place-items-center">
            <div className="flex justify-between items-center w-[90%] lg:w-[50%]">
                <Title customClass="text-2xl font-bold text-slate-800" text="Generar Reporte" />

                <ul>
                    <li>
                    </li>
                </ul>
            </div>

            <div className="w-[90%] lg:w-[50%]">
                <LabelSelect
                    change={HandleChangeSelect}
                    downText=""
                    select={{
                        id: `select.project.category`,
                        key: `select.project.category`,
                        label: `Categoría`,
                        name: `category`,
                        placeholder: `Seleccionar categoría`,
                        select: true,
                        required: false,
                        selectIn: `category`,
                        type: ``
                    }}
                />

                <LabelSelect
                    change={HandleChangeSelect}
                    downText=""
                    query={data[`category`] ? `category=${data[`category`]}` : undefined}
                    select={{
                        id: `select.project.program`,
                        key: `select.project.program`,
                        label: `Programa`,
                        name: `program`,
                        placeholder: `Seleccionar programa`,
                        select: true,
                        required: false,
                        selectIn: `program`,
                        type: ``,
                    }}
                />

                <LabelSelect
                    change={HandleChangeSelect}
                    downText=""
                    select={{
                        id: `select.project.line`,
                        key: `select.project.line`,
                        label: `Línea de investigación`,
                        name: `line`,
                        placeholder: `Seleccionar Línea de investigación`,
                        select: true,
                        required: false,
                        selectIn: `line`,
                        type: ``
                    }}
                />

                <div className="flex justify-between items-center gap-3">
                    <LabelInput
                        label="Desde"
                        type="date"
                        change={HandleChangeSelect}
                        name="dateStart"
                        placeholder=""
                        value={data[`dateStart`]}
                    />
                    <LabelInput
                        label="Hasta"
                        type="date"
                        change={HandleChangeSelect}
                        name="dateEnd"
                        placeholder=""
                        value={data[`dateEnd`]}
                    />
                </div>

                <Button 
                    click={HandleClick} 
                    customClass={`${ButtonHandler({ param: `report` })}`} 
                    text={ report ? `Descargar` : load ? `Generando...` : "Generar Reporte"} 
                    ico={Icono({ ico: `report` })}
                    />

            </div>

        </div>
    )
} 
