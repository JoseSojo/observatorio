import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function ModalTemplate ({children}:Props) {

    return (
        <div className="card bg-base-100 h-full w-full min-h-[200px] p-3 overflow-y-auto">
            {children}
        </div>
    )
}
