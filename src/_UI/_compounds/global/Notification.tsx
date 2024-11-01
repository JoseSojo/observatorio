import { useNotification } from "../../../_context/NotificationContext";
import { CurrentButtom } from "../../_atoms/CurrentButton";
import { GetIcon } from "../../_icons/IconsHandle";

interface Props { }

export function Notification() {

    const noti = useNotification();

    return (
        <>
            {
                noti.message.active && <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50 absolute top-3 right-3">
                    <div
                        className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
                    >
                        <div className="flex gap-2">
                            {
                                noti.message.type == "error"
                                ? <div className="text-red-700 text-xl bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                                {GetIcon(`success`)}
                            </div>
                                : <div className="text-emerald-700 text-xl bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                                    {GetIcon(`success`)}
                                </div>
                            }
                            <div className="flex w-full items-center">
                                <p className="text-white">{noti.message.message}</p>
                            </div>
                        </div>
                        <CurrentButtom
                            click={() => noti.setMessage({ active:false,message:``,type:`error` })}
                            text="X"
                            customClass="text-gray-600 hover:bg-white/10 p-1 text-lg px-3 rounded-md transition-colors ease-linear"
                        />
                    </div>
                </div>
            }

        </>

    )
} 
