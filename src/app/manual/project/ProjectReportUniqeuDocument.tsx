import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../../utils/token copy';
import { RequestOptionsGetToken } from '../../../utils/req/RequetsOptions';
import { API } from '../../../entorno';
import ExtractValue from '../../../utils/ExtractValue';


export default function ProjectReportUniqueDocument() {

    const { id } = useParams() as { crud: string, type: string, id: string };

    const user = JSON.parse(getUser());
    const date = new Date();

    const [data, setData] = useState<any>({});
    const [history, setHistory] = useState<any>([]);
    const [header, setHeader] = useState<string[]>([]);
    const [label, setLabel] = useState<string[]>([]);
    const [countHistory, setCountHistory] = useState(0);
    const [authors, setAuthors] = useState<any[]>([]);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/project/report/unique/${id}`;
            const req = RequestOptionsGetToken({ method: `GET` });

            const result = await fetch(url, req);
            const jsonPromise = result.json();
            if (!result.ok) {
                const jsonError = await jsonPromise;
                return jsonError
            }

            const json = await jsonPromise;

            setAuthors(json.data.authos);

            setData(json.data);
            setHeader(json.header);
            setLabel(json.label);
            setHistory(json.history.list);
            setCountHistory(json.history.count);
            return;
            countHistory
            history
        }
        Execute();
    }, []);

    return (
        <PDFViewer className='min-h-screen w-full'>
            <Document title='Reporte'>
                <Page style={styles.page}>
                    <View>
                        <Text style={styles.title}>Reporte Único</Text>
                        <Text style={{ ...styles.text, fontSize: 18 }}>{user.name} {user.lastname}</Text>
                        <Text style={styles.text}>{date.getDate()} - {date.getMonth() + 1} - {date.getFullYear()}</Text>
                        <View style={{marginVertical:10}}>

                            <Text style={{ ...styles.text, fontSize: 18,textAlign:`left` }}>Autores</Text>

                            {
                                authors && authors.length > 0 && authors.map(item => (<Text style={{...styles.text, textAlign:`left`}}>- {item.createByRef.name} {item.createByRef.lastname}</Text>))
                            }
                        </View>

                        {
                            label.map((l, i) => (
                                <View style={{ ...styles.viewRow, marginTop: 3 }}>
                                    <Text style={{ ...styles.text, fontSize: 10 }}>- {header[i]}:</Text>
                                    <Text style={{ ...styles.text, fontSize: 12 }}>{ExtractValue({ extractBy: l, item: data })}</Text>
                                </View>
                            ))
                        }
                        <Text style={{ ...styles.text, marginTop: 20 }}>Historial Aquí</Text>
                    </View>
                </Page>
                {/* {
                    list &&
                    list.map((page, i) => (
                        <Page size="A4" style={styles.page}>
                            <View style={styles.pageTop}>
                                <Text style={styles.text}>Reporte</Text>
                                <Text style={styles.text}>Página {i + 1}</Text>
                            </View>
                            <View style={styles.headerTable}>
                                {
                                    header.map((h) => (
                                        <Text style={styles.headerTableText}>{h}</Text>
                                    ))
                                }
                            </View>
                            {
                                page.list.map((list) => (
                                    <View style={styles.bodyTable}>
                                        {
                                            label.map(item => (
                                                <Text style={styles.bodyTableText}>
                                                    {ExtractValue({ extractBy:item,item:list })}
                                                </Text>
                                            ))
                                        }
                                    </View>
                                ))
                            }
                            <View>
                                <Text style={{fontSize:12,color:`#515559`,marginTop:10, textAlign:`center`}}>{count}/{count>12 ? count : 12}</Text>
                                <Text style={{color:`#fff`}}>.</Text>
                            </View>
                        </Page>
                    ))
                } */}
            </Document>
        </PDFViewer>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: `30px 40px`
    },
    pageTop: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        paddingHorizontal: 10
    },
    viewRow: {
        display: `flex`,
        flexDirection: `row`,
        gap: 5
    },
    title: {
        fontSize: 40,
        textAlign: `center`,
        fontWeight: `black`,
        color: `#313539`,
    },
    text: {
        fontSize: 13,
        textAlign: `center`,
        fontWeight: `bold`,
        color: `#414549`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`
    },
    headerTable: {
        display: `flex`,
        justifyContent: 'space-evenly',
        gap: 0,
        flexDirection: `row`,
        alignItems: `center`,
        marginTop: 10,
        backgroundColor: `#212529`,
        paddingVertical: 6
    },
    headerTableText: {
        fontSize: 11,
        fontWeight: `bold`,
        color: `#fff`
    },
    bodyTable: {
        display: `flex`,
        justifyContent: 'space-evenly',
        gap: 0,
        flexDirection: `row`,
        alignItems: `center`,
        backgroundColor: `#fff`,
        paddingVertical: 2,
        borderBottom: `1px solid #212529`
    },
    bodyTableText: {
        fontSize: 9,
        fontWeight: `bold`,
        color: `#212529`,
        flex: 1,
        textAlign: `center`
    }
});
