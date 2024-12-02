import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../../entorno';
import { RequestOptionsGetToken } from '../../../utils/req/RequetsOptions';
import ExtractValue from '../../../utils/ExtractValue';


export default function ProjectReportDocument() {

    const { type } = useParams() as { type: string };

    const [list, setList] = useState<{ list: [] }[]>([]);
    const [header, setHeader] = useState<string[]>([]);
    const [label, setLabel] = useState<string[]>([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/project/report/${type}`;
            const req = RequestOptionsGetToken({ method: `GET` });

            const result = await fetch(url, req);
            const jsonPromise = result.json();
            if (!result.ok) {
                const jsonError = await jsonPromise;
                return jsonError
            }

            const json = await jsonPromise;

            setList(json.page);
            setHeader(json.header);
            setLabel(json.label);
            setCount(json.count);
        }
        Execute();
    }, []);

    return (
        <PDFViewer className='min-h-screen w-full'>
            <Document title='Reporte'>
                {
                    list &&
                    list.map((page, i) => (
                        <Page size="A4" style={styles.page} orientation='landscape'>
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
                                                    {ExtractValue({ extractBy:item,item:list,current:true })}
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
                }
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
