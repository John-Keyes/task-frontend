import {ComponentProps, Dispatch} from 'react';


interface EllipseProps extends ComponentProps<"div"> {
    className?: string;
    color: string;
    setColor: Dispatch<React.SetStateAction<string>>;
}

const Ellipse = ({className, color, setColor, ...props}: EllipseProps) => (
    <div {...props} className={`ellipse bg-${color}`} onClick={() => setColor(color)}/>
);

export default Ellipse;