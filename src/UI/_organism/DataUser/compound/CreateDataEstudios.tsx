import { ChangeEvent, FormEvent, useState } from "react"
import ButtonHandler from "../../../../_handler/ButtonsHandler"
import { Icono } from "../../../../_handler/IconHandler"
import Button from "../../../_atom/Button"
import Subtitle from "../../../_atom/Subtitle"
import { useModal } from "../../../../_context/ModalContext"
import { useNotification } from "../../../../_context/NotificationContext"
import { API } from "../../../../entorno"
import { RequestOptionsCreateToken } from "../../../../utils/req/RequetsOptions"

interface Props {
    reload: () => void
}

export default function CreateDataEstudios ({reload}:Props) {

    const modal = useModal();
    const noti = useNotification();

    const [data, setData] = useState<any>({});

    const HandleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const prev = {...data, [e.target.name]: e.target.value};
        setData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!data.nivel) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Nivel de estudio"` });
        if(!data.profesion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Profesión"` });
        if(!data.yearEnd) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Año de culminación"` });
        if(!data.countryId) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "País"` });
        if(!data.institucion) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Institución"` });
        if(!data.area) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Área"` });
        if(!data.subarea) return noti.setMessage({ active:true,type:`error`,message:`Debes completar el campo "Subárea"` });

        const customData = {
            nivel: data.nivel,
            profesion: data.profesion,
            yearEnd: data.yearEnd,
            countryId: data.countryId,
            institucion: data.institucion,
            area: data.area,
            subarea: data.subarea
        }

        const ExecuteAsync = async () => {
            const url = `${API}/education/create`;
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
                <label className="text-sm text-gray-600 font-semibold">Nivel de estudio</label>
                <select onChange={HandleChange} name="nivel" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>EDUCACIÓN PRIMARIA</option>
                    <option>EDUCACIÓN MEDIA</option>
                    <option>EDUCACACIÓN MEDIA TÉCNICA</option>
                    <option>EDUCACIÓN TÉCNICA SUPERIOR</option>
                    <option>INGENIERÍA</option>
                    <option>LICENCIATURA U OTRO PREGRADO</option>
                    <option>ESPECIALIZACIÓN</option>
                    <option>MAESTRÍA</option>
                    <option>DOCTORADO</option>
                    
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Profesión</label>
                <select onChange={HandleChange} name="profesion" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>SIN PROFESIÓN</option>
                    <option>ACTUACIÓN</option>
                    <option>ADMINISTRACIÓN</option>
                    <option>ADMINISTRACIÓN ADUANERA</option>
                    <option>ADMINISTRACIÓN MUNICIPAL</option>
                    <option>ADMINISTRACIÓN TRIBUTARIA</option>
                    <option>AGRONOMÍA</option>
                    <option>AGROPECUARIA</option>
                    <option>ANESTESIOLOGÍA</option>
                    <option>ANTROPOLOGÍA</option>
                    <option>ARCHIVOLOGÍA</option>
                    <option>ARQUEOLOGÍA</option>
                    <option>ARQUITECTURA</option>
                    <option>ARTES PLÁSTICAS</option>
                    <option>ASISTENTE VETERIANARIO</option>
                    <option>ASTROFÍSICA</option>
                    <option>ASTRONOMÍA</option>
                    <option>BIBLIOTECOLOGÍA</option>
                    <option>BIOANÁLISIS</option>
                    <option>BIOFÍSICA</option>
                    <option>BIOLOGÍA</option>
                    <option>BIOLOGÍA MARINA</option>
                    <option>BIOQUÍMICO</option>
                    <option>BOTÁNICA</option>
                    <option>CANCEROLOGÍA</option>
                    <option>CARDIOLOGÍA</option>
                    <option>CARTOGRAFÍA</option>
                    <option>CIENCIAS ACTUARIALES</option>
                    <option>CIENCIAS MILITARES</option>
                    <option>CIENCIAS POLICIALES</option>
                    <option>CIENCIAS POLÍTICAS</option>
                    <option>CIRUGÍA</option>
                    <option>CITOLOGÍA</option>
                    <option>CITOTECNOLOGÍA</option>
                    <option>CLIMATOLOGÍA</option>
                    <option>COMERCIO EXTERIOR</option>
                    <option>COMERCIO INTERNACIONAL</option>
                    <option>COMPUTACIÓN</option>
                    <option>CONTABILIDAD</option>
                    <option>COSMOLOGÍA</option>
                    <option>CRIMINOLOGÍA</option>
                    <option>DEMOGRAFÍA</option>
                    <option>DERECHO</option>
                    <option>DERMATOLOGÍA</option>
                    <option>DISEÑO DE MODAS</option>
                    <option>DISEÑO GRÁFICO</option>
                    <option>DISEÑO INDUSTRIAL</option>
                    <option>ECOLOGÍA</option>
                    <option>ECONOMÍA</option>
                    <option>ECOTURISMO</option>
                    <option>EDUCACIÓN</option>
                    <option>EDUCACIÓN ESPECIAL</option>
                    <option>ELECTRO MEDICINA</option>
                    <option>EMPRESAS TURÍSTICAS</option>
                    <option>ENDOCRINOLOGÍA</option>
                    <option>ENFERMERÍA</option>
                    <option>ENOLOGÍA</option>
                    <option>ENTOMOLOGÍA</option>
                    <option>EPIDEMIOLOGÍA</option>
                    <option>ESPELEOLOGÍA</option>
                    <option>ESTADÍSTICA</option>
                    <option>ESTUDIOS INTERNACIONALES</option>
                    <option>ESTUDIOS LIBERALES</option>
                    <option>ESTUDIOS POLÍTICOS</option>
                    <option>ETIMOLOGISTA</option>
                    <option>ETNOGRAFÍA</option>
                    <option>ETNOLOGÍA</option>
                    <option>ETOLOGÍA</option>
                    <option>FARMACIA</option>
                    <option>FILOSOFÍA</option>
                    <option>FÍSICA</option>
                    <option>FISIOLOGÍA</option>
                    <option>FISIOTERAPIA</option>
                    <option>FONOLOGÍA</option>
                    <option>FORENSE</option>
                    <option>FOTÓGRAFO</option>
                    <option>GEMOLOGÍA</option>
                    <option>GENETISTA</option>
                    <option>GEOBOTÁNICA</option>
                    <option>GEODESIA</option>
                    <option>GEOFÍSICA</option>
                    <option>GEOGRAFÍA</option>
                    <option>GEOLOGÍA</option>
                    <option>GEOMÁNCIA</option>
                    <option>GEOQUÍMICA</option>
                    <option>GERENCIA DE PROCESOS HOSPITALARIOS</option>
                    <option>GERENCIA HOTELERA</option>
                    <option>GERENCIA INDUSTRIAL</option>
                    <option>GERIATRÍA</option>
                    <option>GERONTOLOGÍA</option>
                    <option>HEMATOLOGÍA</option>
                    <option>HEPATOLOGÍA</option>
                    <option>HIDROGEOLOGÍA</option>
                    <option>HIDROGRAFÍA</option>
                    <option>HIDROLOGÍA</option>
                    <option>HIGIENISTA</option>
                    <option>HISTORIA</option>
                    <option>HOMEOPATÍA</option>
                    <option>HOTELERÍA</option>
                    <option>IDIOMAS MODERNOS</option>
                    <option>EMAGENOLOGÍA</option>
                    <option>INFORMÁTICA</option>
                    <option>INGENIERÍA AERONÁUTICA</option>
                    <option>INGENIERÍA CIVIL</option>
                    <option>INGENIERÍA DE ALIMENTOS</option>
                    <option>INGENIERÍA DE COMPUTACIÓN</option>
                    <option>INGENIERÍA DE GAS</option>
                    <option>INGENIERÍA DE HIDROCARBUROS</option>
                    <option>INGENIERÍA DE MANTENIMIENTO</option>
                    <option>INGENIERÍA DE MATERIALES</option>
                    <option>INGENIERÍA DE MINAS</option>
                    <option>INGENIERÍA DE PETRÓLEO</option>
                    <option>INGENIERÍA DE POLÍMEROS</option>
                    <option>INGENIERÍA DE PODUCCOÓN</option>
                    <option>INGENIERÍA DE SISTEMAS</option>
                    <option>INGENIERÍA DE TELECOMUNICACIONES</option>
                    <option>INGENIERÍA ELÉCTRICA</option>
                    <option>INGENIERÍA ELECTRÓNICA</option>
                    <option>INGENIERÍA FORESTAL</option>
                    <option>INGENIERÍA GEODÉSICA</option>
                    <option>INGENIERÍA GEOFÍSICA</option>
                    <option>INGENIERÍA INDUSTRIAL</option>
                    <option>INGENIERÍA MARÍTIMA</option>
                    <option>INGENIERÍA MECÁNICA</option>
                    <option>INGENIERÍA METALÚRGICA</option>
                    <option>INGENIERÍA NAVAL</option>
                    <option>INGENIERÍA QUÍMICA</option>
                    <option>INMUNOLOGÍA</option>
                    <option>INSPECCIÓN SANITARIA</option>
                    <option>LETRAS</option>
                    <option>MATEMÁTICA</option>
                    <option>MEDICINA</option>
                    <option>MEDICINA VETERINARIA</option>
                    <option>MEDIOS AUDIOVISUALES</option>
                    <option>MERCADEO</option>
                    <option>MERCADOTECNIA</option>
                    <option>METEOROLOGÍA</option>
                    <option>MICOLOGÍA</option>
                    <option>MICROBIOLOGÍA</option>
                    <option>MICROCIRUGÍA</option>
                    <option>MÚSICA</option>
                    <option>NEFROLOGÍA</option>
                    <option>NEUMOLOGÍA</option>
                    <option>NEUROANATOMÍA</option>
                    <option>NEUROBIOLOGÍA</option>
                    <option>NEUROCIRUGÍA</option>
                    <option>NEUROEMBRIOLOGÍA</option>
                    <option>NEUROFISIOLOGÍA</option>
                    <option>NEUROLOGÍA</option>
                    <option>NUTRICIÓN</option>
                    <option>OCEANOGRAFÍA</option>
                    <option>ODONTOLOGÍA</option>
                    <option>OFTALMOLOGÍA</option>
                    <option>ONCOLOGÍA</option>
                    <option>OPTOMETRÍA</option>
                    <option>ORIENTACIÓN</option>
                    <option>ORTOPEDIA</option>
                    <option>OSTEOLOGÍA</option>
                    <option>OTORRINOLARINGOLOGÍA</option>
                    <option>PALEO BIOLOGÍA</option>
                    <option>PALEOBOTÁNICA</option>
                    <option>PALEOGRAFÍA</option>
                    <option>PALEOLOGÍA</option>
                    <option>PALEONTOLOGÍA</option>
                    <option>PATOLOGÍA</option>
                    <option>PEDAGOGÍA</option>
                    <option>PERIODISMO</option>
                    <option>PETRÓLEO</option>
                    <option>PISCICULTOR</option>
                    <option>PROCTOLOGÍA</option>
                    <option>PROFESOR</option>
                    <option>PSICOFÍSICO</option>
                    <option>PSICOLOGÍA</option>
                    <option>PSICOPEDAGOGÍA</option>
                    <option>PSIQUIATRÍA</option>
                    <option>PUBLICIDAD</option>
                    <option>PUERICULTURA</option>
                    <option>QUÍMICA</option>
                    <option>TURISMO</option>
                    <option>RADIOASTRONOMÍA</option>
                    <option>RADIÓLOGO</option>
                    <option>RELACIONES PÚBLICAS</option>
                    <option>RIESGOS Y SEGUROS</option>
                    <option>SALUD BUCAL</option>
                    <option>SEXOLOGÍA</option>
                    <option>SISMOLOGÍA</option>
                    <option>SOCIOLOGÍA</option>
                    <option>TEATRO</option>
                    <option>TECNOLOGÍA AGROFORESTAL</option>
                    <option>TECNOLOGÍA BOMBERO</option>
                    <option>TECNOLOGÍA DE ALIMENTOS</option>
                    <option>TECNOLOGÍA DE GAS</option>
                    <option>TECNOLOGÍA METALÚRGICA</option>
                    <option>TECNOLOGÍA PECUARIA</option>
                    <option>TEOLOGÍA</option>
                    <option>TOPOGRAFÍA</option>
                    <option>TOXICOLOGÍA</option>
                    <option>TRABAJO SOCIAL</option>
                    <option>TRAUMATOLOGÍA</option>
                    <option>UROLOGÍA</option>
                    <option>VIROLOGÍA</option>
                    <option>VULCANOLOGÍA</option>
                    <option>ZOOLOGÍA</option>
                    <option>AVICULTOR</option>
                    <option>ESTUDIANTE</option>

                    
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Año de culminación</label>
                <input onChange={HandleChange} name="yearEnd" type="number" className="input input-sm border border-gray-400" />
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">País</label>
                <select onChange={HandleChange} name="countryId" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>AFGANISTÁN</option>
                    <option>ALBANIA</option>
                    <option>ALEMANIA</option>
                    <option>ANDORRA</option>
                    <option>ANGOLA</option>
                    <option>ANGUILA</option>
                    <option>ANTIGUA Y BARBUDA</option>
                    <option>ARABIA SAUDÍ</option>
                    <option>ARGELIA</option>
                    <option>ARGENTINA</option>
                    <option>ARMENIA</option>
                    <option>ARUBA</option>
                    <option>ARY MACEDONIA</option>
                    <option>AUSTRALIA</option>
                    <option>AUSTRIA</option>
                    <option>AZEBAIYÁN</option>
                    <option>BAHAMAS</option>
                    <option>BAHRÉIN</option>
                    <option>BANGLADESH</option>
                    <option>BARBADOS</option>
                    <option>BELICE</option>
                    <option>BENIN</option>
                    <option>BERMUDAS</option>
                    <option>BHUTÁN</option>
                    <option>BIELORRUSIA</option>
                    <option>BOLIVIA</option>
                    <option>BOSNA Y HERZEGOVINA</option>
                    <option>BOTSUANA</option>
                    <option>BRASIL</option>
                    <option>BRUNÉI</option>
                    <option>BULGARIA</option>
                    <option>BURKINA FASO</option>
                    <option>BURUNDI</option>
                    <option>CABO VERDE</option>
                    <option>CAMBOYA</option>
                    <option>CAMERÚN</option>
                    <option>CANADÁ</option>
                    <option>CHAD</option>
                    <option>CHILE</option>
                    <option>CHINA</option>
                    <option>CHIPRE</option>
                    <option>CIUDAD DEL VATICANO</option>
                    <option>COLOMBIA</option>
                    <option>CONGO</option>
                    <option>COREA DEL NORTE</option>
                    <option>COREA DEL SUR</option>
                    <option>COSTA DE MARFIL</option>
                    <option>COSTA RICA</option>
                    <option>CROACIA</option>
                    <option>CUBA</option>
                    <option>CURACAO</option>
                    <option>DINAMARCA</option>
                    <option>ECUADOR</option>
                    <option>EGIPTO</option>
                    <option>EL SALVADOR</option>
                    <option>EMIRATOS ÁRABES UNIDOS</option>
                    <option>ERITREA</option>
                    <option>ESLOVAQUIA</option>
                    <option>ESLOVENIA</option>
                    <option>ESPAÑA</option>
                    <option>ESTADOS UNIDOS</option>
                    <option>ESTONIA</option>
                    <option>ETIOPÍA</option>
                    <option>FILIPINAS</option>
                    <option>FINLANDIA</option>
                    <option>FIYI</option>
                    <option>FRANCIA</option>
                    <option>GABÓN</option>
                    <option>GAMBIA</option>
                    <option>GEORGIA</option>
                    <option>GHANA</option>
                    <option>GRANADA</option>
                    <option>GRECIA</option>
                    <option>GROENLANDIA</option>
                    <option>GUADALUPE</option>
                    <option>GUAM</option>
                    <option>GUATEMALA</option>
                    <option>GUAYANA FRANCESA</option>
                    <option>GUINEA</option>
                    <option>GUINEA ECUATORIAL</option>
                    <option>GUYANA</option>
                    <option>HAITÍ</option>
                    <option>HONDURAS</option>
                    <option>HONG KONG</option>
                    <option>HUNGRÍA</option>
                    <option>INDIA</option>
                    <option>INDONESIA</option>
                    <option>INGLATERRA</option>
                    <option>IRÁN</option>
                    <option>IRAQ</option>
                    <option>IRLANDA</option>
                    <option>ISLANDIA</option>
                    <option>ISLAS CAIMÁN</option>
                    <option>ISLAS SOLOMÓN</option>
                    <option>ISLAS VÍRGENES DE LOS ESTADOS UNIDOS</option>
                    <option>ISRAEL</option>
                    <option>ITALIA</option>
                    <option>JAMAICA</option>
                    <option>JAPÓN</option>
                    <option>JORDANIA</option>
                    <option>KAZAJSTÁN</option>
                    <option>KENIA</option>
                    <option>KIRGUISTÁN</option>
                    <option>KUWAIT</option>
                    <option>LAOS</option>
                    <option>LESOTHO</option>
                    <option>LETONIA</option>
                    <option>LÍBANO</option>
                    <option>LIBERIA</option>
                    <option>LIBIA</option>
                    <option>LIECHTENSTEIN</option>
                    <option>LITUANIA</option>
                    <option>LUXEMBURGO</option>
                    <option>MACAO</option>
                    <option>MADAGASCAR</option>
                    <option>MALASIA</option>
                    <option>MALAWI</option>
                    <option>MALDIVAS</option>
                    <option>MALÍ</option>
                    <option>MALTA</option>
                    <option>MARRUECOS</option>
                    <option>MAURICIO</option>
                    <option>MAURITANIA</option>
                    <option>MÉXICO</option>
                    <option>MOLDAVIA</option>
                    <option>MÓNACO</option>
                    <option>MONGOLOA</option>
                    <option>MONTENEGRO</option>
                    <option>MOZAMBIQUE</option>
                    <option>MYANMAR</option>
                    <option>NAMIBIA</option>
                    <option>NEPAL</option>
                    <option>NICARAGUA</option>
                    <option>NÍGEL</option>
                    <option>NIGERIA</option>
                    <option>NORUEGA</option>
                    <option>NUEVA CALEDONIA</option>
                    <option>NUEVA ZELANDA</option>
                    <option>OMÁN</option>
                    <option>PAÍSES BAJOS</option>
                    <option>PAKISTÁN</option>
                    <option>PALESTINA</option>
                    <option>PANAMÁ</option>
                    <option>PAPÚA NUEVA GUINEA</option>
                    <option>PARAGUAY</option>
                    <option>PERÚ</option>
                    <option>POLINESIA FRANCESA</option>
                    <option>POLONIA</option>
                    <option>PORTUGAL</option>
                    <option>PUERTO RICO</option>
                    <option>QATAR</option>
                    <option>REPÚBLICA CENTROAFRICANA</option>
                    <option>REPÚBLICA CHECA</option>
                    <option>REPÚBLICA DEMOCRÁTICA DEL CONGO</option>
                    <option>REPÚBLICA DOMINICANA</option>
                    <option>REUNIÓN</option>
                    <option>RUANDA</option>
                    <option>RUMANIA</option>
                    <option>RUSIA</option>
                    <option>SAMOA</option>
                    <option>SAN CRISTOBAL Y NEVIS</option>
                    <option>SAN MARINO</option>
                    <option>SENEGAL</option>
                    <option>SERBIA</option>
                    <option>SEYCHELLES</option>
                    <option>SIERRA LEONA</option>
                    <option>SINGAPUR</option>
                    <option>SIRIA</option>
                    <option>SOMALIA</option>
                    <option>SRI LANKA</option>
                    <option>SUAZILANDIA</option>
                    <option>SUDÁFRICA</option>
                    <option>SUDÁN</option>
                    <option>SUDÁN DEL SUR</option>
                    <option>SUECIA</option>
                    <option>SUIZA</option>
                    <option>SURINAM</option>
                    <option>TAILANDIA</option>
                    <option>TAIWÁN</option>
                    <option>TANZANIA</option>
                    <option>TAYIKISTÁN</option>
                    <option>TIMOR ORIENTAL</option>
                    <option>TOGO</option>
                    <option>TRINIDAD Y TOBAGO</option>
                    <option>TÚNEZ</option>
                    <option>TURKMENISTÁN</option>
                    <option>TURQUÍA</option>
                    <option>UCRANIA</option>
                    <option>UGANDA</option>
                    <option>URUGUAY</option>
                    <option>UZBEKISTÁN</option>
                    <option>VENEZUELA</option>
                    <option>VIETNAM</option>
                    <option>YEMEN</option>
                    <option>YIBUTI</option>
                    <option>ZAMBIA</option>
                    <option>ZIMBABUE</option>
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Institución</label>
                <select onChange={HandleChange} name="institucion" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DEL MAR (IUTEMAR)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ELÍAS CALIXTO POMPA (IUTECP)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA HENRY PITTIER (IUTHEPI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA INDUSTRIAL (IUTI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA JOSÉ LEONARDO CHIRINO (IUTJLCH)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA JOSÉ MARÍA CARREÑO (IUTJMC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA LOS ANDES (IUTLA)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA MARILIS MÉNDEZ (IUTMM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍAMARIO BRICEÑO IRAGORRY (IUTEMBI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA PARA LA INFORMÁTICA (IUTEPI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA PASCAL (IUTEPAS)</option>
                    <option>COLEGIO UNIVERSITARIO JEAN PIAGET (CUJP)</option>
                    <option>COLEGIO UNIVERSITARIO PADRE ISAÍAS OJEDA (CUPIO)</option>
                    <option>INSTITUTO UNIVERSITARIO ADVENTISTA DE VENEZUELA (IUNAV)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA READIC (UNIR)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA PEDRO EMILIO COLL (IUTPEC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA RUFINO BLANCO FOMBONA (IUTRBF)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA SUPERIOR DE ORIENTE (IUTSO)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA TOMÁS LANDER (IUTTOL)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA VENEZUELA (IUTV)</option>
                    <option>INSTITUTO UNIVERSITARIO ECLESIÁSTICO SANTO TOMÁS DE AQUINO (IUESTA)</option>
                    <option>INSTITUTO UNIVERSITARIO JESÚS ENRIQUE LOSSADA (IUJEL)</option>
                    <option>INSTITUTO UNIVERSITARIO JESÚS OBRERO (IUJO)</option>
                    <option>INSTITUTO UNIVERSITARIO INSULAR (IUI)</option>
                    <option>COLEGIO UNIVERSITARIO DE ENFERMERÍA (CUECMC)</option>
                    <option>COLEGIO UNIVERSITARIO DE ENFERMERÍA DE LA CRUZ ROJA DE VENEZUELA (CUECRV)</option>
                    <option>COLEGIO UNIVERSITARIO DE REHABILITACIÓN "MAY HAMILTON" (CUR)</option>
                    <option>COLEGIO UNIVERSITARIO DR. RAFAEL BELLOSO CHACÍN (CUNIBE)</option>
                    <option>INSTITUTO UNIVERSITARIO AVEPANE (IUAVEPANE)</option>
                    <option>INSTITUTO UNIVERSITARIO DE ADMINISTRACIÓN Y GERENCIA (IUDAG)</option>
                    <option>INSTITUTO UNIVERSITARIO DE AERONÁUTICA CIVIL "MAYOR (AV) MIGUEL RODRÍGUEZ" (IUAC)</option>
                    <option>INSTITUTO UNIVERSITARIO LATINOAMERICANO DE AGROECOLOGÍA PAULO FREIRE (IULAPF)</option>
                    <option>INSTITUTO UNIVERSITARIO DE EDUCACIÓN ESPECIALIZADA (IUNE)</option>
                    <option>INSTITUTO UNIVERSITARIO DE LA AUDICIÓN Y EL LENGUAJE (IVAL)</option>
                    <option>COLEGIO UNIVERSITARIO DE ENFERMERÍA (CUEAMC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE LA FRONTERA (IUFRONT)</option>
                    <option>INSTITUTO UNIVERSITARIO DE NUEVAS PROFESIONES (IUNP)</option>
                    <option>INSTITUTO UNIVERSITARIO DE RELACIONES PÚBLICAS (IURP)</option>
                    <option>INSTITUTO UNIVERSITARIO DE SEGUROS (IUS)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA "ARTURO MICHELENA" (IUTAM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA "GENERAL PEDRO MARÍA FREITES" (IUTGPMF)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ALBERTO ADRIANI (IUAA)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA AMAZONAS (IUTA)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ANTONIO JOSÉ DE SUCRE (IUTAJS)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ANTONIO RICAURTE (IUTAR)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA CRISTÓBAL MENDOZA (IUTCM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE ADMINISTRACIÓN INDUSTRIAL (IUTA)</option>
                    <option>UNIVERSIDAD CATÓLICA ANDRÉS BELLO (UCAB)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DE SEGURIDAD INDUSTRIAL (IUTSI)</option>
                    <option>INSTITUTO UNIVERSITARIO PEDAGÓGICO MONSEÑOR RAFAEL ARIAS BLANCO (IUPMA)</option>
                    <option>INSTITUTO UNIVERSITARIO POLITÉCNICO SANTIAGO MARIÑO (IUPMS)</option>
                    <option>INSTITUTO UNIVERSITARIO SAN FRANCISCO (IUSFRA)</option>
                    <option>INSTITUTO UNIVERSITARIO YMCA LOPE MENDOZA (IUYLM)</option>
                    <option>UNIVERSIDAD BOLIVARIANA DE LOS TRABAJADORES "JESÚS RIVERO" (UTJR)</option>
                    <option>UNIVERSIDAD BICENTENARIA DE ARAGUA (UBA)</option>
                    <option>UNIVERSIDAD BOLIVARIANA DE VENEZUELA (UBV)</option>
                    <option>UNIVERSIDAD CATÓLICA DEL TÁCHIRA LOCALIDAD SAN CRISTÓBAL (UCAT)</option>
                    <option>UNIVERSIDAD CATÓLICA SANTA ROSA LOCALIDAD CARACAS (USR)</option>
                    <option>COLEGIO UNIVERSITARIO FERMÍN TORO (CUFT)</option>
                    <option>UNIVERSIDAD CENTRAL DE VENEZUELA (UCV)</option>
                    <option>UNIVERSIDAD CENTRO OCCIDENTAL LISANDRO ALVARADO (UCLA)</option>
                    <option>UNIVERSIDAD DE CARABOBO (UC)</option>
                    <option>UNIVERSIDAD DE FALCÓN (UDEFA)</option>
                    <option>UNIVERSIDAD DE LOS ANDES (ULA)</option>
                    <option>UNIVERSIDAD DE ORIENTE (UDO)</option>
                    <option>UNIVERSIDAD DEPORTIVA DEL SUR (UDS)</option>
                    <option>UNIVERSIDAD JOSÉ MARÍA VARGAS (UJMV)</option>
                    <option>UNIVERSIDAD METROPOLITANA (UNIMET)</option>
                    <option>UNIVERSIDAD NACIONAL DEL TURISMO (UNATUR)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE GUAYANA (UNEG)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LA GRAN CARACAS (UNEXCA)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LA SEGURIDAD (UNES)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LAS ARTES (UNEARTE)</option>
                    <option>COLEGIO UNIVERSITARIO DE PSICOPEDAGOGÍA (CUP)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LOS LLANOS CENTRALES RÓMULO GALLEGOS (UNERG)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LOS LLANOS OCCIDENTALES EZEQUIEL ZAMORA (UNELLEZ)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DEL TRANSPORTE (UNETRANS)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DEL YARACUY (UNEY)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL FRANCISCO DE MIRANDA (UNEFM)</option>
                    <option>UNIVERSIDAD PRIVADA NUEVA ESPARTA (UNE)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL MARÍTIMA DEL CARIBE LOCALIDAD CATIA LA MAR (UMC)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA DE LA FUERZA ARMADA NACIONAL (UNEFA)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL RAFAEL MARÍA BARALT (UNERMB)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL SIMÓN RODRÍGUEZ (UNESR)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL SUR DEL LAGO JESÚS MARÍA SEMPRUM (UNESUR)</option>
                    <option>UNIVERSIDAD NORORIENTAL PRIVADA GRAN MARISCAL DE AYACUCHO (UGMA)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO PORTUGUESA (UPTPJJM)</option>
                    <option>UNIVERSIDAD PEDAGÓGICA EXPERIMENTAL LIBERTADOR (UPEL)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL "JOSÉ ANTONIO ANZOÁTEGUI" (UPTJAA)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE LOS LLANOS “JUANA RAMÍREZ” (UPTLLJR)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE BARLOVENTO "ARGELIA LAYA" (UPTBAL)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE CARACAS “MARISCAL SUCRE” (UPTCMS)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE FALCON "ALONSO GAMERO" (UPTFAG)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE LOS ALTOS MIRANDINOS "CECILIO ACOSTA" (UPTAMCA)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE MARACAIBO (UPTM)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE PARIA "LUIS MARIANO RIVERA" (UPTPLMR)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE PUERTO CABELLO (UPTPC)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE VALENCIA (UPTV)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE YARACUY "ARÍSTIDES BASTIDAS" (UPTYAB)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ALTO APURE "PEDRO CAMEJO" (UPTAAPC)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO ARAGUA "FEDERICO BRITO FIGUEROA" (UPTA)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO BARINAS "JOSÉ FELIX RIBAS" (UPTJFR)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO LARA "ANDRES ELOY BLANCO" (UPTAEB)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO MÉRIDA "KLÉBER RAMÍREZ" (UPTMKR)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA DR. JOSÉ GREGORIO HERNÁNDEZ (UNIHER)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ESCUELA NACIONAL DE ADMINISTRACIÓN Y HACIENDA PÚBLICA (ENAHP)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA INDUSTRIAL (IUTI)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA INDUSTRIAL RODOLFO LOERO ARISMENDI (IUTIRLA)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA JUAN PABLO PÉREZ ALFONZO (IUTEPAL)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO PORTUGUESA (UPTPJJM)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO TRUJILLO "MARIO BRICEÑO IRAGORRY" (UPTMBI)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL NORTE DE MONAGAS "LUDOVICO SILVA" (UPTNMLS)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL NORTE DEL TÁCHIRA "MANUELA SÁENZ" (UPTNTMS)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ZULIA (UPTZ)</option>
                    <option>UNIVERSIDAD PRIVADA DR. JOSÉ GREGORIO HERNÁNDEZ (UJGH)</option>
                    <option>UNIVERSIDAD PRIVADA ALONSO DE OJEDA (UAO)</option>
                    <option>UNIVERSIDAD PRIVADA DE MARGARITA (UNIMAR)</option>
                    <option>UNIVERSIDAD PRIVADA FERMÍN TORO (UFT)</option>
                    <option>UNIVERSIDAD PRIVADA JOSÉ ANTONIO PÁEZ (UJAP)</option>
                    <option>UNIVERSIDAD PRIVADA MONTEÁVILA (UMA)</option>
                    <option>UNIVERSIDAD RAFAEL URDANETA (URU)</option>
                    <option>UNIVERSIDAD SANTA MARÍA (USM)</option>
                    <option>UNIVERSIDAD TERRITORIAL DELTAICA FRANCISCO TAMAYO (UTDFT)</option>
                    <option>UNIVERSIDAD VALLE DEL MOMBOY (UVM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA PEDRO EMILIO COLL (IUTPEC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA READIC (UNIR)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA RUFINO BLANCO FOMBONA (IUTRBF)</option>
                    <option>INSTITUTO UNIVERSITARIO GRAN COLOMBIA (IUGC)</option>
                    <option>COLEGIO UNIVERSITARIO DE ADMINISTRACIÓN Y MERCADEO (CUAM)</option>
                    <option>COLEGIO UNIVERSITARIO MONSEÑOR DE TALAVERA (CUMT)</option>
                    <option>INSTITUTO UNIVERSITARIO CARLOS SOUBLETTE (IUNICS)</option>
                    <option>INSTITUTO UNIVERSITARIO DE CIENCIAS ADMINISTRATIVAS Y FISCALES (IUCAF)</option>
                    <option>INSTITUTO UNIVERSITARIO DE DISEÑO LAS MERCEDES (IUDLM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE GERENCIA Y TECNOLOGÍA (IUGT)</option>
                    <option>INSTITUTO UNIVERSITARIO DE MERCADOTECNIA (ISUM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE PROFESIONES GERENCIALES (IUPG)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA "LAURA EVANGELISTA ALVARADO CARDOZO" (IUTLEAC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA "POLYCOM" (POLYCOM)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA AMÉRICO VESPUCIO (IUTAV)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA CORONEL AGUSTÍN CODAZZI (IUTAC)</option>
                    <option>INSTITUTO UNIVERSITARIO SALESIANO PADRE OJEDA (IUSPO)</option>
                    <option>UNIVERSIDAD AUDIOVISUAL DE VENEZUELA (UAV)</option>
                    <option>UNIVERSIDAD CAMPESINA DE VENEZUELA "ALGIMIRO GABALDON" (UCVAG)</option>
                    <option>UNIVERSIDAD DE LAS CIENCIAS DE LA SALUD "HUGO CHÁVEZ FRÍAS" (UCS)</option>
                    <option>UNIVERSIDAD DEL ZULIA (LUZ)</option>
                    <option>UNIVERSIDAD EXPERIMENTAL PRIVADA CECILIO ACOSTA (UNICA)</option>
                    <option>UNIVERSIDAD MILITAR BOLIVARIANA DE VENEZUELA (UMBV)</option>
                    <option>UNIVERSIDAD NACIONAL ABIERTA (UNA)</option>
                    <option>UNIVERSIDAD NACIONAL DEL TURISMO (CUHELAV) (UNATUR)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE LARA "MARTIN LUTHER KING" (UNELMLK)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DEL TÁCHIRA (UNET)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA ANTONIO JOSÉ DE SUCRE (UNEXPO)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL SIMÓN BOLÍVAR (USB)</option>
                    <option>UNIVERSIDAD PANAMERICANA DEL PUERTO (UPAP)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL AGROINDUSTRIAL DEL ESTADO TÁCHIRA (UPTAIT)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE LOS VALLES DEL TUY (UPTVT)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE MARACAIBO (UPTM)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DE PUERTO CABELLO (UPTPC)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO BOLÍVAR (UPTB)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO PORTUGUESA (UPTPJJM)</option>
                    <option>UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL OESTE DE SUCRE "CLODOSBALDO RUSSIÁN" (UPTOSCR)</option>
                    <option>UNIVERSIDAD PRIVADA ALEJANDRO DE HUMBOLDT (UAH)</option>
                    <option>UNIVERSIDAD PRIVADA DR. RAFAEL BELLOSO CHACÍN (URBE)</option>
                    <option>UNIVERSIDAD PRIVADA YACAMBÚ (UNY)</option>
                    <option>UNIVERSIDAD TECNOLÓGICA DEL CENTRO (UNITEC)</option>
                    <option>UNIVERSIDAD PRIVADA ARTURO MICHELENA (UAM)</option>
                    <option>ASOCIACIÓN CIVIL INSTITUTO DE ESTUDIOS SUPERIORES DE ADMINISTRACIÓN  (IESA)</option>
                    <option>FUNDACIÓN ESCUELA VENEZOLANA DE PLANIFICACIÓN (FEVP)</option>
                    <option>INSTITUTO VENEZOLANO DE INVESTIGACIONES CIENTÍFICAS (IVIC)</option>
                    <option>INSTITUTO UNIVERSITARIO DE TECNOLOGÍA REGIÓN CAPITAL DR. FEDERICO RIVERO PALACIO</option>
                    <option>UNIVERSIDAD VENEZOLANA DE LOS HIDROCARBUROS</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DE ESPECIALIDADES ELÉCTRICAS (UNEXEE)</option>
                    <option>UNIVERSIDAD LATINOAMERICANA Y DEL CARIBE (ULAC)</option>
                    <option>ESCUELA DE POSTGRADO DE LA ARMADA (EPAR)</option>
                    <option>ESCUELA SUPERIOR DE GUERRA NAVAL (ESGN)</option>
                    <option>UNIVERSIDAD NACIONAL DE LAS CIENCIAS DR. HUMBERTO FERNÁNDEZ-MORÁN (UNC)</option>
                    <option>ESCUELA NAVAL DE VENEZUELA (ENV)</option>
                    <option>UNIVERSIDAD NACIONAL EXPERIMENTAL DEL MAGISTERIO SAMUEL ROBINSON (UNEM)</option>
                    <option>ESCUELA SOCIALISTA DE AGRICULTURA TROPICAL (ESAT)</option>
                    <option>INSTITUTO DE ALTOS ESTUDIO DE LA DEFENSA NACIONAL (IAESEN)</option>

                </select>
            </label>
<br/>
            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Área</label>
                <select onChange={HandleChange} name="area" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>CIENCIAS AGRÍCOLAS</option>
                    <option>CIENCIAS MÉDICAS Y DE LA SALUD</option>
                    <option>CIENCIAS SOCIALES</option>
                    <option>CIENCIAS Y ARTES MILITARES</option>
                    <option>CIENCIAS NATURALES</option>
                    <option>ARTES Y HUMANIDADES</option>
                    <option>INGENIERÍA Y TECNOLOGÍA</option>
                    
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Subárea</label>
                <select onChange={HandleChange} name="subarea" className="select select-sm border border-gray-400">
                    <option value={``}></option>

                    {/*subarea de CIENCIAS AGRÍCOLAS */}
                    <option>AGRONOMÍA</option>
                    <option>AGROQUÍMICA</option>
                    <option>CIENCIA FORESTAL</option>
                    <option>CIENCIAS VETERINARIAS</option>
                    <option>FITOPATOLOGÍA</option>
                    <option>HORTICULTURA</option>
                    <option>PECES Y FAUNA SILVESTRE</option>
                    <option>PRODUCCIÓN ANIMAL</option>
                    <option>OTRAS ESPECIALIDADES AGRARIAS</option>

                    {/*subarea de CIENCIAS MÉDICAS Y DE LA SALUD*/}
                    <option>ANTROPOLOGÍA (FÍSICA)</option>
                    <option>BIOFÍSICA</option>
                    <option>BIOLOGÍA ANIMAL (ZOOLOGÍA)</option>
                    <option>BIOLOGÍA CELULAR</option>
                    <option>BIOLOGÍA HUMANA</option>
                    <option>BIOLOGÍA MOLECULAR</option>
                    <option>BIOLOGÍA VEGETAL (BOTÁNICA)</option>
                    <option>BIOMATEMÁTICAS</option>
                    <option>BIOMETRÍA</option>
                    <option>BIOQUÍMICA</option>
                    <option>CIENCIAS CLÍNICAS</option>
                    <option>CIENCIAS DE LA NUTRICIÓN</option>
                    <option>CIRUGÍA</option>
                    <option>EPIDEMIOLOGÍA</option>
                    <option>ETOLOGÍA</option>
                    <option>FARMACODINÁMICA</option>
                    <option>FARMACOLOGÍA</option>
                    <option>FISIOLOGÍA HUMANA</option>
                    <option>GENÉTICA</option>
                    <option>INMUNOLOGÍA</option>
                    <option>MEDICINA DEL TRABAJO</option>
                    <option>MEDICINA FORENSE</option>
                    <option>MEDICINA INTERNA</option>
                    <option>MEDICINA PREVENTIVA</option>
                    <option>MICROBIOLOGÍA</option>
                    <option>NEUROCIENCIAS</option>
                    <option>PALEONTOLOGÍA</option>
                    <option>PATOLOGÍA</option>
                    <option>PSIQUIATRÍA</option>
                    <option>RADIOBIOLOGÍA</option>
                    <option>SALUD PÚBLICA</option>
                    <option>SIMBIOSIS</option>
                    <option>TOXICOLOGÍA</option>
                    <option>VIROLOGÍA</option>
                    <option>OTRAS ESPECIALIDADES DE LA BIOLOGÍA</option>
                    <option>OTRAS ESPECIALIDADES MÉDICAS</option>
                    <option>COVID-19</option>
                   
                     {/*subarea de CIENCIAS SOCIALES*/}
                    <option>ACTIVIDAD ECONÓMICA</option>
                    <option>ANTROPOLOGÍA CULTURAL</option>
                    <option>ANTROPOLOGÍA SOCIAL</option>
                    <option>ASESORAMIENTO Y ORIENTACIÓN</option>
                    <option>CAMBIO Y DESARROLLO SOCIAL</option>
                    <option>CARACTERÍSTICAS DE LA POBLACIÓN</option>
                    <option>CIENCIAS POLÍTICAS</option>
                    <option>COMUNICACIONES SOCIALES</option>
                    <option>CONTABILIDAD ECONÓMICA</option>
                    <option>DEMOGRAFÍA GENERAL</option>
                    <option>DEMOGRAFÍA GEOGRÁFICA</option>
                    <option>DEMOGRAFÍA HISTÓRICA</option>
                    <option>DERECHO CANÓNICO</option>
                    <option>DERECHO INTERNACIONAL</option>
                    <option>DERECHO Y LEGISLACIÓN NACIONALES</option>
                    <option>ECONOMETRÍA</option>
                    <option>ECONOMÍA DEL CAMBIO TECNOLÓGICO</option>
                    <option>ECONOMÍA GENERAL</option>
                    <option>ECONOMÍA INTERNACIONAL</option>
                    <option>ECONOMÍA SECTORIAL</option>
                    <option>ESTUDIO PSICOLÓGICO DE TEMAS SOCIALES</option>
                    <option>EVALUACIÓN Y DIAGNÓSTICO EN PSICOLOGÍA</option>
                    <option>FERTILIDAD</option>
                    <option>GRUPOS SOCIALES</option>
                    <option>IDEOLOGÍAS POLÍTICAS</option>
                    <option>INSTITUCIONES POLÍTICAS</option>
                    <option>MORTALIDAD</option>
                    <option>OPINIÓN PÚBLICA</option>
                    <option>ORGANIZACIÓN INDUSTRIAL Y POLÍTICAS GUBERNAMENTALES</option>
                    <option>ORGANIZACIÓN JURÍDICA</option>
                    <option>ORGANIZACIÓN Y DIRECCIÓN DE EMPRESAS</option>
                    <option>PATOLOGÍA</option>
                    <option>PERSONALIDAD</option>
                    <option>ETNOGRAFÍA Y ETNOLOGÍA</option>
                    <option>POLÍTICA FISCAL Y HACIENDA PUBLICA NACIONALES</option>
                    <option>PROBLEMAS INTERNACIONALES</option>
                    <option>PROBLEMAS SOCIALES</option>
                    <option>PSICOFARMACOLOGÍA</option>
                    <option>PSICOLOGÍA DE LA VEJEZ</option>
                    <option>PSICOLOGÍA DEL NIÑO Y DEL ADOLESCENTE</option>
                    <option>PSICOLOGÍA EXPERIMENTAL</option>
                    <option>PSICOLOGÍA GENERAL</option>
                    <option>PSICOLOGÍA INDUSTRIAL</option>
                    <option>PSICOLOGÍA SOCIAL</option>
                    <option>PSICOPEDAGOGÍA</option>
                    <option>RELACIONES INTERNACIONALES</option>
                    <option>SISTEMAS ECONÓMICOS</option>
                    <option>SISTEMAS POLÍTICOS</option>
                    <option>SISTEMAS POLÍTICOS: ÁREA AMERICANA</option>
                    <option>SOCIOLOGÍA CULTURAL</option>
                    <option>SOCIOLOGÍA DE LOS ASENTAMIENTOS HUMANOS</option>
                    <option>SOCIOLOGÍA DEL TRABAJO</option>
                    <option>SOCIOLOGÍA GENERAL</option>
                    <option>SOCIOLOGÍA MATEMÁTICA</option>
                    <option>SOCIOLOGÍA POLÍTICA</option>
                    <option>TAMAÑO DE LA POBLACIÓN Y EVOLUCIÓN DEMOGRÁFICA</option>
                    <option>TEORÍA ECONÓMICA</option>
                    <option>TEORÍA POLÍTICA</option>
                    <option>TEORÍA Y MÉTODOS GENERALES</option>
                    <option>VIDA POLÍTICA</option>
                    <option>OTRAS ESPECIALIDADES ANTROPOLÓGICAS</option>
                    <option>OTRAS ESPECIALIDADES DEMOGRÁFICAS</option>
                    <option>OTRAS ESPECIALIDADES ECONÓMICAS</option>
                    <option>OTRAS ESPECIALIDADES JURÍDICAS</option>
                    <option>OTRAS ESPECIALIDADES POLÍTICAS</option>
                    <option>OTRAS ESPECIALIDADES PSICOLÓGICAS</option>
                    <option>OTRAS ESPECIALIDADES SOCIOLÓGICAS</option>
                    <option>MUJERES EN LA CIENCIA</option>
                    <option>GÉNERO</option>

                     {/*subarea de CIENCIAS Y ARTES MILITARES*/}
                    <option>OTRA</option>
                    <option>EDUCACIÓN MILITAR</option>
                    <option>PEDAGOGÍA EN CIENCIAS Y ARTES MILITARES</option>
                    <option>TECNOLOGÍA MILITAR</option>
                    
                     {/*subarea de CIENCIAS NATURALES*/}
                    <option>ESTADÍSTICA</option>
                    <option>FÍSICA ATÓMICA Y NUCLEAR</option>
                    <option>FÍSICA DE ALTAS ENERGÍAS</option>
                    <option>FÍSICA DE FLUIDOS</option>
                    <option>FÍSICA DEL ESTADO SÓLIDO</option>
                    <option>FÍSICA MOLECULAR</option>
                    <option>GEODESIA</option>
                    <option>GEOFÍSICA</option>
                    <option>GEOGRAFÍA</option>
                    <option>GEOGRAFÍA ECONÓMICA</option>
                    <option>GEOGRAFÍA HISTÓRICA</option>
                    <option>GEOGRAFÍA HUMANA</option>
                    <option>GEOGRAFÍA REGIONAL</option>
                    <option>GEOLOGÍA</option>
                    <option>GEOMETRÍA</option>
                    <option>GEOQUÍMICA</option>
                    <option>HIDROLOGÍA</option>
                    <option>INVESTIGACIÓN OPERATIVA</option>
                    <option>LÓGICA DEDUCTIVA</option>
                    <option>LÓGICA GENERAL</option>
                    <option>LÓGICA INDUCTIVA</option>
                    <option>MECÁNICA</option>
                    <option>MEDIO INTERPLANETARIO</option>
                    <option>METEOROLOGÍA</option>
                    <option>METODOLOGÍA</option>
                    <option>NUCLEÓNICA</option>
                    <option>OCEANOGRAFÍA</option>
                    <option>ÓPTICA</option>
                    <option>PLANETOLOGÍA</option>
                    <option>PROBABILIDAD</option>
                    <option>QUÍMICA ANALÍTICA</option>
                    <option>QUÍMICA FARMACÉUTICA</option>
                    <option>QUÍMICA FÍSICA</option>
                    <option>QUÍMICA INORGÁNICA</option>
                    <option>QUÍMICA MACROMOLECULAR</option>
                    <option>QUÍMICA NUCLEAR</option>
                    <option>QUÍMICA ORGÁNICA</option>
                    <option>RADIOASTRONOMÍA</option>
                    <option>SISTEMA SOLAR</option>
                    <option>TEORÍA DE NÚMEROS</option>
                    <option>TERMODINÁMICA</option>
                    <option>TOPOLOGÍA</option>
                    <option>OTRAS ESPECIALIDADES ASTRONÓMICAS</option>
                    <option>OTRAS ESPECIALIDADES DE LA TIERRA, ESPACIO O ENTORNO</option>
                    <option>OTRAS ESPECIALIDADES FÍSICAS</option>
                    <option>OTRAS ESPECIALIDADES GEOGRÁFICAS</option>
                    <option>OTRAS ESPECIALIDADES MATEMÁTICAS</option>
                    <option>OTRAS ESPECIALIDADES QUÍMICAS</option>
                    <option>OTRAS ESPECIALIDADES RELATIVAS A LA LÓGICA</option>
                    <option>ACÚSTICA</option>
                    <option>ÁLGEBRA</option>
                    <option>ANÁLISIS NUMÉRICO</option>
                    <option>ANÁLISIS Y ANÁLISIS FUNCIONAL</option>
                    <option>APLICACIONES DE LA LÓGICA</option>
                    <option>ASTRONOMÍA ÓPTICA</option>
                    <option>BIOQUÍMICA</option>
                    <option>CIENCIA DE LOS ORDENADORES</option>
                    <option>CIENCIAS DE LA ATMÓSFERA</option>
                    <option>CIENCIAS DEL ESPACIO</option>
                    <option>CIENCIAS DEL SUELO (EDAFOLOGÍA)</option>
                    <option>CLIMATOLOGÍA</option>
                    <option>COSMOLOGÍA Y COSMOGONÍA</option>
                    <option>ELECTROMAGNETISMO</option>
                    <option>ELECTRÓNICA</option>

                     {/*subarea de ARTES Y HUMANIDADES*/}
                    <option>ANTROPOLOGÍA FILOSÓFICA</option>
                    <option>ARQUITECTURA</option>
                    <option>BIOGRAFÍAS</option>
                    <option>CIENCIAS AUXILIARES DE LA HISTORIA</option>
                    <option>DOCTRINAS FILOSÓFICAS</option>
                    <option>EDUCACIÓN FÍSICA Y DEPORTE</option>
                    <option>ÉTICA CLÁSICA</option>
                    <option>ÉTICA DE GRUPO</option>
                    <option>ÉTICA DE INDIVIDUOS</option>
                    <option>FILOSOFÍA DE LA NATURALEZA</option>
                    <option>FILOSOFÍA DEL CONOCIMIENTO</option>
                    <option>FILOSOFÍA GENERAL</option>
                    <option>FILOSOFÍA SOCIAL</option>
                    <option>GEOGRAFÍA LINGÜÍSTICA</option>
                    <option>HISTORIA DE PAÍSES</option>
                    <option>HISTORIA GENERAL</option>
                    <option>HISTORIA POR ÉPOCAS</option>
                    <option>HISTORIA POR ESPECIALIDADES</option>
                    <option>LA ÉTICA EN PERSPECTIVA</option>
                    <option>LINGÜÍSTICA APLICADA</option>
                    <option>LINGÜÍSTICA DIACRÓNICA</option>
                    <option>LINGÜÍSTICA SINCRÓNICA</option>
                    <option>ORGANIZACIÓN Y PLANIFICACIÓN DE LA EDUCACIÓN</option>
                    <option>PREPARACIÓN Y EMPLEO DE PROFESORES</option>
                    <option>SISTEMAS FILOSÓFICOS</option>
                    <option>TEORÍA LINGÜÍSTICA</option>
                    <option>TEORÍA Y MÉTODOS EDUCATIVOS</option>
                    <option>TEORÍA, ANÁLISIS Y CRÍTICA DE LAS BELLAS ARTES</option>
                    <option>TEORÍA, ANÁLISIS Y CRÍTICA LITERARIAS</option>
                    <option>OTRAS ESPECIALIDADES ARTÍSTICAS</option>
                    <option>OTRAS ESPECIALIDADES FILOSÓFICAS</option>
                    <option>OTRAS ESPECIALIDADES HISTÓRICAS</option>
                    <option>OTRAS ESPECIALIDADES LINGÜÍSTICAS</option>
                    <option>OTRAS ESPECIALIDADES PEDAGÓGICAS</option>
                    
                     {/*subarea de INGENIERÍA Y TECNOLOGÍA*/}
                    <option>INGENIERÍA Y TECNOLOGÍA AERONÁUTICAS</option>
                    <option>INGENIERÍA Y TECNOLOGÍA DEL MEDIO AMBIENTE</option>
                    <option>INGENIERÍA Y TECNOLOGÍA ELÉCTRICAS</option>
                    <option>INGENIERÍA Y TECNOLOGÍA QUÍMICAS</option>
                    <option>PLANIFICACIÓN URBANA</option>
                    <option>PROCESOS TECNOLÓGICOS</option>
                    <option>TECNOLOGÍA BIOQUÍMICA</option>
                    <option>TECNOLOGÍA DE LA CONSTRUCCIÓN</option>
                    <option>TECNOLOGÍA DE LA INSTRUMENTACIÓN</option>
                    <option>TECNOLOGÍA DE LAS TELECOMUNICACIONES</option>
                    <option>TECNOLOGÍA DE LOS ALIMENTOS</option>
                    <option>TECNOLOGÍA DE LOS FERROCARRILES</option>
                    <option>TECNOLOGÍA DE LOS ORDENADORES</option>
                    <option>TECNOLOGÍA DE LOS SISTEMAS DE TRANSPORTE</option>
                    <option>TECNOLOGÍA DE MATERIALES</option>
                    <option>TECNOLOGÍA DE VEHÍCULOS DE MOTOR</option>
                    <option>TECNOLOGÍA DEL CARBÓN Y DEL PETRÓLEO</option>
                    <option>TECNOLOGÍA DEL ESPACIO</option>
                    <option>TECNOLOGÍA E INGENIERÍA MECÁNICAS</option>
                    <option>TECNOLOGÍA ELECTRÓNICA</option>
                    <option>TECNOLOGÍA ENERGÉTICA</option>
                    <option>TECNOLOGÍA INDUSTRIAL</option>
                    <option>TECNOLOGÍA MÉDICA</option>
                    <option>TECNOLOGÍA METALÚRGICA</option>
                    <option>TECNOLOGÍA MINERA</option>
                    <option>TECNOLOGÍA NAVAL</option>
                    <option>TECNOLOGÍA NUCLEAR</option>
                    <option>TECNOLOGÍA TEXTIL</option>
                    <option>OTRAS ESPECIALIDADES TECNOLÓGICAS</option>
                    
                </select>
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
