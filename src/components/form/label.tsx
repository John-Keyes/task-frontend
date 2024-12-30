import { ComponentProps } from "react";


export interface LabelProps extends ComponentProps<"label"> {
    className?: string,
    htmlForName: string | undefined,
}

const Label = (props: LabelProps) => (  
        <label {...props} className={`text-button ${props.className}`}>{props.htmlForName}</label>
)

export default Label;