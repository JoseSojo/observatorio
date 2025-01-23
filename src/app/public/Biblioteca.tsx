import { useEffect, useState } from "react";
import Button from "../../UI/_atom/Button";
import NavbarPublic from "./NavbarPublic";
import { API } from "../../entorno";
import { RequestOptionsGetToken } from "../../utils/req/RequetsOptions";
import Input from "../../UI/_atom/Input";
import CardLibrary from "../../UI/_compound/CardLibrary";
import PublicCard from "./PublicCard";
import ArrowLeft from "../../UI/AnimateIcons/ArrowLeft";
import LoaderAnimate from "../../UI/AnimateIcons/LoadAnimate";
import CheckAnimate from "../../UI/AnimateIcons/CheckAnimate";
// import PublicGraphic from "./PublicGraphic";
import Subtitle from "../../UI/_atom/Subtitle";
import FooterPublic from "./FooterPublic";

export default function Biblioteca() {

    const [load, setLoad] = useState(true);
    const [list, setList] = useState<any[]>([]);
    const [dataList, setDataList] = useState<string[]>([]);

    const [param, setParam] = useState(``);

    // const [count, setCount] = useState(0);
    const [now, setNow] = useState(0);
    const [next, setNext] = useState(false);
    const [previws, setPreviws] = useState(false);

    // const [skip, setSkip] = useState(0);
    // const [take, setTake] = useState(10);

    const [valueCategory, setValueCategory] = useState(``);
    const [categorys, setCategorys] = useState<any[] | null>();
    const [categorySelect, setCategorySelect] = useState<string | null>(null);
    const [count, setCount] = useState<string | number>(``)

    const [valueProgram, setValueProgram] = useState(``);
    const [programs, setPrograms] = useState<any[] | null>();
    const [programSelect, setProgramSelect] = useState<string | null>(null);

    const [reload, setReload] = useState(true);

    const HandleReload = () => setReload(!reload);

    const Reset = () => {
        setProgramSelect(null);
        setCategorySelect(null);
        setParam(``);
        HandleReload();
        return;
        dataList
        now
        next
        previws
    }

    const HandleChangeParam = ({ value }: { name: string, value: string }) => {
        setValueCategory(value);
    }

    const HandleChangeParamProgram = ({ value }: { name: string, value: string }) => {
        setValueProgram(value);
    }

    const HandleSelectCategory = (id: string) => {
        setCategorySelect(id);
        HandleReload();
    }

    const HandleSelectProgram = (id: string) => {
        setProgramSelect(id);
        HandleReload();
    }

    useEffect(() => {
        const ExecuteCategory = async () => {
            const url = `${API}/public/category/?skip=0&take=200&param=${valueCategory}`;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const json = await result.json();
            setCategorys(json.body.list);
        }
        const ExecuteProgram = async () => {
            const url = `${API}/public/program/?skip=0&take=10&param=${valueProgram}&category=${categorySelect ? categorySelect : ``}`;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const json = await result.json();
            setPrograms(json.body.list);
        }
        ExecuteProgram();
        ExecuteCategory();
    }, [valueCategory, valueProgram]);

    const HandleChange = ({ value }: { name: string, value: string }) => {
        setParam(value);
        if (value.length > 3) HandleReload();
    }

    /**
     * BUSCAR LIBROS PÚBLICOS
     */
    useEffect(() => {
        const Execute = async () => {
            setLoad(true);
            let queryString = ``;

            if (param.length > 4) queryString += `&param=${param}`;
            if (categorySelect) queryString += `&category=${categorySelect}`;
            if (programSelect) queryString += `&program=${programSelect}`;

            const url = `${API}/public/project/?skip=0&take=200${queryString}`;
            const req = RequestOptionsGetToken({ method: `GET` });
            const result = await fetch(url, req);
            const jsonPromise = result.json();

            if (!result.ok) {
                const jsonError = await jsonPromise;
                return jsonError
            }

            setList([]);

            const json = await jsonPromise;
            setList(json.body.list);
            setCount(Number(json.body.count));
            setNow(json.body.now);
            setNext(json.body.next ? true : false);
            setPreviws(json.body.previous ? true : false);
            setDataList(json.body.dataList);
            setLoad(false);
        }
        Execute();
    }, [reload])

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <header>
                <NavbarPublic changeSearch={HandleChange} reload={() => setReload(!reload)} />
            </header>

            <div className="grid p-3 gap-3">

                <div className="grid grid-cols-1 lg:grid-cols-3 place-content-center gap-3">
                    <PublicCard />

                    <section className="col-span-3 flex justify-end gap-5 items-center">
                        <span className="text-md font-light text-slate-600 flex gap-3 border border-slate-50 px-2 py-3 rounded">
                            Resultados <b className="font-black">{count}</b> <CheckAnimate size={28} />
                        </span>
                        <span className="text-md font-light text-slate-600 flex gap-3 border border-slate-50 px-2 py-3 rounded">
                            Filtros <ArrowLeft size={28} />
                        </span>
                        <details className="dropdown">
                            <summary className="btn bg-gray-50 hover:bg-sky-100 border-0 text-sm">Categorías</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] -left-28 w-52 p-2 shadow">
                                <Input change={HandleChangeParam} name="category" type="text" customClass="p-3 py-2 rounded outline-none border w-full" />
                                {
                                    categorys && categorys.map((item, i) => (
                                        <li>
                                            <Button
                                                click={() => HandleSelectCategory(item.id)}
                                                key={i}
                                                text={item.name}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </details>
                        <details className="dropdown">
                            <summary className="btn bg-gray-50 hover:bg-sky-100 border-0 text-sm">Programas</summary>
                            <ul className="menu dropdown-content grid bg-base-100 rounded-box z-[1] -left-36 w-64 p-2 shadow max-h-[200px] overflow-y-auto">
                                <Input change={HandleChangeParamProgram} name="category" type="text" customClass="p-3 py-2 rounded outline-none border w-full" />
                                {
                                    programs && programs.map((item, i) => (
                                        <li>
                                            <Button
                                                click={() => HandleSelectProgram(item.id)}
                                                key={i}
                                                text={item.name}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </details>
                        <Button
                            customClass="btn btn-warning"
                            click={() => Reset()}
                            text="limpiar"
                        />
                    </section>

                </div>
            </div>

            <main className={`mt-5`}>

                <Subtitle customClass="text-center w-full font-light text-2xl" text="Resultados de busqueda" />

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:p-5 p-3 lg:gap-5 gap-3">
                    {
                        load ?
                            <div className="flex justify-center md:col-span-2 lg:col-span-3 xl:col-span-4">
                                <LoaderAnimate size={80} />
                            </div>
                            : list && list.map((item) => <CardLibrary item={item} />)
                    }
                </section>

            </main>

            <FooterPublic />
        </div>
    )
}
