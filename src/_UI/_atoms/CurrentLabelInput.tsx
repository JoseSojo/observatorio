import { InputType } from "../../config/interface/InputInterface";
import { CurrentInput } from "./CurrentInput";

export function CurrentLabelInput (input: InputType) {

    return (
        <label className="">
            <span className="text-lg text-custom-dark">{input.label}</span>
            <CurrentInput change={input.change} type={input.type} label={input.label} placeholder={input.placeholder} name={input.name} required={input.required}  />
        </label>
    )

}
