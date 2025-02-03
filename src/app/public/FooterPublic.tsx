import Facebook from "../../UI/_atom/Icons/Social/Facebook";
import Instagram from "../../UI/_atom/Icons/Social/Instagram";
import XformerlyTwitter from "../../UI/_atom/Icons/Social/Twitter";

export default function FooterPublic() {

    return (
        <footer className="footer shadow-2xl bg-gradient-to-b from-transparent to-slate-600 flex justify-center items-center flex-col p-10 mt-10">
            <aside>
                <img src="/logo.png" className="m-auto" style={{ width: 250 }} />
                <p className="text-center font-semibold text-white">
<<<<<<< Updated upstream
                    <strong className="text-lg font-black text-white">Observatorio de Investigación, Ciencia, Tecnoliogía e Inovación UNERG</strong>
=======
                    <strong className="text-lg font-black text-white">Observatorio de Investigación, Ciencia, Tecnología, e Innovación UNERG.</strong>
>>>>>>> Stashed changes
                    <br />
                    <div className="flex justify-center gap-5 mt-3  rounded px-3 py-1">
                        <a href="https://facebook.com" target="_blank" className="text-2xl p-3 rounded-lg hover:bg-slate-700">
                            <Facebook />
                        </a>
                        <a href="https://x.com" target="_blank" className="text-2xl p-3 rounded-lg hover:bg-slate-700">
                            <XformerlyTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" className="text-2xl p-3 rounded-lg hover:bg-slate-700">
                            <Instagram />
                        </a>
                    </div>
                    <br />
                    Cargar proyectos de grado, tesis doctorales, y trabajos especiales de grado
                </p>
            </aside>
        </footer>
    )
}
