import { ReactNode } from "react"
import Slide from "../_organism/Slide"
import Nav from "../_organism/Nav"
import Header from "../_organism/Header"

interface Props {
    children: ReactNode
}

export default function DashboardTemplate ({children}: Props) {

    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <Header />
            <div className="grid grid-cols-1 lg:grid-cols-[.20fr_1fr] flex-1">
                <Slide />
                <div className="p-3 m-3 card">
                    {children}
                </div>
            </div>
        </div>
    )
}
