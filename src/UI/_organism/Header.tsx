import Title from "../_atom/Title";

interface Props {}

export default function Header({}: Props) {

    return (
        <header className="flex py-3 px-5 justify-between bg-slate-100">
            <Title customClass="uppercase text-white font-black text-xs" text="." />
        </header>
    )
}
