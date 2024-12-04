import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import CustomSelect from "./component/CustomSelect";
import { useNotification } from "../../../_context/NotificationContext";
import Button from "../../_atom/Button";
import { API } from "../../../entorno";
import { getToken } from "../../../utils/token";
import CustomInput from "./component/CustomInput";
import ButtonHandler from "../../../_handler/ButtonsHandler";

interface Contact_Data_Interface {
    phone?: string,
    phone2?: string,
    email?: string,
    email2?: string
}

interface Residence_Data_Interface {
    state?: {
        label: string,
        value: string,
        name: string
    },
    municipio?: {
        label: string,
        value: string,
        name: string
    },
    parroquia?: {
        label: string,
        value: string,
        name: string
    },
}

interface Perosnal_Data_Interface {
    name?: string;
    name2?: string;
    lastname?: string;
    lastname2?: string;
    nacionality?: string;
    ci?: string;
    birthdate?: string;
    age?: string;
    civil?: string;
    sex?: string;
}

interface Props {
    user: any;
    userId: string;
    update: boolean;
}

export default function DataUser({ userId, update }: Props) {

    const noti = useNotification();

    const NotiError = (message: string) => noti.setMessage({ active: true, message, type: `error` });
    const NotiSuccess = (message: string) => noti.setMessage({ active: true, message, type: `success` });

    const [personalData, setPersonalData] = useState<Perosnal_Data_Interface | null>(null);
    const [contactData, setContactData] = useState<Contact_Data_Interface | null>(null);
    const [residence, setResidense] = useState<Residence_Data_Interface | null>(null);

    const [personalData2, setPersonalData2] = useState<Perosnal_Data_Interface | null>(null);
    const [contactData2, setContactData2] = useState<Contact_Data_Interface | null>(null);
    const [residence2, setResidense2] = useState<Residence_Data_Interface | null>(null);

    const SetResidenseData = ({ label, value, name }: { label: string, value: string, name: string }) => {
        // const prev = residence ? { ...residence, [name]:value } : { [name]:value }
        if (update) return;
        const prev = residence
            ? { ...residence, [name]: { label, value, name } }
            : { [name]: { label, value, name } }
        setResidense(prev);
    }

    const ChangeContactData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (update) return;
        const prev = contactData ? { ...contactData, [e.target.name]: e.target.value } : { [e.target.name]: e.target.value };
        setContactData(prev);
    }

    const ChangePersonalData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (update) return;
        const prev = personalData ? { ...personalData, [e.target.name]: e.target.value } : { [e.target.name]: e.target.value };
        setPersonalData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (update) return NotiError(`No puedes actualizar.`);

        // validar datos
        if (!personalData) return NotiError(`Debes completar los datos personales.`);
        if (!contactData) return NotiError(`Debes completar los datos de contacto.`);
        if (!residence) return NotiError(`Debes completar los datos de recidencia.`);

        if (!personalData.age) return NotiError(`Debes agregar tu edad.`);
        if (!personalData.birthdate) return NotiError(`Debes agregar tu fecha de nacimiento.`);
        if (!personalData.ci) return NotiError(`Debes agregar tu cédula.`);
        if (!personalData.civil) return NotiError(`Debes agregar tu estado civíl.`);
        if (!personalData.lastname2) return NotiError(`Debes agregar tu segundo apellido.`);
        // if (!personalData.lastname) return NotiError(`Debes agregar tu apellido.`);
        if (!personalData.name2) return NotiError(`Debes agregar tu segundo nombre.`);
        // if (!personalData.name) return NotiError(`Debes agregar tu nombre.`);
        if (!personalData.sex) return NotiError(`Debes agregar tu sexo.`);

        if (!contactData.email2) return NotiError(`Debes agregar tu correo alternativo.`);
        if (!contactData.email) return NotiError(`Debes agregar tu correo principal.`);
        if (!contactData.phone2) return NotiError(`Debes agregar tu teléfono alternativo.`);
        // if (!contactData.phone) return NotiError(`Debes agregar tu teléfono principal.`);

        const ExecuteRequets = async () => {
            const url = `${API}/user/${userId}/update`;
            const data = {
                ...contactData,
                ...personalData,
                residence
            }
            const req = {
                method: `PUT`,
                headers: {
                    "Content-Type": "application/json",
                    token: `${getToken()}`
                },
                body: JSON.stringify(data)
            };
            const result = await fetch(url, req);
            const json = await result.json();
            if (!result.ok || json.error) NotiError(`Error al actualizar tus datos`);

            NotiSuccess(`Datos Actualizados exitosamente.`);
        }
        ExecuteRequets();
    }

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}/user/${userId}/unique`;
            const req = { method: `GET`, headers: { "token": `${getToken()}` } };
            const result = await fetch(url, req);
            const json = await result.json() as { body: any, error: boolean, message: string };

            if (json.body) {
                setPersonalData2({
                    age: json.body.age,
                    birthdate: json.body.birtdate ? json.body.birtdate.split(`T`)[0] : undefined,
                    ci: json.body.ci,
                    civil: json.body.estadoCivil,
                    lastname: json.body.lastname,
                    lastname2: json.body.secondLastname,
                    nacionality: json.body.nacionality,
                    name: json.body.name,
                    name2: json.body.secondName,
                    sex: json.body.sexo,
                });

                setContactData2({
                    email: json.body.email,
                    email2: json.body.email2,
                    phone: json.body.phone,
                    phone2: json.body.phone2,
                });

                setResidense2({
                    municipio: {
                        label: json.body.parroquiaReference.municipioReference.name,
                        name: `municipio`,
                        value: json.body.parroquiaReference.municipioReference.id,
                    },
                    parroquia: {
                        label: json.body.parroquiaReference.name,
                        name: `parroquia`,
                        value: json.body.parroquiaReference.id
                    },
                    state: {
                        label: json.body.parroquiaReference.municipioReference.stateReference.name,
                        name: `estado`,
                        value: json.body.parroquiaReference.municipioReference.stateReference.id,
                    }
                });

                setPersonalData({
                    age: json.body.age,
                    birthdate: json.body.birtdate ? json.body.birtdate.split(`T`)[0] : undefined,
                    ci: json.body.ci,
                    civil: json.body.estadoCivil,
                    lastname: json.body.lastname,
                    lastname2: json.body.secondLastname,
                    nacionality: json.body.nacionality,
                    name: json.body.name,
                    name2: json.body.secondName,
                    sex: json.body.sexo,
                });

                setContactData({
                    email: json.body.email,
                    email2: json.body.email2,
                    phone: json.body.phone,
                    phone2: json.body.phone2,
                });

                setResidense({
                    municipio: {
                        label: json.body.parroquiaReference.municipioReference.name,
                        name: `municipio`,
                        value: json.body.parroquiaReference.municipioReference.id,
                    },
                    parroquia: {
                        label: json.body.parroquiaReference.name,
                        name: `parroquia`,
                        value: json.body.parroquiaReference.id
                    },
                    state: {
                        label: json.body.parroquiaReference.municipioReference.stateReference.name,
                        name: `estado`,
                        value: json.body.parroquiaReference.municipioReference.stateReference.id,
                    }
                });
            }

        }
        ExecuteRequets();
    }, [])

    return (
        <form onSubmit={HandleSubmit} className="grid grid-cols-12 gap-3">

            {/* INICIO DATOS PERSONALES */}

            <Subtitle customClass=" text-xl font-black text-blue-800" text="" />

            <div className="flex justify-between items-center col-span-12">
                <Subtitle customClass="text-xl font-black text-blue-800 mt-4" text="Datos personales" />

                {
                    update &&
                    <Button
                        type="submit"
                        customClass={`${ButtonHandler({ param: `create` })} btn-sm col-span-2`}
                        text="Actualizar datos"
                    />
                }
            </div>

            <label className="flex flex-col col-span-1">
                <span className="text-sm font-semibold">Nac.</span>
                {
                    personalData2 && personalData2.nacionality
                        ? <div className="input input-sm border border-gray-800 outline-none bg-gray-300 select-none">{personalData2.nacionality}</div>
                        : <select onChange={ChangePersonalData} name="nacionality" className="input input-sm border border-gray-600 outline-none">
                            <option></option>
                            <option selected={personalData && personalData.nacionality === `V` ? true : false}>V</option>
                            <option selected={personalData && personalData.nacionality === `E` ? true : false}>E</option>
                        </select>
                }

            </label>

            <CustomInput
                cols="3"
                change={ChangePersonalData}
                name="ci"
                label="Cédula"
                type="text"
                value={personalData2 && personalData2.ci ? personalData2.ci : ``}
            />

            <CustomInput
                cols="4"
                change={ChangePersonalData}
                name="name"
                label="Primer Nombre"
                type="text"
                value={personalData2 && personalData2.name ? personalData2.name : ``}
            />
            <CustomInput
                cols="4"
                change={ChangePersonalData}
                name="name2"
                label="Segundo Nombre"
                type="text"
                value={personalData2 && personalData2.name2 ? personalData2.name2 : ``}
            />
            <CustomInput
                cols="5"
                change={ChangePersonalData}
                name="lastname"
                label="Primer Apellido"
                type="text"
                value={personalData2 && personalData2.lastname ? personalData2.lastname : ``}
            />
            <CustomInput
                cols="5"
                change={ChangePersonalData}
                name="lastname2"
                label="Segundo Apellido"
                type="text"
                value={personalData2 && personalData2.lastname2 ? personalData2.lastname2 : ``}
            />
            <CustomInput
                cols="2"
                change={ChangePersonalData}
                name="age"
                label="Edad"
                type="text"
                value={personalData2 && personalData2.age ? personalData2.age : ``}
            />
            <CustomInput
                cols="4"
                change={ChangePersonalData}
                name="birthdate"
                label="Fecha de nacimiento"
                type="date"
                value={personalData2 && personalData2.birthdate ? personalData2.birthdate : ``}
            />


            <label className="flex flex-col col-span-4">
                <span className="text-sm font-semibold">Estado Civíl</span>
                {
                    personalData2 && personalData2.civil
                        ? <div className="input input-sm border border-gray-800 outline-none bg-gray-300 select-none">{personalData2.civil}</div>
                        : <select onChange={ChangePersonalData} name="civil" className="input input-sm border border-gray-600 outline-none">
                            <option></option>
                            <option selected={personalData && personalData.civil === `Soltero` ? true : false}>Soltero</option>
                            <option selected={personalData && personalData.civil === `Casado` ? true : false}>Casado</option>
                            <option selected={personalData && personalData.civil === `Divorciado` ? true : false}>Divorciado</option>
                            <option selected={personalData && personalData.civil === `Viudo` ? true : false}>Viudo</option>
                        </select>
                }
            </label>

            <label className="flex flex-col col-span-4">
                <span className="text-sm font-semibold">Sexo</span>
                {
                    personalData2 && personalData2.sex
                        ? <div className="input input-sm border border-gray-800 outline-none bg-gray-300 select-none">{personalData2.sex}</div>
                        : <select onChange={ChangePersonalData} name="sex" className="input input-sm border border-gray-600 outline-none">
                            <option></option>
                            <option selected={personalData && personalData.sex === `Masculino` ? true : false}>Masculino</option>
                            <option selected={personalData && personalData.sex === `Femenino` ? true : false}>Femenino</option>
                        </select>
                }
            </label>

            {/* FIN DATOS PERSONALES */}

            {/* INICIO DATOS RECIDENCIA */}

            <Subtitle customClass="col-span-12 text-xl font-black text-blue-800 mt-4" text="Datos Residencia" />

            <CustomSelect
                change={SetResidenseData}
                select="estado"
                label="Estados"
                initSelect={residence2 && residence2.state ? { id: residence2.state.value, label: residence2.state.label } : null}
            />

            <CustomSelect
                change={SetResidenseData}
                select="municipio"
                label="Minucupios"
                initSelect={residence2 && residence2.municipio ? { id: residence2.municipio.value, label: residence2.municipio.label } : null}
            />

            <CustomSelect
                change={SetResidenseData}
                select="parroquia"
                label="Parroquia"
                initSelect={residence2 && residence2.parroquia ? { id: residence2.parroquia.value, label: residence2.parroquia.label } : null}
            />

            {/* FIN DATOS RECIDENCIA */}

            {/* INICIO DATOS CONTACTO */}

            <Subtitle customClass="col-span-12 text-xl font-black text-blue-800 mt-4" text="Datos Contacto" />

            <CustomInput
                cols="3"
                change={ChangeContactData}
                name="phone"
                label="Teléfono"
                type="number"
                value={contactData2 && contactData2.phone ? contactData2.phone : ``}
            />

            <CustomInput
                cols="3"
                change={ChangeContactData}
                name="phone2"
                label="Teléfono Alternativo"
                type="number"
                value={contactData2 && contactData2.phone2 ? contactData2.phone2 : ``}
            />

            <CustomInput
                cols="3"
                change={ChangeContactData}
                name="email"
                label="Correo"
                type="text"
                value={contactData2 && contactData2.email ? contactData2.email : ``}
            />

            <CustomInput
                cols="3"
                change={ChangeContactData}
                name="email2"
                label="Correo Alternativo"
                type="text"
                value={contactData2 && contactData2.email2 ? contactData2.email2 : ``}
            />

            {/* FIN DATOS CONTACTO */}
        </form>
    )
}
