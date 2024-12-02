import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function SingleCard ({children}: Props) {

    return (
        <div className="card bg-base-100 w-[90%] lg:w-[70%] shadow-lg border-t p-5">
            {children}
        </div>
    )
}
