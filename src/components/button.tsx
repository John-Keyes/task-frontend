import {ComponentProps} from 'react';


interface ButtonProps extends ComponentProps<"button"> {
    className?: string;
}

const Button = ({children, className, ...props}: ButtonProps) => (
    <button className={`button text-white task-text button-card-radius bg-button ${className} ${props.disabled && "button-disabled button-disabled-effects"}`} {...props}>{children}</button>
);

export default Button;