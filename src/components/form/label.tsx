import { ComponentProps } from "react";


export interface LabelProps extends ComponentProps<"label"> {
    className?: string,
    htmlforname: string | undefined,
}

const Label = (props: LabelProps) => (  
        <label {...props} className={`text-button ${props.className}`}>{props.htmlforname}</label>
)

export default Label;