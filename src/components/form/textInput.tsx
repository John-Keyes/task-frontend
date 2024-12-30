import { ComponentProps } from "react";
import Label from "./label";


export interface TextInputProps extends ComponentProps<"input">{
    className?: string;
}

const TextInput = (props: TextInputProps) => (
    <div className={`flex flex-center flex-column form-input-container ${props.className || ""}`}>   
        <Label htmlFor={props.id} className="text-button" htmlForName={props.name}/>
        <input type="text" className="space-above" {...props}/>
    </div>
)

export default TextInput;