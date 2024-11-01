
import { DashboardGuiProvider, useDashboardGui } from "../../_context//ui/DashboardContext";
import { Slide } from "../../_UI/_compounds/admin/Slide";
import { SlideGhost } from "../../_UI/_ghost/SlideGhost";
import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "../_compounds/admin/Navbar";
// import { redirect } from "react-router-dom";
import "../../index.css";

interface Props {
    children: ReactNode
}

export function DashBoardTemplate({ children }: Props) {
    // const auth = useAuth();
    // if (auth.session === false) return redirect(`/login`) as ReactNode;
    const [load, setLoad] = useState(true);
    const [activeSlide, setActiveSlide] = useState(false);

    const ActivitySlide = () => setActiveSlide(!activeSlide);

    const { currentAction, error } = useDashboardGui();

    useEffect(() => {
        if(currentAction) setLoad(false);
    }, []);

    return (
        <DashboardGuiProvider>
            <div className={`grid ${activeSlide ? `lg:grid-cols-[.2fr_1fr]` : `grid-cols-1 lg:grid-cols-[100px_1fr]`} duration-200`}>
                <div className={`bg-primary h-full absolute lg:relative  duration-200 ${activeSlide ? `left-0 scale-x-100 lg:scale-x-100 lg:translate-x-0 translate-x-150` : `-left-24 lg:left-0 -scale-x-0 lg:scale-x-100 -translate-x-10 lg:translate-x-0`}`}></div>
                <div className={`bg-primary-100 h-full absolute lg:fixed duration-200 ${activeSlide ? `w-56 left-0 scale-x-100 lg:scale-x-100 lg:translate-x-0 translate-x-150` : `w-28 -left-24 lg:left-0 -scale-x-0 lg:scale-x-100 -translate-x-10 lg:translate-x-0`}`}>
                    <h3></h3>
                    {
                        load
                            ? <SlideGhost />
                            : error
                                ? <>error</>
                                : currentAction && <Slide close={ActivitySlide} active={activeSlide} list={currentAction} />
                    }
                </div>
                <div>
                    <Navbar activeSlide={activeSlide} setActiveSlide={setActiveSlide} />

                    <main className="px-5 py-3 h-full">
                        {children}
                    </main>

                </div>
            </div>
        </DashboardGuiProvider>
    );
}
