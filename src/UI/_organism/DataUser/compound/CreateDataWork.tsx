import { ChangeEvent, FormEvent, useState } from "react"
import ButtonHandler from "../../../../_handler/ButtonsHandler"
import { Icono } from "../../../../_handler/IconHandler"
import Button from "../../../_atom/Button"
import Subtitle from "../../../_atom/Subtitle"
import { useModal } from "../../../../_context/ModalContext"
import { RequestOptionsCreateToken } from "../../../../utils/req/RequetsOptions"
import { API } from "../../../../entorno"
import { useNotification } from "../../../../_context/NotificationContext"

interface Props {
    reload: () => void
}

export default function CreateDataWork ({reload}:Props) {

    const modal = useModal();
    const noti = useNotification();

    const [data, setData] = useState<any>({});

    const HandleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const prev = {...data, [e.target.name]: e.target.value};
        setData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if(!data.actual) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Actual"` });
        if(!data.tipoInstitucion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Tipo Institución"` });
        if(!data.institucion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Institución"` });
        if(!data.ocupacion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Ocupación"` });
        if(!data.cargo) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Cargo"` });
        if(!data.dateStart) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Fecha Inicio"` });
        // if(!data.dateEnd) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Fecha Fin"` });

        const customData = {
            actual: data.actual ? true : false,
            tipoInstitucion: data.tipoInstitucion,
            // yearEnd: data.yearEnd ? data.yearEnd : undefined, 
            ocupacion: data.ocupacion,
            institucion: data.institucion,
            dateEnd: data.dateEnd,
            cargo: data.cargo,
            dateStart: data.dateStart,
        }

        const ExecuteAsync = async () => {
            const url = `${API}/work/create`;
            const req = RequestOptionsCreateToken({method:`post`,body:customData});

            const result = await fetch(url, req);
            const json = await result.json();

            if(!result.ok || json.error) {
                if(json.message) {
                    modal.hidden();
                    noti.setMessage({ active:true,message:json.message,type:`error` })
                    return;
                }
                modal.hidden();
                noti.setMessage({ active:true,message:`Oops. hubo un error al crear`,type:`error` })
                return;
            }

            reload();
            modal.hidden();
        }
        ExecuteAsync();
    }

    return (
        <form onSubmit={HandleSubmit} className="gap-3 overflow-y-auto w-full lg:w-[80%] m-auto bg-white rounded p-3 grid place-items-center md:grid-cols-2 xl:grid-cols-3">
            <Subtitle text="Registrar Perfil Educativo" customClass="lg:col-span-2 xl:col-span-3 text-xl mb-3 text-gray-800" />

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Trabajo actual</label>
                <input onChange={HandleChange} name="actual" type="checkbox" className="checkbox m-auto border border-gray-400" />
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Tipo de institución</label>
                <select onChange={HandleChange} name="tipoInstitucion" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>GOBIERNO</option>
                    <option>EMPRESA PRIVADA</option>
                    <option>EMPRESA PÚBLICA</option>
                    <option>EMPRESA MIXTA</option>
                    <option>EDUCACIÓN UNIVERSITARIA</option>
                    <option>ORGANIZACIÓN NO GUBERNAMENTAL</option>
                    <option>PODER POPULAR</option>
                  
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Institución</label>
                <select onChange={HandleChange} name="institucion" className="select select-sm border border-gray-400">
                    <option value={``}></option>

                    {/*inistitucion de tipo gobierno */}
                    <option>ACADEMIA DE CIENCIAS AGRÍCOLAS DE VENEZUELA (ACAV)</option>
                    <option>AGENCIA BOLIVARIANA PARA ACTIVIDADES ESPACIALES (ABAE)</option>
                    <option>ALCALDÍA BOLIVARIANA DEL MUNICIPIO ANACO</option>
                    <option>ALCALDÍA BOLIVARIANA DEL MUNICIPIO GUANIPA</option>
                    <option>ALCALDÍA BOLIVARIANA DEL MUNICIPIO SIMÓN BOLÍVAR</option>
                    <option>ALCALDÍA DE MUNICIPIO SUCRE DEL ESTADO PORTUGUESA</option>
                    <option>ALCALDÍA DEL MUNICIPIO TURÉN</option>
                    <option>ALCALDÍA DEL MINICIPIO BOLÍVAR DEL ESTADO TRUJILLO</option>
                    <option>ALCALDÍA DEL MUNICIPIO MEJÍAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO LIBERTADOR DEL ESTADO TÁCHIRA</option>
                    <option>ALCALDÍA DEL MUNCIPIO ALMIRANTE PADILLA</option>
                    <option>ALCALDÍA DEL MUNCIPIO CARACHE</option>
                    <option>ALCALDÍA DEL MUNCIPIO GUAJIRA</option>
                    <option>ALCALDÍA DEL MUNCIPIO INDEPENDENCIA</option>
                    <option>ALCALDÍA DEL MUNCIPIO MACHIQUES DE PERIJÁ</option>
                    <option>ALCALDÍA DEL MUNCIPIO SAN FRANCISCO</option>
                    <option>ALCALDÍA DEL MUNCIPIO VALMORE RODRÍGUEZ</option>
                    <option>ALCALDÍA DEL MUNICIPIO CAMPOS ELÍAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO TORREALBA</option>
                    <option>ALCALDÍA DEL MUNICIPIO VALERA</option>
                    <option>ALCALDÍA DEL MUNICIPIO ACEVEDO</option>
                    <option>ALCALDÍA DEL MUNICIPIO ACHAGUAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO ACOSTA  DEL ESTADO FALCÓN</option>
                    <option>ALCALDÍA DEL MUNICIPIO ACOSTA DEL ESTADO MONAGAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO ADRIANI</option>
                    <option>ALCALDÍA DEL MUNICIPIO AGUA BLANCA</option>
                    <option>ALCALDÍA DEL MUNICIPIO AGUASAY</option>
                    <option>ALCALDÍA DEL MUNICIPIO ALTO ORINOCO</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANDRÉS BELLO DEL ESTADO MÉRIDA</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANDRÉS BELLO DEL ESTADO MIRANDA</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANDRÉS BELLO DEL ESTADO TÁCHIRA</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANDRÉS BELLO DEL ESTADO TRUJILLO</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANDRÉS ELOY BLANCO DEL ESTADO BARINAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANDRÉS ELOY BLANCO DEL ESTADO LARA </option>
                    <option>ALCALDÍA DEL MUNICIPIO ANDRÉS ELOY BLANCO DEL ESTADO SUCRE</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANDRÉS MATA</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANGOSTURA</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANTOLÍN DEL CAMPO</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANTONIO DÍAZ</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANTONIO JOSÉ DE SUCRE</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANTONIO RÓMULO ACOSTA</option>
                    <option>ALCALDÍA DEL MUNICIPIO ANZOÁTEGUI DEL ESTADO COJEDES</option>
                    <option>ALCALDÍA DEL MUNICIPIO ARAGUA</option>
                    <option>ALCALDÍA DEL MUNICIPIO ARAURE</option>
                    <option>ALCALDÍA DEL MUNICIPIO ARICAGUA</option>
                    <option>ALCALDÍA DEL MUNICIPIO ARISMENDI DEL ESTADO  SUCRE </option>
                    <option>ALCALDÍA DEL MUNICIPIO ARISMENDI DEL ESTADO BARINAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO ARISMENDI DEL ESTADO NUEVA ESPARTA </option>
                    <option>ALCALDÍA DEL MUNICIPIO ATURES</option>
                    <option>ALCALDÍA DEL MUNICIPIO AUTÓNOMO AUTANA</option>
                    <option>ALCALDÍA DEL MUNICIPIO AUTÓNOMO DE RÍO NEGRO</option>
                    <option>ALCALDÍA DEL MUNICIPIO AYACUCHO</option>
                    <option>ALCALDÍA DEL MUNICIPIO BARALT</option>
                    <option>ALCALDÍA DEL MUNICIPIO BARINAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO BARUTA</option>
                    <option>ALCALDÍA DEL MUNICIPIO BASTIDAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO BAUTISTA URBANEJA</option>
                    <option>ALCALDÍA DEL MUNICIPIO BEJUMA</option>
                    <option>ALCALDÍA DEL MUNICIPIO BENÍTEZ</option>
                    <option>ALCALDÍA DEL MUNICIPIO BERMÚDEZ</option>
                    <option>ALCALDÍA DEL MUNICIPIO BIRUACA</option>
                    <option>ALCALDÍA DEL MUNICIPIO BOCONÓ</option>
                    <option>ALCALDÍA DEL MUNICIPIO BOLÍVAR DEL ESTADO ARAGUAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO BOLÍVAR DEL ESTADO BARINAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO BOLÍVAR DEL ESTADO FALCÓN</option>
                    <option>ALCALDÍA DEL MUNICIPIO BOLÍVAR DEL ESTADO MIRANDA</option>
                    <option>ALCALDÍA DEL MUNICIPIO BOLÍVAR DEL ESTADO MONAGAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO BOLÍVAR DEL ESTADO SUCRE</option>
                    <option>ALCALDÍA DEL MUNICIPIO BOLÍVAR DEL ESTADO TÁCHIRA</option>
                    <option>ALCALDÍA DEL MUNICIPIO BOLÍVAR DEL ESTADO YARACUY</option>
                    <option>ALCALDÍA DEL MUNICIPIO BRICEÑO</option>
                    <option>ALCALDÍA DEL MUNICIPIO BRIÓN</option>
                    <option>ALCALDÍA DEL MUNICIPIO BRUZUAL</option>
                    <option>ALCALDÍA DEL MUNICIPIO BUCHIVACOA</option>
                    <option>ALCALDÍA DEL MUNICIPIO BUROZ</option>
                    <option>ALCALDÍA DEL MUNICIPIO CABIMAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO CAJIGAL</option>
                    <option>ALCALDÍA DEL MUNICIPIO CAMAGUÁN</option>
                    <option>ALCALDÍA DEL MUNICIPIO CAMATAGUA</option>
                    <option>ALCALDÍA DEL MUNICIPIO CAMPO ELÍAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO CANDELARIA</option>
                    <option>ALCALDÍA DEL MUNICIPIO CÁRDENAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO CARIPE</option>
                    <option>ALCALDÍA DEL MUNICIPIO CARIRUBANA</option>
                    <option>ALCALDÍA DEL MUNICIPIO CARLOS ARVELO</option>
                    <option>ALCALDÍA DEL MUNICIPIO CARONÍ</option>
                    <option>ALCALDÍA DEL MUNICIPIO CARRIZAL</option>
                    <option>ALCALDÍA DEL MUNICIPIO CARVAJAL</option>
                    <option>ALCALDÍA DEL MUNICIPIO CARVAJAL DEL ESTADO ANZOÁTEGUI</option>
                    <option>ALCALDÍA DEL MUNICIPIO CASACOIMA</option>
                    <option>ALCALDÍA DEL MUNICIPIO CATATUMBO</option>
                    <option>ALCALDÍA DEL MUNICIPIO CEDEÑO  DEL ESTADO BOLÍVAR  </option>
                    <option>ALCALDÍA DEL MUNICIPIO CEDEÑO DEL ESTADO MONAGAS </option>
                    <option>ALCALDÍA DEL MUNICIPIO CHACAO</option>
                    <option>ALCALDÍA DEL MUNICIPIO CHACÓN</option>
                    <option>ALCALDÍA DEL MUNICIPIO CHAGUARAMAS</option>
                    <option>ALCALDÍA DEL MUNICIPIO CHIEN</option>
                    <option>ALCALDÍA DEL MUNICIPIO COCOROTE</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    

                    {/*inistitucion de tipo empresa privada */}
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>

                    {/*inistitucion de tipo empresa publica */}
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>

                    {/*inistitucion de tipo empresa mixta*/}
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>

                    {/*inistitucion de tipo educación universitaria */}
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>

                    {/*inistitucion de tipo organismo no guberbamental*/}
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>

                    {/*inistitucion de tipo poder popular */}
                    <option>COMITÉ LOCAL DE ABASTECIMIENTO Y PRODUCCIÓN CLAP</option>
                    <option>COMUNA</option>
                    <option>CONSEJO COMUNAL</option>
                    <option>EMPRESA DE PROPIEDAD SOCIALISTA DIRECTA COMUNAL (EPSDC)</option>
                    <option>EMPRESA DE PROPIEDAD SOCIALISTA INDIRECTA COMUNAL (EPSIC) </option>
                    <option>GRUPO DE INTERCAMBIO SOLIDARIO (GIS)</option>
                    <option>UNIDADES PRODUCTIVA FAMILIAR (UPF)</option>
                    <option>MI MUNDO WEB</option>
                    <option>CONSEJO COMUNAL VILLA TAMARE</option>
                    <option>CULTORES/TECNÓLOGOS LNAVAS</option>
                    <option>CONSEJO COMUNAL BARRIO BOLÍVAR II</option>
                    
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Ocupación</label>
                <select onChange={HandleChange} name="ocupacion" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>GERENTE</option>
                    <option>OCUPACIONES DE LA FUERZA ARMADA</option>
                    <option>OCUPACIONES ELEMENTALES</option>
                    <option>OPERADOR DE PLANTAS, MÁQUINAS Y ENSAMBLADORES</option>
                    <option>PROFESIONAL</option>
                    <option>TÉCNICO O PROFESIONAL ASOCIADO</option>
                    <option>TRABAJADOR CALIFICADO DE LA AGRICULTURA, LA SILVICULTURA Y LA PESCA</option>
                    <option>TRABAJADOR DE APOYO ADMINISTRATIVO</option>
                    <option>TRABAJADOR DE ARTESANÍA Y OFICIOS CONEXOS</option>
                    <option>TRABAJADOR DE SERVICIOS Y VENTAS</option>
                    <option></option>
                </select>    
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Cargo</label>
                <select onChange={HandleChange} name="cargo" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>JEFES EJECUTIVOS, ALTOS FUNCIONARIOS Y LEGISLADORES</option>
                    <option>GERENTES ADMINISTRATIVOS Y COMERCIALES</option>
                    <option>DIRECTORES DE PRODUCCIÓN Y SERVICIOS ESPECIALIZADOS</option>
                    <option>GERENTES DE HOTELERÍA, COMERCIO Y OTROS SERVICIOS</option>
                    <option>PROFESIONALES DE LA CIENCIA Y LA INGENIERÍA</option>
                    <option>PROFESIONALES DE LA SALUD</option>
                    <option>PROFESIONALES DE LA ENSEÑANZA</option>
                    <option>PROFESIONALES DE LOS NEGOCIOS Y LA ADMINISTRACIÓN</option>
                    <option>PROFESIONALES DE LA TECNOLOGÍA DE LA INFORMACIÓN Y LAS COMUNICACIONES</option>
                    <option>PROFESIONALES DEL DERECHO, LA SOCIEDAD Y LA CULTURA</option>
                    <option>PROFESIONALES ASOCIADOS DE LA CIENCIA Y LA INGENIERÍA</option>
                    <option>PROFESIONALES ASOCIADOS DE LA SALUD</option>
                    <option>PROFESIONALES ASOCIADOS DE NEGOCIOS Y ADMINISTRACIÓN</option>
                    <option>PROFESIONALES ASOCIADOS JURÍDICOS, SOCIALES, CULTURALES Y AFINES</option>
                    <option>TÉCNICOS DE INFORMACIÓN Y COMUNICACIÓN</option>
                    <option>EMPLEADOS GENERALES Y DE TECLADO</option>
                    <option>EMPLEADOS DEL SERVICIO DE ATENCIÓN AL CLIENTE</option>
                    <option>EMPLEADOS DE REGISTRO NUMÉRICO Y MATERIAL</option>
                    <option>OTROS TRABAJADORES DE APOYO ADMINISTRATIVO</option>
                    <option>TRABAJADORES DE SERVICIOS PERSONALES</option>
                    <option>TRABAJADORES DE VENTAS</option>
                    <option>TRABAJADORES DE CUIDADOS PERSONALES</option>
                    <option>TRABAJADORES DE SERVICIOS DE PROTECCIÓN</option>
                    <option>TRABAJADORES AGRÍCOLAS CUALIFICADOS ORIENTADOS AL MERCADO</option>
                    <option>TRABAJADORES FORESTALES, PESQUEROS Y CAZADORES CUALIFICADOS Y ORIENTADOS AL MERCADO</option>
                    <option>AGRICULTORES, PESCADORES, CAZADORES Y RECOLECTORES DE SUBSISTENCIA</option>
                    <option>TRABAJADORES DE LA CONSTRUCCIÓN Y OFICIOS CONEXOS (EXCLUIDOS LOS ELECTRICISTAS)</option>
                    <option>TRABAJADORES DE LA INDUSTRIA METALÚRGICA, MAQUINARIA Y OFICIOS CONEXOS</option>
                    <option>TRABAJADORES DE ARTESANÍA E IMPRENTA</option>
                    <option>TRABAJADORES DE LOS SECTORES ELÉCTRICO Y ELECTRÓNICO</option>
                    <option>TRABAJADORES DE LA INDUSTRIA ALIMENTARIA, LA CARPINTERÍA, LA CONFECCIÓN Y OTRAS ARTESANÍAS Y OFICIOS CONEXOS</option>
                    <option>OPERADORES DE PLANTAS Y MÁQUINAS ESTACIONARIAS</option>
                    <option>ENSAMBLADORES</option>
                    <option>CONDUCTORES Y OPERADORES DE PLANTAS MÓVILES</option>
                    <option>LIMPIADORES Y AYUDANTES</option>
                    <option>TRABAJADORES AGRÍCOLAS, FORESTALES Y PESQUEROS</option>
                    <option>TRABAJADORES DE LA MINERÍA, LA CONSTRUCCIÓN, LA MANUFACTURA Y EL TRANSPORTE</option>
                    <option>AYUDANTES DE PREPARACIÓN DE ALIMENTOS</option>
                    <option>TRABAJADORES DE VENTAS Y SERVICIOS EN LA CALLE Y AFINES</option>
                    <option>TRABAJADORES DE LA BASURA Y OTROS TRABAJADORES ELEMENTALES</option>
                    <option>OFICIALES DE LA FUERZA ARMADA</option>
                    <option>SARGENTOS DE LA FUERZA ARMADA</option>
                    <option>OCUPACIONES DE LA FUERZA ARMADA</option>
                    <option>OTROS RANGOS</option>
                    <option>COORDINADOR</option>
                    
                </select>  
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Fecha Inicio</label>
                <input onChange={HandleChange} name="dateStart" type="date" className="input input-sm border border-gray-400" />
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Fecha Fin</label>
                <input onChange={HandleChange} name="dateEnd" type="date" className="input input-sm border border-gray-400" />
            </label>

            

            <div className="col-span-2 xl:col-span-3">
                <Button
                    type="submit"
                    customClass={`${ButtonHandler({ param:`create` })} btn-sm`}
                    ico={Icono({ico:`submit`})}
                    text="crear"
                />
            </div>
        </form>
    )
}
