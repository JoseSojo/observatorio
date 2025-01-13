import { Document, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ReportInterface } from "../../types/report/ReportInterface";

interface Props {
    item: ReportInterface;
    filter: any
}

export default function ReportDocument({ item }: Props) {

    const customPages = item.page;
    const header = item.header;
    const count = item.count;

    return (
        <PDFViewer className='min-h-[80vh] w-full'>
            <Document title='Reporte'>
                {
                    customPages.map((page, i) => (
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
                                        {/* {
                                            label.map(item => (
                                                <Text style={styles.bodyTableText}>
                                                    {ExtractValue({ extractBy: item, item: list, current: true })}
                                                </Text>
                                            ))
                                        } */}
                                        <Text style={styles.bodyTableText}>
                                            {list.title}
                                        </Text>
                                        <Text style={styles.bodyTableText}>
                                            {list.programRef.name}
                                        </Text>
                                        <Text style={styles.bodyTableText}>
                                            {list.programRef.categoryRef.name}
                                        </Text>
                                        <Text style={styles.bodyTableText}>
                                            {list.lineRef ? list.lineRef.name : ``}
                                        </Text>
                                        <View style={{fontSize: 9,display:`flex`,flexDirection:`column`,justifyContent:`space-between`,gap:3}}>
                                            {
                                                list.authos.map((author: any, i:number) => (
                                                    <View style={{paddingHorizontal:5}}>
                                                        <Text>{i+1} - {author.createByRef.name} {author.createByRef.lastname}</Text>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                        <Text style={styles.bodyTableText}>
                                            {list.createAt}
                                        </Text>
                                    </View>
                                ))
                            }
                            <View>
                                <Text style={{ fontSize: 12, color: `#515559`, marginTop: 10, textAlign: `center` }}>{count}/{count > 12 ? count : 12}</Text>
                                <Text style={{ color: `#fff` }}>.</Text>
                            </View>
                        </Page>
                    ))
                }
            </Document>
        </PDFViewer >
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
