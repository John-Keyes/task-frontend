import {ComponentProps} from 'react';


interface EllipseProps extends ComponentProps<"div"> {
    className?: string;
    color: string;
}

const Ellipse = ({className, ...props}: EllipseProps) => (
    <div {...props} className={`ellipse bg-${props.color}`}/>
);

export default Ellipse;