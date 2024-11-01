import { ReactNode } from "react"

interface Props {
    children: ReactNode;
    customClass: string
}
 
export function CurrentLi ({ children,customClass }: Props) {

    return (
        <li 
            className={`${customClass} `}
        >
            {children}
        </li>
    )

}
