import {ComponentProps} from 'react';


interface ButtonProps extends ComponentProps<"button"> {
    className?: string;
}

const Button = ({children, className, ...props}: ButtonProps) => (
    <button type="button" className={`focus:outline-none text-white bg-button focus:ring-4 font-medium rounded-lg text-sm ${className} ${props.disabled && "button-disabled button-disabled-effects"}`} {...props}>{children}</button>
);

export default Button;