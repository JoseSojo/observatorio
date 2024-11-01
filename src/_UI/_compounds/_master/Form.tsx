import { FormEvent, useState } from "react";
import { Filed, Form } from "../../../config/interface/current/generic/FormGuiInterface";
import { CurrentButtom } from "../../_atoms/CurrentButton";
import { CurrentField } from "../../_atoms/CurrentField";
import { GetIcon } from "../../_icons/IconsHandle";
import { GetToken } from "../../../_hooks/storage/useToken";
import { API_URL } from "../../../config/constants";
import { SelectLogic } from "../form/SelectLogic";
import { CheckLogic } from "../form/CheckLogic";
import { ResponseApi } from "../../../config/interface/GlobalInterface";
import { useNotification } from "../../../_context/NotificationContext";

interface Props {
    data: Form;
    text: `crear` | `actualizar`;
    reverse?: () => void;
}

export function CurrentForm ({data,reverse,text}: Props) {

    const [load, setLoad] = useState(true);
    const [error, setError] = useState(false);

    const noti = useNotification();

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const obj: any = {};

        const target = e.target as HTMLFormElement;
        const inputs = target.elements;
        const checkedCheckboxes: string[] = [];

        // Iterando sobre los inputs
        for (const input of inputs) {
            if (input instanceof HTMLInputElement && input.type === 'checkbox' && input.checked) {
                checkedCheckboxes.push(input.value);
            }
        }

        for (const pair of formData.entries()) {
            obj[pair[0]] = pair[1];
        }

        if(checkedCheckboxes.length > 1) obj.permits = checkedCheckboxes;

        const Execute = async () => {
            try {
                const RequetsOptions = {
                    method:data.method,
                    headers: {
                        token: `${GetToken()}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }
                const resultPromise = await fetch(`${API_URL}${data.path}`, RequetsOptions);
                const resultJson = await resultPromise.json() as ResponseApi;

                if(resultJson.error === false && reverse) reverse();

                noti.setMessage({ type:resultJson.error ? `error` : `success`, message:resultJson.message, active:true });

                setLoad(false);
                setError(false);
            } catch (error) {
            }
        }
        Execute();
    }

    return (
        <form onSubmit={HandleSubmit}>

            <div className="flex justify-between items-center mt-3">
                <h2 className="text-xl font-bold text-gray-700 up">{data.name}</h2>
                <div>
                    <CurrentButtom type="submit" customClass="flex items-center px-3 py-2 text-2xl rounded bg-primary-100 hover:bg-primary-200 text-custom-white-100 hover:text-custom-white">
                        <span className="text-sm font-bold mr-3">{text}</span>
                        {GetIcon(`update`)}
                    </CurrentButtom>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {
                    data.fields.map((item: Filed) => {

                        if(item.check) return (
                            <div className="w-full col-span-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {
                                    item.childs.map((child) => (
                                        <CheckLogic key={item.id} name={item.name} data={child} />
                                    ))
                                }
                            </div>
                        )

                        if(item.select) return (
                            <SelectLogic object={item.selectIn} data={item} />
                        )

                        return (
                            <CurrentField data={item} />
                        )   
                    })
                }
            </div>
        </form>
    )
}
