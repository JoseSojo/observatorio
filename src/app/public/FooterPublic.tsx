import Facebook from "../../UI/_atom/Icons/Social/Facebook";
import Instagram from "../../UI/_atom/Icons/Social/Instagram";
import XformerlyTwitter from "../../UI/_atom/Icons/Social/Twitter";

export default function FooterPublic() {

    return (
        <footer className="bg-[url('/bg.jpg')] bg-cover bg-center h-screen footer shadow-2xl flex justify-end items-center flex-col p-10 mt-10">
            <aside className="bg-opacity-80 p-3 rounded-lg">
                <p className="text-center font-semibold text-white">
                    <strong className="text-lg font-black text-white"></strong>
                    <strong className="text-lg font-black text-white"></strong>
                    <br />
                    <div className="flex justify-center gap-5 mt-3  rounded px-3 py-1">
                        <a href="https://www.facebook.com/oficialunerg1977/?locale=es_LA" target="_blank" className="text-2xl p-3 rounded-lg bg-slate-900 hover:bg-slate-700">
                            <Facebook />
                        </a>
                        <a href="https://www.instagram.com/oficial_unerg/?hl=es" target="_blank" className="text-2xl p-3 rounded-lg bg-slate-900 hover:bg-slate-700">
                            <XformerlyTwitter />
                        </a>
                        <a href="https://x.com/oficialunerg?lang=es" target="_blank" className="text-2xl p-3 rounded-lg bg-slate-900 hover:bg-slate-700">
                            <Instagram />
                        </a>
                    </div>
                </p>
            </aside>
        </footer>
    )
}
