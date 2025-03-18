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

                    {/*inistitucion de tipo gobierno 
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
                 
                  
                    */}

                    {/*inistitucion de tipo empresa privada 
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  

                    */}

                    {/*inistitucion de tipo empresa publica  */}
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                        

                    {/*inistitucion de tipo empresa mixta*/}
                    <option>PETROBICENTENARIO S.A.</option>
                    <option>PETROCARABOBO S.A.</option>
                    <option>BIET LAHEM S.A.</option>
                    <option>CARBOZULIA INTERNATIONAL, INC</option>
                    <option>CHERY VENEZUELA, C.A.</option>
                    <option>CILINDROS DEL ALBA</option>
                    <option>COMERCIALIZADORA DE SUMINISTROS REGIONALES DEL CARIBE S.A. (COMSURCA)</option>
                    <option>COMMERCHAMP S.A. </option>
                    <option>COMPAÑÍA ANÓNIMA NACIONAL TELÉFONOS DE VENEZUELA (CANTV)</option>
                    <option>CONSORCIO INDUSTRIAL VENEZOLANO DE TECNOLOGÍA CHINA, C.A. (CIVETCHI)</option>
                    <option>CORPORACIÓN COMERCIALIZADORA DE PETROQUÍMICOS Y QUÍMICOS, C.A. (COPEQUIM)  </option>
                    <option>EMPRESA DE PRODUCCIÓN SOCIAL DE INSUMOS BÁSICOS PARA LA CONSTRUCCIÓN DE VIVIENDAS, C.A.</option>
                    <option>EMPRESA DE PRODUCCIÓN SOCIAL DE SERVICIOS DE LAMINACIÓN DEL ALUMINIO, C.A. (SERLACA)</option>
                    <option>EMPRESA MIXTA BARIPETROL S.A.</option>
                    <option>EMPRESA MIXTA BOLIVARIANA CANTERA CORDON FANB, S.A. (CARCORFANB)</option>
                    <option>EMPRESA MIXTA BOQUERÓN S.A.</option>
                    <option>EMPRESA MIXTA COMERCIALIZADORA DE PRODUCTOS BIELORRUSA VENEZOLANA, S.A. (VENBELCOM)</option>
                    <option>EMPRESA MIXTA ECOSOCIALISTA SIEMBRA MINERA S.A.</option>
                    <option>EMPRESA MIXTA LAGOPETROL S.A.</option>
                    <option>EMPRESA MIXTA MILITAR DE TECNOLOGÍA S.A. (TECNOMAR)</option>
                    <option>EMPRESA MIXTA MINERA ECOSOCIALISTA ORO AZUL, S.A.</option>
                    <option>EMPRESA MIXTA MINERA ECOSOCIALISTA PARGUAZA S.A.</option>
                    <option>EMPRESA MIXTA MINERA METALES DEL SUR S.A.</option>
                    <option>EMPRESA MIXTA PARA EL DESARROLLO DE LA GEOLOGÍA Y MINERÍA EN VENEZUELA, CUBA Y OTROS PAÍSES DEL ALBA S.A. (MINERALBA)</option>
                    <option>EMPRESA MIXTA PETROBOSCÁN S.A.</option>
                    <option>EMPRESA MIXTA PETROCEDEÑO S.A.</option>
                    <option>EMPRESA MIXTA PETROCUMAREBO S.A.</option>
                    <option>EMPRESA MIXTA PETROCURAGUA S.A.</option>
                    <option>EMPRESA MIXTA PETRODELTA S.A.</option>
                    <option>EMPRESA MIXTA PETROGUÁRICO, S.A.</option>
                    <option>EMPRESA MIXTA PETROINDEPENDIENTE S.A.</option>
                    <option>EMPRESA MIXTA PETROKARIÑA S.A.</option>
                    <option>EMPRESA MIXTA PETROLERA BIELOVENEZOLANA S.A.</option>
                    <option>EMPRESA MIXTA PETROLERA GÜIRIA S.A.</option>
                    <option>EMPRESA MIXTA PETROLERA INDOVENEZOLANA S.A.</option>
                    <option>EMPRESA MIXTA PETROLERA KAKI S.A</option>
                    <option>EMPRESA MIXTA PETROLERA PARIA, S.A.</option>
                    <option>EMPRESA MIXTA PETROLERA SINO - VENEZOLANA S.A.</option>
                    <option>EMPRESA MIXTA PETROLERA SINOVENSA S.A.</option>
                    <option>EMPRESA MIXTA PETROLERA VENCUPET S.A.</option>
                    <option>EMPRESA MIXTA PETROMONAGAS S.A.</option>
                    <option>EMPRESA MIXTA PETRONADO S.A.</option>
                    <option>EMPRESA MIXTA PETROPERIJÁ S.A.</option>
                    <option>EMPRESA MIXTA PETROPIAR S.A.</option>
                    <option>EMPRESA MIXTA PETROQUIRIQUIRE S.A.</option>
                    <option>EMPRESA MIXTA PETROREGIONAL DEL LAGO S.A.</option>
                    <option>EMPRESA MIXTA PETRORITUPANO S.A.</option>
                    <option>EMPRESA MIXTA PETROSUCRE S.A.</option>
                    <option>EMPRESA MIXTA PETROURDANETA S.A.</option>
                    <option>EMPRESA MIXTA PETROVEN-BRAS S.A.</option>
                    <option>EMPRESA MIXTA PETROWARAO S.A.</option>
                    <option>EMPRESA MIXTA PETROWAYU S.A.</option>
                    <option>EMPRESA MIXTA PETROZAMORA S.A.</option>
                    <option>EMPRESA MIXTA PETROZUMANO S.A.</option>
                    <option>EMPRESA MIXTA PROVEEDURÍA BOLIVARIANA DE INSUMOS Y REPUESTOS SUR DEL LAGO, C.A. (PROBINRESCA)</option>
                    <option>EMPRESA MIXTA RUSO-VENEZOLANA ORQUÍDEA S.A. </option>
                    <option>EMPRESA MIXTA SOCIALISTA ARROZ DEL ALBA, S.A.</option>
                    <option>EMPRESA MIXTA SOCIALISTA AVÍCOLA DEL ALBA, S.A.</option>
                    <option>EMPRESA MIXTA SOCIALISTA CACAO DEL ALBA S.A.</option>
                    <option>EMPRESA MIXTA SOCIALISTA DE VEHÍCULOS VENEZOLANOS S.A. (EMSOVEN)</option>
                    <option>EMPRESA MIXTA SOCIALISTA LÁCTEOS DEL ALBA, S.A.</option>
                    <option>EMPRESA MIXTA SOCIALISTA LEGUMINOSAS DEL ALBA S.A.</option>
                    <option>EMPRESA MIXTA SOCIALISTA MADERAS DEL ALBA, S.A.</option>
                    <option>EMPRESA MIXTA SOCIALISTA PESQUERA INDUSTRIAL DEL ALBA, S.A.</option>
                    <option>EMPRESA MIXTA SOCIALISTA PORCINOS DEL ALBA, S.A.</option>
                    <option>EMPRESA MIXTA VENANGOCUPET S.A.</option>
                    <option>GRUPO ZULIANO, C.A.</option>
                    <option>HIDROLARA, C.A.</option>
                    <option>INDUSTRIA CHINA VENEZOLANA DE TALADROS (ICVT)</option>
                    <option>INDUSTRIA DE CUIDADO PERSONAL, S.A.</option>
                    <option>INDUSTRIA ELECTRÓNICA ORINOQUIA, S.A. (ORINOQUIA)</option>
                    <option>INDUSTRIA VENEZOLANA ENDÓGENA DE VÁLVULAS, S.A. (INVEVAL)</option>
                    <option>INDUSTRIAS DIANA, C.A Y PALMERAS DEL LAGO</option>
                    <option>INMOBILIARIA NACIONAL S.A.</option>
                    <option>INSUMOS FERROVIARIOS, C.A. (INFERCA)</option>
                    <option>INTERNATIONAL PETROCHEMICAL HOLDING LIMITED (IPHL)</option>
                    <option>INVERSIONES MILAZZO, C.A.</option>
                    <option>METANOL DE ORIENTE, S.A. (METOR)</option>
                    <option>MINERÍA BINACIONAL TURQUÍA VENEZUELA, S. A. (MIBITURVEN)</option>
                    <option>MONÓMEROS COLOMBO VENEZOLANOS S.A. (MONÓMEROS)</option>
                    <option>PARQUE INDUSTRIAL DEL GAS NATURAL VEHICULAR (PIGNV)</option>
                    <option>PERFOROSVEN S.A.</option>
                    <option>PETROCASA CONSTRUCCIÓN, C.A.</option>
                    <option>PETROINDEPENDENCIA S.A. </option>
                    <option>PETROJUNÍN S.A.</option>
                    <option>PETROMACAREO S.A.</option>
                    <option>PETROMIRANDA S.A.</option>
                    <option>PETROURICA S.A.</option>
                    <option>PETROVICTORIA S.A.</option>
                    <option>PLANTA PILOTES Y LOSAS BICENTENARIO</option>
                    <option>POLIOLEFINAS INTERNACIONALES, C.A. (POLINTER)</option>
                    <option>POLIPROPILENO DE VENEZUELA, S.A. (PROPILVEN)</option>
                    <option>PROPILENOS DE FALCÓN, C.A. (PROFALCA)</option>
                    <option>SÍSMICA BIELOVENEZOLANA S.A.</option>
                    <option>SISTEMA HIDRÁULICO YACAMBÚ QUIBOR, C.A.</option>
                    <option>SUPERMETANOL, S.A.</option>
                    <option>SUPEROCTANOS, S.A. </option>
                    <option>SURTIDORES DEL ALBA</option>
                    <option>TELECOM VENEZUELA, C.A.</option>
                    <option>TELECOMUNICACIONES GRAN CARIBE, C.A. (TGC)</option>
                    <option>TELECOMUNICACIONES MOVILNET, C.A. </option>
                    <option>VEN-BELAZ CAMIONES, C.A.</option>
                    <option>VENCANA SERVICIOS PETROLEROS S.A.</option>
                    <option>VENEMINSK TRACTORES, C.A.</option>
                    <option>VENEZIRÁN OIL COMPANY S.A.</option>
                    <option>VENEZOLANA DE INDUSTRIA TECNOLÓGICA, C.A. (VIT)</option>
                    <option>VENEZOLANA DE MOTOS, C.A.</option>
                    <option>VENEZOLANA DE TELECOMUNICACIONES, C.A. (VTELCA)</option>
                    <option>VENEZOLANA SOCIALISTA DE PLÁSTICO (VENSOPLAST)</option>
                    <option>VENEZUELA OIL COMPANY, C.A.</option>
                    <option>VENEZUELAN HEAVY INDUSTRIES, C.A. (VHICOA)</option>
                    <option>VENIRAN TRACTOR, C.A.</option>
                    <option>VENIRAUTO INDUSTRIAS, C.A.</option>
                    <option>VIETVEN ILUMINACIONES</option>
                   
                    {/*inistitucion de tipo educación universitaria */}

                    <option>COLEGIO UNIVERSITARIO DE ADMINISTRACIÓN Y MERCADEO (CUAM)</option>
                    <option>COLEGIO UNIVERSITARIO DE ENFERMERÍA CENTRO MÉDICO DE CARACAS (CUECMC)</option>
                    <option>COLEGIO UNIVERSITARIO DE ENFERMERÍA DE LA CRUZ ROJA DE VENEZUELA </option>
                    <option>COLEGIO UNIVERSITARIO DE PSICOPEDAGOGÍA (CUP)</option>
                    <option>COLEGIO UNIVERSITARIO DE REHABILITACIÓN MAY HAMILTON</option>
                    <option>COLEGIO UNIVERSITARIO FERMÍN TORO (CUFT)</option>
                    <option>COLEGIO UNIVERSITARIO JEAN PIAGET </option>
                    <option>COLEGIO UNIVERSITARIO MONSEÑOR DE TALAVERA (CUMT)</option>
                    <option>COLEGIO UNIVERSITARIO PADRE ISAÍAS OJEDA (CUPIO)</option>
                    <option>INSTITUTO UNIVERSITARIO ADVENTISTA DE VENEZUELA (IUNAV) </option>
                    <option>INSTITUTO UNIVERSITARIO AVEPANE (IUA)</option>
                    <option>INSTITUTO UNIVERSITARIO CARLOS SOUBLETTE (IUNICS)</option>
                    <option>INSTITUTO UNIVERSITARIO DE ADMINISTRACIÓN Y GERENCIA (IUDAG)</option>
                    <option>INSTITUTO UNIVERSITARIO DE AERONÁUTICA CIVIL MAYOR (AV) MIGUEL RODRÍGUEZ (IUAC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE CIENCIAS ADMINISTRATIVAS Y FISCALES (IUCAF)</option>
                    <option>INSTITUTO UNIVERSITARIO DE DISEÑO LAS MERCEDES (IUDLM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE EDUCACIÓN ESPECIALIZADA (IUNE)</option>
                    <option>INSTITUTO UNIVERSITARIO DE GERENCIA Y TECNOLOGÍA (IUGT)</option>
                    <option>INSTITUTO UNIVERSITARIO DE LA AUDICIÓN Y EL LENGUAJE (IVAL)</option>
                    <option>INSTITUTO UNIVERSITARIO DE LA FRONTERA (IUFRONT)</option>
                    <option>INSTITUTO UNIVERSITARIO DE MERCADOTECNIA (ISUM) </option>
                    <option>INSTITUTO UNIVERSITARIO DE NUEVAS PROFESIONES (IUNP)</option>
                    <option>INSTITUTO UNIVERSITARIO DE PROFESIONES GERENCIALES (IUPG)</option>
                    <option>INSTITUTO UNIVERSITARIO DE RELACIONES PÚBLICAS (IUDERP) </option>
                    <option>INSTITUTO UNIVERSITARIO DE SEGUROS (IUS)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ARTURO MICHELENA (IUTAM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA GENERAL PEDRO MARÍA FREITES (IUTGPMF)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA LAURA EVANGELISTA ALVARADO CARDOZO (IUTLEAC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA POLYCOM (POLYCOM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ALBERTO ADRIANI (IUAA)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA AMAZONAS (IUTAMA)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA AMÉRICO VESPUCIO (TECAV)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ANTONIO JOSÉ DE SUCRE (UTS)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ANTONIO RICAURTE (IUTAR)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA CRISTÓBAL MENDOZA (IUTCM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE ADMINISTRACIÓN INDUSTRIAL (IUTA)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE SEGURIDAD INDUSTRIAL (IUTSI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DEL MAR (IUTEMAR)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DR. JOSÉ GREGORIO HERNÁNDEZ (UNIHER)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ELÍAS CALIXTO POMPA (IUTECP)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ESCUELA NACIONAL DE ADMINISTRACIÓN Y HACIENDA PÚBLICA (ENAHP)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA HENRY PITTIER (IUTHEPI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA INDUSTRIAL (IUTI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA INDUSTRIAL RODOLFO LOERO ARISMENDI (IUTIRLA)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA JOSÉ LEONARDO CHIRINO </option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA JOSÉ MARÍA CARREÑO (IUTJMC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA JUAN PABLO PÉREZ ALFONZO ( IUTEPAL)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA LOS ANDES (IUTLA)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA MARILIS MÉNDEZ (IUTMM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA MARIO BRICEÑO IRAGORRY  (IUTEMBI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA PARA LA INFORMÁTICA (IUTEPI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA PASCAL (IUTEPAS) </option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA PEDRO EMILIO COLL (IUTPEC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA READIC (UNIR)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA RUFINO BLANCO FOMBONA (IUTRBF)</option>
                    <option>COLEGIO UNIVERSITARIO DR. RAFAEL BELLOSO CHACÍN</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA SUPERIOR DE ORIENTE (IUTSO)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA TOMÁS LANDER (IUTTOL)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA VENEZUELA (IUTV)</option>
                    <option>INSTITUTO UNIVERSITARIO ECLESIÁSTICO SANTO TOMÁS DE AQUINO (IUESTA)</option>
                    <option>INSTITUTO UNIVERSITARIO GRAN COLOMBIA (IUGC)</option>
                    <option>INSTITUTO UNIVERSITARIO INSULAR (IUI)</option>
                    <option>INSTITUTO UNIVERSITARIO JESÚS ENRIQUE LOSSADA (IUJEL)</option>
                    <option>INSTITUTO UNIVERSITARIO JESÚS OBRERO (IUJO)</option>
                    <option>INSTITUTO UNIVERSITARIO LATINOAMERICANO DE AGROECOLOGÍA PAULO FREIRE (IALA)</option>
                    <option>INSTITUTO UNIVERSITARIO PEDAGÓGICO MONSEÑOR RAFAEL ARIAS BLANCO (IUPMA)</option>
                    <option>INSTITUTO UNIVERSITARIO POLITÉCNICO SANTIAGO MARIÑO (PSM)</option>
                    <option>INSTITUTO UNIVERSITARIO SALESIANO PADRE OJEDA (IUSPO)</option>
                    <option>INSTITUTO UNIVERSITARIO SAN FRANCISCO (IUSF)</option>
                    <option>INSTITUTO UNIVERSITARIO YMCA LOPE MENDOZA (IUYLM)</option>
                    <option>UNIVERSIDAD AUDIOVISUAL DE VENEZUELA (UAV)</option>
                    <option>UNIVERSIDAD BICENTENARIA DE ARAGUA (UBA)</option>
                    <option>UNIVERSIDAD BOLIVARIANA DE LOS TRABAJADORES JESÚS RIVERO (UBT)</option>
                    <option>UNIVERSIDAD BOLIVARIANA DE VENEZUELA (UBV)</option>
                    <option>UNIVERSIDAD CAMPESINA DE VENEZUELA ALGIMIRO GABALDON (UCVAG)</option>
                    <option>UNIVERSIDAD CATÓLICA ANDRÉS BELLO (UCAB)</option>
                    <option>UNIVERSIDAD CATÓLICA DEL TÁCHIRA (UCAT)</option>
                    <option>UNIVERSIDAD CATÓLICA SANTA ROSA (UCSAR)</option>
                    <option>UNIVERSIDAD CENTRAL DE VENEZUELA (UCV)</option>
                    <option>UNIVERSIDAD CENTRO OCCIDENTAL LISANDRO ALVARADO (UCLA)</option>
                    <option>UNIVERSIDAD DE CARABOBO (UC)</option>
                    <option>UNIVERSIDAD DE FALCÓN (UDEFA)</option>
                    <option>UNIVERSIDAD DE LAS CIENCIAS DE LA SALUD HUGO CHÁVEZ FRÍAS (UCS) </option>
                    <option>UNIVERSIDAD DE LOS ANDES (ULA)</option>
                    <option>UNIVERSIDAD DE ORIENTE (UDO)</option>
                    <option>UNIVERSIDAD DEL ZULIA (LUZ)</option>
                    <option>UNIVERSIDAD DEPORTIVA DEL SUR (UDS)</option>
                    <option>UNIVERSIDAD EXPERIMENTAL PRIVADA CECILIO ACOSTA (UNICA) </option>
                    <option>UNIVERSIDAD JOSÉ MARÍA VARGAS (UJMV)</option>
                    <option>UNIVERSIDAD METROPOLITANA (UNIMET)</option>
                    <option>UNIVERSIDAD MILITAR BOLIVARIANA DE VENEZUELA (UMBV)</option>
                    <option>UNIVERSIDAD NACIONAL ABIERTA (UNA)</option>
                    <option>UNIVERSIDAD NACIONAL DEL TURISMO (UNATUR)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LA SEGURIDAD (UNES)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LARA MARTIN LUTHER KING (UNELMLK)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LAS ARTES (UNEARTE)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LOS LLANOS CENTRALES RÓMULO GALLEGOS (UNERG)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LOS LLANOS OCCIDENTALES EZEQUIEL ZAMORA (UNELLEZ)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DEL TÁCHIRA (UNET) </option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DEL TRANSPORTE (UNETRANS)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DEL YARACUY (UNEY)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL FRANCISCO DE MIRANDA (UNEFM)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL MARÍTIMA DEL CARIBE  (UMC)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA ANTONIO JOSÉ DE SUCRE (UNEXPO)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA DE LA FUERZA ARMADA NACIONAL (UNEFA)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL RAFAEL MARÍA BARALT  (UNERMB)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL SIMÓN BOLÍVAR (USB)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL SIMÓN RODRÍGUEZ (UNESR)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL SUR DEL LAGO JESÚS MARÍA SEMPRUM (UNESUR)</option>
                    <option>UNIVERSIDAD NORORIENTAL PRIVADA GRAN MARISCAL DE AYACUCHO (UGMA)</option>
                    <option>UNIVERSIDAD PANAMERICANA DEL PUERTO (UNIPAP)</option>
                    <option>UNIVERSIDAD PEDAGÓGICA EXPERIMENTAL LIBERTADOR (UPEL)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL JOSÉ ANTONIO ANZOÁTEGUI (UPTJAA)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL AGROINDUSTRIAL DEL ESTADO TÁCHIRA (UPTAIET)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE BARLOVENTO ARGELIA LAYA (UPTBAL)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE CARACAS MARISCAL SUCRE (UPTEC)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE FALCON ALONSO GAMERO (UPTAG)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE LOS ALTOS MIRANDINOS CECILIO ACOSTA (UPTAMCA)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE LOS LLANOS JUANA RAMÍREZ (UPTLL)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE LOS VALLES DEL TUY  (UPTVT)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE MARACAIBO (UPTMA)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE PARIA LUIS MARIANO RIVERA (UPTPARIA)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE PUERTO CABELLO (UPTPC)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE VALENCIA (UPTV)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE YARACUY ARÍSTIDES BASTIDAS (UPTAB) </option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ALTO APURE PEDRO CAMEJO (UPTAAPC)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO ARAGUA FEDERICO BRITO FIGUEROA (UPTA)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO BARINAS JOSÉ FELIX RIBAS (UPTB)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO BOLÍVAR (UPTBOLIVAR)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO LARA ANDRES ELOY BLANCO (UPTAEB)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO MÉRIDA KLÉBER RAMÍREZ (UPTM)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO PORTUGUESA J.J MONTILLA (UPTP)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO TRUJILLO MARIO BRICEÑO IRAGORRY (UPTTMBI)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL NORTE DEL TÁCHIRA MANUELA SÁENZ (UPTNTMS)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL OESTE DE SUCRE CLODOSBALDO RUSSIÁN (UPTOSCR)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ZULIA (UPTZ)</option>
                    <option>UNIVERSIDAD PRIVADA ALEJANDRO DE HUMBOLDT (UAH)</option>
                    <option>UNIVERSIDAD ALONSO DE OJEDA (UNIOJEDA) </option>
                    <option>UNIVERSIDAD PRIVADA ARTURO MICHELENA (UAM)</option>
                    <option>UNIVERSIDAD PRIVADA DE MARGARITA (UNIMAR)</option>
                    <option>UNIVERSIDAD DR. JOSÉ GREGORIO HERNÁNDEZ (UJGH)</option>
                    <option>UNIVERSIDAD PRIVADA DR. RAFAEL BELLOSO CHACÍN (URBE)</option>
                    <option>UNIVERSIDAD PRIVADA FERMÍN TORO (UFT)</option>
                    <option>UNIVERSIDAD PRIVADA JOSÉ ANTONIO PÁEZ (UJAP)</option>
                    <option>UNIVERSIDAD PRIVADA MONTEÁVILA (UMA)</option>
                    <option>UNIVERSIDAD NUEVA ESPARTA (UNE)</option>
                    <option>UNIVERSIDAD YACAMBÚ (UNY)</option>
                    <option>UNIVERSIDAD RAFAEL URDANETA (URU)</option>
                    <option>UNIVERSIDAD SANTA MARÍA (USM)</option>
                    <option>UNIVERSIDAD TECNOLÓGICA DEL CENTRO (UNITEC)</option>
                    <option>UNIVERSIDAD TERRITORIAL DELTAICA FRANCISCO TAMAYO (UTDFT)</option>
                    <option>UNIVERSIDAD VALLE DEL MOMBOY (UVM)</option>
                    <option>UNIVERSIDAD LATINOAMERICANA Y DEL CARIBE (ULAC)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE GUAYANA (UNEG)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LA GRAN CARACAS (UNEXCA)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LAS ESPECIALIDADES ELÉCTRICAS (UNEXEE)</option>
                    <option>ACADEMIA NACIONAL DE LA INGENIERÍA Y EL HÁBITAT DE VENEZUELA</option>
                    <option>ALDEAS UNIVERSITARIAS</option>
                    <option>CENTRO DE DESARROLLO Y ENTRENAMIENTO EMPRESARIAL CDECA, C.A</option>
                    <option>CENTRO DE ESTUDIOS POLÍTICOS Y SOCIALES DE AMÉRICA LATINA (CEPSAL)</option>
                    <option>CENTRO DE FORMACIÓN E INVESTIGACIÓN PROF. FRANKLIN GIMÉNEZ</option>
                    <option>CENTRO DE INVESTIGACIONES Y ALTOS ESTUDIOS EN CIENCIAS SOCIALES (CIAECIS)</option>
                    <option>CENTRO LOCAL DE INVESTIGACIÓN Y FORMACIÓN PERMANENTE DEL MAGISTERIO VENEZOLANO EXEARIO SOSA LUJÁN (CLIFPMV) </option>
                    <option>CENTRO DE ESTUDIOS NÁUTICOS VENEZOLANO (CENAVE)</option>
                    <option>ESCUELA NACIONAL DE ARTES PLÁSTICAS JULIO ARRAGA</option>
                    <option>GRUPO DE INVESTIGACIÓN CIENTÍFICA Y DE LA ENSEÑANZA DE LA FÍSICA (GRINCEF)</option>
                    <option>HOSPITAL UNIVERSITARIO ANTONIO PATRICIO DE ALCALA</option>
                    <option>HOSPITAL UNIVERSITARIO DR. ÁNGEL LARRALDE ( HUAL)</option>
                    <option>HOSPITAL UNIVERSITARIO DR. JESÚS MARÍA CASAL RAMOS</option>
                    <option>HOSPITAL UNIVERSITARIO DR. PEDRO EMILIO CARRILLO</option>
                    <option>HOSPITAL UNIVERSITARIO PERIFERICO DR. MIGUEL ÁNGEL RANGEL</option>
                    <option>INSTITUTO ANATÓMICO JOSÉ IZQUIERDO (UCV)</option>
                    <option>INSTITUTO AUTÓNOMO HOSPITAL UNIVERSITARIO DE LOS ANDES (IAHULA)</option>
                    <option>INSTITUTO DE CAPACITACIÓN Y ALTOS ESTUDIOS (ICAE)</option>
                    <option>INSTITUTO DE ESTUDIOS SUPERIORES DE INVESTIGACIÓN Y POSTGRADO (IESIP)</option>
                    <option>INSTITUTO PEDAGÓGICO DE MATURÍN PROF. ANTONIO LIRA ALCALÁ</option>
                    <option>INSTITUTO PEDAGÓGICO RAFAEL ALBERTO ESCOBAR LARA</option>
                    <option>INSTITUTO PEDAGÓGICO RURAL EL MÁCARO LUIS FERMÍN</option>
                    <option>INSTITUTO PEDAGÓGICO RURAL GERVASIO RUBIO</option>
                    <option>INSTITUTO PROFESIONAL DE ATENCIÓN INTEGRAL A LA FAMILIA</option>
                    <option>INSTITUTO UNIVERSITARIO DE POLICÍA CIENTÍFICA (IUPOLC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA (IUT)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA AGROINDUSTRIAL (IUTAI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE CABIMAS (IUTC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE CARIPITO (IUTC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE CUMANÁ (IUTC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE EJIDO (IUTE)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE LOS LLANOS (IUTLL)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE VALENCIA (IUTVAL)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE YARACUY (IUTY)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DEL ESTADO BOLÍVAR (IUTEB)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DEL ESTADO PORTUGUESA</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DEL ESTADO TRUJILLO (IUTET)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGIA DR FEDERICO RIVERO PALACIO</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DR. DELFÍN MENDOZA (IUTDM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA READIC (UNIR)</option>
                    <option>INSTITUTO UNIVERSITARIO TECNOLÓGICO DEL OESTE MARISCAL SUCRE (IUTOMS)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LAS TELECOMUNICACIONES E INFORMÁTICA (UNETI)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL NORTE DE MONAGAS LUDOVICO SILVA (UPTNMLS)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL JOSÉ FÉLIX RIBAS (UPTJR)</option>
                    <option>UNIVERSIDAD POPULAR DEL AMBIENTE FRUTO VIVAS, (UPAFV)</option>
                    <option>CENTRO DE INVESTIGACIONES PSIQUIÁTRICAS PSICOLÓGICAS Y SEXOLÓGICAS DE VENEZUELA. INSTITUTO UNIVERSITARIO DE INVESTIGACIÓN Y POSTGRADO (CIPPSV)</option>
                    <option>INSTITUCIONES DE EDUCACION MEDIA</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DEL MAGISTERIO SAMUEL ROBINSON (UNEM)</option>
                    <option>UNIVERSIDAD VENEZOLANA DE LOS HIDROCARBUROS</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE ESPECIALIDADES ELÉCTRICAS (UNEXEE)</option>
                    <option>ESCUELA DE POSTGRADO DE LA ARMADA (EPAR)</option>
                    <option>ESCUELA SUPERIOR DE GUERRA NAVAL (ESGN)</option>
                    <option>ESCUELA NAVAL DE VENEZUELA (ENV)</option>
                    <option>ESCUELA DE SUBMARINOS DE LA ARMADA (ESUBAR)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL RAFAEL MARÍA BARALT (UNERMB)</option>
                    <option>UNIVERSIDAD NACIONAL DE LAS CIENCIAS DR. HUMBERTO FERNÁNDEZ-MORÁN (UNC)</option>
                    <option>INSTITUTO DE ALTOS ESTUDIO DE LA DEFENSA NACIONAL (IAESEN)</option>
                   
                    {/*inistitucion de tipo organismo no guberbamental*/}
                    <option>ARCHIVO ARQUIDIOCESANO DE MÉRIDA</option>
                    <option>ASOCIACIÓN VENEZOLANA PARA LA CONSERVACIÓN DE ÁREAS NATURALES</option>
                    <option>FUNDACIÓN CENTRO DE ESTUDIOS SOBRE CRECIMIENTO Y DESARROLLO DE LA POBLACIÓN VENEZOLANA (FUNDACREDESA)</option>
                    <option>FUNDACIÓN CENTRO NACIONAL DE GENÉTICA MÉDICA DR. JOSÉ GREGORIO HERNÁNDEZ</option>
                    <option>FUNDACIÓN DE EDIFICACIONES Y EQUIPAMIENTO HOSPITALARIO (FUNDEEH)</option>
                    <option>FUNDACIÓN INSTITUTO CARABOBEÑO PARA LA SALUD (INSALUD)</option>
                    <option>FUNDACIÓN LA SALLE DE CIENCIAS NATURALES (FLASA)</option>
                    <option>FUNDACIÓN LABORATORIO NACIONAL DE VIALIDAD (FUNDALANAVIAL)</option>
                    <option>FUNDACIÓN MOVIMIENTO BOLIVARIANO REVOLUCIONARIO DE LA RESERVA ACTIVA “GENERAL EN JEFE FÉLIX ANTONIO VELÁSQUEZ”</option>
                    <option>FUNDACIÓN MUSEO DE ARTE MODERNO JESÚS SOTO</option>
                    <option>FUNDACIÓN MUSEO DE CIENCIAS NATURALES (MUCI)</option>
                    <option>FUNDACIÓN NACIONAL DEL ARROZ</option>
                    <option>FUNDACIÓN NACIONAL PARA EL DESARROLLO DE LA BIOTECNOLOGÍA (NADBIO)</option>
                    <option>FUNDACIÓN PARA EL DESARROLLO DE LAS CIENCIAS FÍSICAS, MATEMÁTICAS Y NATURALES (FUDECI)</option>
                    <option>FUNDACIÓN PARA EL FOMENTO DE LAS TECNOLOGÍAS DE LA INFORMACIÓN Y LAS COMUNICACIONES (FUNDATICS)</option>
                    <option>FUNDACIÓN PARA LA AGRICULTURA TROPICAL ALTERNATIVA Y DESARROLLO INTEGRAL (FUNDATADI)</option>
                    <option>FUNDACIÓN PARA LA INVESTIGACIÓN AGRÍCOLA (DANAC)</option>
                    <option>FUNDACIÓN PARA LA INVESTIGACIÓN Y DESARROLLO DE LA ACUICULTURA EN EL ESTADO SUCRE (FIDAES)</option>
                    <option>FUNDACIÓN PARQUE TECNOLÓGICO DE BARQUISIMETO (TECNOPARQUE)</option>
                    <option>FUNDACIÓN TIERRA VIVA</option>
                    <option>FUNDACIÓN UNIDOS CONTRA LA TUBERCULOSIS EN GRUPOS INDÍGENAS</option>
                    <option>FUNDACIÓN VENEZOLANA DE HIPERTENSIÓN ARTERIAL (FUNDAHIPERTENSIÓN)</option>
                    <option>FUNDACIÓN VENEZOLANA DE INVESTIGACIÓN, DESARROLLO E INNOVACIÓN PARA EL TRANSPORTE (FUVIDIT)</option>
                    <option>FUNDACIÓN VENEZOLANA DE NATUROLOGIA CUÁNTICA  (FUVENAC)</option>
                    <option>FUNDACIÓN WILLIAM H. PHELPS</option>
                    <option>FUNDACIÓN ESCUELA VENEZOLANA DE PLANIFICACIÓN (FEVP)</option>
                    <option>FUNDACIÓN PARA LA ALIMENTACIÓN Y NUTRICIÓN JOSÉ MARÍA BENGOA</option>
                    <option>GRUPO DE INVESTIGACIÓN ALTERIDAD LATINOAMERICANA Y CARIBEÑA (GI-ALTERLATINO)</option>
                    <option>GRUPO DE TRABAJO EN TORTUGAS MARINAS DE NUEVA ESPARTA</option>
                    <option>INSTITUTO PARA EL CONTROL Y CONSERVACIÓN DE LA CUENCA DEL LAGO DE MARACAIBO (ICLAM)</option>
                    <option>FUNDACIÓN DESARROLLO SUSTENTABLE DE VENEZUELA (FDSV)</option>
                    

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
                    <option>ASOCIACIÓN CIVIL CENTRO DE FORMACIÓN INTEGRAL EDUCATEMAS</option>
                    <option>UNIDAD PRODUCTIVA FAMILIAR CARABOBO LIBRE</option>
                    
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
