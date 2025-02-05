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
                    <option>ANTIGUA Y N¿BARBUDA</option>
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
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
            </label>
<br/>
            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Área</label>
                <select onChange={HandleChange} name="area" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>Área 1</option>
                    <option>Área 2</option>
                    <option>Área 3</option>
                </select>
            </label>

            <label className="grid w-full">
                <label className="text-sm text-gray-600 font-semibold">Subárea</label>
                <select onChange={HandleChange} name="subarea" className="select select-sm border border-gray-400">
                    <option value={``}></option>
                    <option>Subárea 1</option>
                    <option>Subárea 2</option>
                    <option>Subárea 3</option>
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
