import { FormEvent, useEffect, useState } from "react"
import { useModal } from "../../../_context/ModalContext";
import { useNotification } from "../../../_context/NotificationContext";
import Button from "../../../UI/_atom/Button";
import { RequestOptionsGetToken } from "../../../utils/req/RequetsOptions";
import { API } from "../../../entorno";
import { Icono } from "../../../_handler/IconHandler";
import Title from "../../../UI/_atom/Title";
import LabelInput from "../../../UI/_compound/LabelInput";
import Text from "../../../UI/_atom/Text";
import LabelSelect from "../../../UI/_compound/LabelSelect";
import { getToken } from "../../../utils/token";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import Subtitle from "../../../UI/_atom/Subtitle";
import { getUser } from "../../../utils/token copy";
import { useNavigate } from "react-router-dom";

interface Props {
    reload: () => void;
    h?: boolean
}

export default function ProjectCreate({ reload, h }: Props) {

    const user = JSON.parse(getUser());
    const modal = useModal();
    const noti = useNotification();
    const navigate = useNavigate();

    const [load, setLoad] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // datose
    const [data, setData] = useState<any>({});
    const [dataSelect, setDataSelect] = useState<any>({});
    const [dataAuthor, setDataAuthor] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);
    // const [portada, setPortada] = useState<File | null>(null);
    const [customPublic, setCustomPublic] = useState(false);
    const [downloader, setDownloader] = useState(false);
    // 

    useEffect(() => {
        const prev = [{ id:user.id, label:`${user.ci ? `${user.ci} - ` : ``} ${user.name} ${user.lastname}` }];
        setDataAuthor(prev);
    }, []);

    const [selectActive, setSelectActive] = useState(false);
    const [list, setList] = useState<{ id: string, label: string }[]>([]);
    const [param, setParam] = useState(``);
    const [loadSelect, setLoadSelect] = useState(true);

    useEffect(() => {
        setLoad(true);
        const Execute = async () => {
            const url = `${API}/select/estudiante/?param=${param ? param : ``}&ignore=${JSON.stringify(dataSelect)}`;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const json = await result.json();
            setList(json.list);
            setLoadSelect(false);
        }
        Execute();
    }, [param]);

    const HandleChangeSelect = ({ name, value }: { name: string, value: string }) => {
        const prev = { ...dataSelect, [name]: value }
        setDataSelect(prev)
    }

    const HandleSelectAuthors = ({ id, label }: { id: string, label: string }) => {
        const prev = dataAuthor;
        prev.push({ id, label });
        setDataAuthor(prev);
        setSelectActive(false);
    }

    const HandleChange = ({ name, value }: { name: string, value: string }) => setData({ ...data, [name]: value })

    const HanldeSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const Execute = async () => {
            setLoad(true);
            setError(null);

            // lógica
            const formData = new FormData();

            if (!file) return alert(`file`);
            // if (!portada) return alert(`portada`);
            if (!data[`title`]) return alert(`title`);
            if (!data[`resumen`]) return alert(`resumen`);
            if (!data[`keyword`]) return alert(`keyword`);
            // if (!data[`public`]) return alert(`public`);
            // if (!data[`downloader`]) return alert(`downloader`);
            if (!data[`date`]) return alert(`date`);
            // if (!dataSelect[`line`]) return alert(`line`);
            if (!dataSelect[`program`]) return alert(`program`);
            if (!dataAuthor) return alert(`autores`);

            const selects: string[] = [];
            dataAuthor.forEach((item) => {
                selects.push(item.id);
            })

            formData.append(`file`, file);
            // formData.append(`portada`, portada);
            formData.append(`title`, data[`title`]);
            formData.append(`resumen`, data[`resumen`]);
            formData.append(`keywords`, data[`keyword`]);
            formData.append(`date`, data[`date`]);

            if (dataSelect[`line`]) formData.append(`lineId`, dataSelect[`line`]);
            formData.append(`programId`, dataSelect[`program`]);

            formData.append(`userId`, JSON.stringify(selects));

            formData.append(`public`, JSON.stringify(customPublic));
            formData.append(`downloader`, JSON.stringify(downloader));

            const RequetsOptions = {
                method: `POST`,
                headers: {
                    // "Content-Type": "multipart/form-data",
                    token: `${getToken()}`
                },
                body: formData
            }
            const url = `${API}/project/create`;
            const result = await fetch(url, RequetsOptions);
            const json = await result.json() as { body: any, message: string, error: boolean };

            noti.setMessage({ active: true, message: json.message, type: json.error ? `error` : `success` })
            //
            modal.hidden();

            reload();

            navigate(`/project`)

            setLoad(false);
            setError(null);
            return;
            load;
            error;
        }

        Execute();
    }

    return (
        <form onSubmit={HanldeSubmit} className={`${h ? `min-h-[80vh]` : `h-[80vh]`}`}>
            <div className="flex justify-between">
                <Title customClass="text-2xl font-black mb-2 text-center" text="Crear Trabajo" />

                <Button type="submit" ico={Icono({ ico: `create` })} text="Crear" customClass={`${ButtonHandler({ param: `create` })} p-3 flex gap-3 items-center b`} />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 p-4">
<<<<<<< HEAD

=======
                
>>>>>>> 6a4110e77398bcb379bf0b7ecde18a05b4ea1ee6
                <label className="form-control w-full relative">
                    <div className="label">
                        <Text customClass="label-text text-lg font-semibold" text={`Autores (${dataAuthor.length})`} />
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </div>

                    <Button click={() => setSelectActive(!selectActive)} customClass="input w-full border border-slate-400 outline-none flex justify-center items-center h-full" ico={Icono({ ico: `student` })} text={`Autores`} />
                    <ul className={`z-10 absolute w-full bg-white border rounded-b-xl top-[70px] p-1 duration-300 overflow-auto ${selectActive ? `scale-1 max-h-52` : `scale-0 h-0`}`}>
                        <div className="">
                            <Subtitle customClass="text-sm text-gray-400 font-black" text="Autores" />
                            <div className="flex justify-center items-center gap-3 flex-wrap">
                                {
                                    dataAuthor && dataAuthor.map((autor) => (
                                        <Button
                                            click={() => {
                                                const prev = dataAuthor.filter(item => item.id !== autor.id);
                                                setDataAuthor(prev);
                                            }}
                                            customClass="badge badge-xs bg-slate-500 py-2 px-4 font-bold text-white"
                                            text={autor.label}
                                        />
                                    ))
                                }
                            </div>
                        </div>
              

                
                        <input value={param} onChange={(e) => setParam(e.target.value)} placeholder="Escriba para buscar" className="outline-none border border-slate-400 w-full rounded p-2" name="search" type="text" />
                        {
                            loadSelect
                                ? <>loadSelect</>
                                : list
                                    ? list.map((item) => (
                                        <>
                                            {
                                                dataAuthor.includes((autor: any) => autor.id === item.id)
                                                ? <>1</>
                                                : <Button
                                                    click={() => { HandleSelectAuthors(item) }}
                                                    customClass="w-full py-1 text-center text-xs font-bold"
                                                    text={item.label}
                                                />
                                            }
                                        </>
                                    ))
                                    : <>no hay resultados</>
                        }
                    </ul>

<<<<<<< HEAD
   <LabelInput
=======
                      <LabelInput
>>>>>>> 6a4110e77398bcb379bf0b7ecde18a05b4ea1ee6
                    label="Título"
                    type="text"
                    change={HandleChange}
                    customClass="input w-full border border-slate-400 outline-none"
                    name="title"
                    placeholder="Título..."
                    value={data[`title`] ? data[`title`] : ``}
                />
<<<<<<< HEAD

                    <div className="label">
                        {/* <Text customClass="label-text-alt" text={downText ? downText : ``} /> */}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </div>
                </label>

                <div className="grid w-full grid-cols-2 place-items-center">

                      <div className="grid w-full max-w-xs items-center gap-1.5">
                    <label className="label-text text-lg font-semibold">Resumen de Trabajo</label>
                    <input
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                const file = e.target.files[0] as File;
                                setFile(file);
                            }
                        }}
                        id="picture"
                        type="file"
                        name="file"
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
                    </div>
                
                    <br></br>
                    
=======
                    
                <div className="grid w-full max-w-xs items-center gap-1.5">
                    <label className="label-text text-lg font-semibold">Resumen de Trabajo</label>
                    <input
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                const file = e.target.files[0] as File;
                                setFile(file);
                            }
                        }}
                        id="picture"
                        type="file"
                        name="file"
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
                    <br></br>
                </div>
                 
                <div className="grid w-full grid-cols-2 place-items-center">
                   
>>>>>>> 6a4110e77398bcb379bf0b7ecde18a05b4ea1ee6
                    <label className="gap-3 flex">
                        <span>¿Público?</span>
                        <input onChange={(e) => setCustomPublic(e.target.checked ? true : false)} type="checkbox" name="public" />
                    </label>
                    <label className="gap-3 flex">
                        <span>Descargable?</span>
                        <input onChange={(e) => setDownloader(e.target.checked ? true : false)} type="checkbox" name="public" />
                    </label>
                    {/* <label className="label-text text-lg font-semibold">Portada</label>
                    <input
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                const file = e.target.files[0] as File;
                                setPortada(file);
                            }
                        }}
                        id="picture"
                        type="file"
                        name="file"
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" /> */}
                </div>

<<<<<<< HEAD
             

                <LabelInput
=======
              <LabelInput
>>>>>>> 6a4110e77398bcb379bf0b7ecde18a05b4ea1ee6
                    label="Fecha"
                    type="date"
                    change={HandleChange}
                    customClass="input w-full border border-slate-400 outline-none"
                    name="date"
                    placeholder="Título..."
                    value={data[`date`] ? data[`date`] : ``}
                />

                <LabelInput
                    label="Palabras Clave"
                    type="text"
                    change={HandleChange}
                    customClass="input w-full border border-slate-400 outline-none"
                    name="keyword"
                    placeholder="Palabras clave"
                    value={data[`keyword`] ? data[`keyword`] : ``}
                />

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
                    query={dataSelect[`category`] ? `category=${dataSelect[`category`]}` : undefined}
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

                <label className="form-control w-full lg:col-span-2">
                    <div className="label">
                        <Text customClass="label-text text-lg font-semibold" text={`Resúmen`} />
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </div>
                    <textarea name="resumen" className="min-h-[100px] max-h-[100px] input w-full border border-slate-400 outline-none" placeholder="Resúmen" onChange={(e) => HandleChange({ name: e.target.name, value: e.target.value })}>{data[`resumen`]}</textarea>
                    <div className="label">
                        {/* <Text customClass="label-text-alt" text={downText ? downText : ``} /> */}
                        {/* <span className="label-text-alt">Bottom Right label</span> */}
                    </div>
                </label>

            </div>
        </form>
    )
}
