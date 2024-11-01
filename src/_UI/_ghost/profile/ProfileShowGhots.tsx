export function ProfileShowGhots () {

    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="col-span-1 animate-pulse bg-custom-white-100 rounded-md px-3 py-5">
                <div className="flex flex-col gap-3">
                    <div className="w-[140px] h-[140px] m-auto bg-custom-white rounded-full"></div>
                    <div className="p-3 w-[70%] m-auto rounded-md bg-custom-white"></div>
                    <div className="p-3 w-[50%] m-auto rounded-md bg-custom-white text-xs font-bold"></div>
                    <div className="grid w-[70%] m-auto grid-cols-4 gap-3">
                        <div className="p-3 rounded-md bg-custom-white"></div>
                        <div className="p-3 rounded-md bg-custom-white"></div>
                        <div className="p-3 rounded-md bg-custom-white"></div>
                        <div className="p-3 rounded-md bg-custom-white"></div>
                    </div>

                    {/* DETAILS */}

                </div>
            </div>
            <div className="col-span-2 animate-pulse bg-custom-white-100 rounded-md px-3 py-5"></div>
        </div>
    )
}
