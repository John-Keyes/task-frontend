import {BaseSyntheticEvent, ComponentProps, useState} from 'react';
import {Task} from 'src/lib/models/tasks';
import { useUpdateTaskMutation } from 'src/store/tasks/apiSlice';

interface TaskCardProps extends ComponentProps<"li"> {
    className?: string;
    task: Task;
}

const TaskCard = ({task, className, ...props}: TaskCardProps) => {
    const [UpdateTask] = useUpdateTaskMutation();
    const [focused, setFocused] = useState<boolean>(false);
    const HandleOnFocus = (e: BaseSyntheticEvent) => {
        setFocused(true);
    }
    const HandleOnBlur = (e: BaseSyntheticEvent) => {
        const timeout = setTimeout(() => {
            setFocused(false);
        }, 3000)
    }
    const HandleOnChange = async (e: BaseSyntheticEvent) => {
        if(!focused) {
            console.log(e.currentTarget.checked);
            const checked = e.currentTarget.checked;
            try {
                await UpdateTask({...task, completed: checked});
            } catch(e) {
                console.log(e);
            }
        }
    }
    return (
    <li {...props} className={`fit-width task-card space-above ${className}`}>
        <input id={`task-card-${task.id}`} onFocus={HandleOnFocus} onChange={HandleOnChange} type="checkbox" onBlur={HandleOnBlur} value="" checked={task.completed} name={task.title as string} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label htmlFor={`task-card-${task.id}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{task.title}</label>
        <span className="fa-solid fa-trash"/>
    </li>
    );
}

export default TaskCard;