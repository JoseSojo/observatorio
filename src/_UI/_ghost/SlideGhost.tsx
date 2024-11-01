
export function SlideGhost() {

    return (
        <ul className="flex flex-col gap-y-3 px-3 py-5 relative h-full">
            
            <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
                <span className="w-20 h-20 border-t-8 border-l-2 border-r-2 border-b-8 border-primary-200 animate-spin z-10 rounded-full"></span>
            </div>

            <li className="bg-primary rounded-sm p-2 px-4 animate-pulse w-full flex justify-between items-center gap-5">
                <span className="bg-primary-200 rounded-rounded-7 flex-[3] w-full text-primary-200">.</span>
                <span className="bg-primary-200 rounded-rounded-7 flex-1 w-full text-primary-200">.</span>
            </li>
            <li className="bg-primary rounded-sm p-2 px-4 animate-pulse w-full flex justify-between items-center gap-5">
                <span className="bg-primary-200 rounded-rounded-7 flex-[3] w-full text-primary-200">.</span>
                <span className="bg-primary-200 rounded-rounded-7 flex-1 w-full text-primary-200">.</span>
            </li>
            <li className="bg-primary rounded-sm p-2 px-4 animate-pulse w-full flex justify-between items-center gap-5">
                <span className="bg-primary-200 rounded-rounded-7 flex-[3] w-full text-primary-200">.</span>
                <span className="bg-primary-200 rounded-rounded-7 flex-1 w-full text-primary-200">.</span>
            </li>
            <li className="bg-primary rounded-sm p-2 px-4 animate-pulse w-full flex justify-between items-center gap-5">
                <span className="bg-primary-200 rounded-rounded-7 flex-[3] w-full text-primary-200">.</span>
                <span className="bg-primary-200 rounded-rounded-7 flex-1 w-full text-primary-200">.</span>
            </li>
            <li className="bg-primary rounded-sm p-2 px-4 animate-pulse w-full flex justify-between items-center gap-5">
                <span className="bg-primary-200 rounded-rounded-7 flex-[3] w-full text-primary-200">.</span>
                <span className="bg-primary-200 rounded-rounded-7 flex-1 w-full text-primary-200">.</span>
            </li>
            <li className="bg-primary rounded-sm p-2 px-4 animate-pulse w-full flex justify-between items-center gap-5">
                <span className="bg-primary-200 rounded-rounded-7 flex-[3] w-full text-primary-200">.</span>
                <span className="bg-primary-200 rounded-rounded-7 flex-1 w-full text-primary-200">.</span>
            </li>
        </ul>
    );
}
