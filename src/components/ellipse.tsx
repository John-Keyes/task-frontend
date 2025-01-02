import {BaseSyntheticEvent, ComponentProps, useEffect, useRef} from 'react';


interface EllipseProps extends ComponentProps<"div"> {
    className?: string;
    color: string;
    formColor: string;
    group: string;
    setFormColor: React.Dispatch<React.SetStateAction<string>>;
}

const Ellipse = ({className, color, setFormColor, formColor, group, ...props}: EllipseProps) => {
    const radioInput = useRef<HTMLInputElement>(null);
    const ellipseDiv = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const radio: HTMLInputElement | null = radioInput.current;
        const ellipse: HTMLDivElement | null = ellipseDiv.current;
        if(radio && ellipse) {
            if(radio.checked) {
                ellipse.style.borderColor = "#F2F2F2";
                ellipse.style.borderWidth = "3px";
                ellipse.style.borderStyle = "solid";
            }
            else {
                ellipse.style.borderColor = "";
                ellipse.style.borderWidth = "";
                ellipse.style.borderStyle = "";
            }
        }
    }, [formColor])
    return (
        <>
            <div ref={ellipseDiv} {...props} className={`ellipse bg-${color}`} onClick={(e: BaseSyntheticEvent) => setFormColor(color)}/>
            <input ref={radioInput} type="radio" id={`${props.id}-radio`} style={{display: "none"}} name={group} readOnly checked={color === formColor}/>
        </>
    );
}

export default Ellipse;