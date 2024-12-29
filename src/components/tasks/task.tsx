import {ComponentProps} from 'react';
import Button from '../button';


interface TaskProps extends ComponentProps<"button"> {
    className?: string;
}

const Task = ({children, className, ...props}: TaskProps) => (
    <div>
        <Button></Button>
        <span className="fa-solid fa-trash"/>
    </div>
);

export default Task;