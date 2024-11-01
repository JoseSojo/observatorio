
interface Props {
    count: number;
}

export function Badge ({count}: Props) {

    return (
        <div className="absolute -top-1 -right-2 py-1 px-2 text-custom-white-100 text-xs font-black bg-primary rounded-rounded-20">
            {count}
        </div>
    )
}
