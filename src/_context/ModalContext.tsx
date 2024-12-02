import { createContext, ReactNode, useContext, useState } from "react";

interface ModalInterface {
    active: boolean;
    show: (element: any) => void;
    hidden: () => void;
    element: ReactNode
}

const defaultModal: ModalInterface = {
    active: false,
    element: <></>,
    hidden: () => {},
    show: () => {}
} 

export const ModalContext = createContext<ModalInterface>(defaultModal);

interface Props {
    children: ReactNode;
}

export function ModalProvider ({children}: Props) {

    const [active,setActive] = useState<boolean>(false);
    const [element,setElement] = useState<any>(<></>);

    const show = (element: any) => {
        setElement(element);
        setActive(true);
    }

    const hidden = () => {
        setElement(null);
        setActive(false);
    }

    return (
        <ModalContext.Provider
            value={{ active,element,hidden,show }}
        >
            {
                active && <div className="w-screen min-h-screen bg-black bg-opacity-70 fixed z-50">
                    <button onClick={hidden} className="top-10 right-10 text-white bg-black py-2 px-3 rounded-xl font-black text-xl absolute">X</button>
                    <div className="min-h-screen w-screen flex justify-center items-center">
                        <div className="w-[90%] lg:w-[70%]">
                            {element}
                        </div>
                    </div>
                </div>
            }
            {children}
            

        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext);
