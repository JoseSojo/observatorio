
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export function AuthPublicTemplate({ children }: Props) {



    return (
        <div className="bg-custom-white-100 min-h-screen grid lg:grid-cols-2 grid-cols-1">

            <div className="h-full w-full flex justify-center items-center">
                {children}
            </div>

            <div className="hidden lg:flex h-full p-5 justify-end items-start">
                <div className="bg-custom-white rounded-rounded-20 w-full h-full p-5">
                    
                </div>
            </div>

        </div>
    );

}
