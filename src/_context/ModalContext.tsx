
interface Props {

    open: () => void;
    close: () => void;
    status: () => void;

}

export function ModelContextProvider ({ close, open, status }: Props) {
}
