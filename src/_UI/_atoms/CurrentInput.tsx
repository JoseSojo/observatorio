import { InputType } from "../../config/interface/InputInterface";

export function CurrentInput(input: InputType) {
    
    return (
        <input 
            onChange={input.change} 
            type={input.type} 
            className={`${input.class} w-full rounded-rounded-7 border outline-none px-3 py-2 text-custom-dark-100`} 
            placeholder={input.placeholder} 
            name={input.name} 
            required={input.required} 
            />
    )
}
