import {ComponentProps} from 'react';
import {Task} from 'src/lib/models/tasks';

interface TaskCardProps extends ComponentProps<"li"> {
    className?: string;
    task: Task;
}

const TaskCard = ({task, className, ...props}: TaskCardProps) => (
    <li {...props} className={`fit-width task-card space-above ${className}`}>
        <input id={`task-card-${task.id}`} type="checkbox" value="" checked={task.completed} name={task.title as string} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" readOnly/>
        <label htmlFor={`task-card-${task.id}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{task.title}</label>
        <span className="fa-solid fa-trash"/>
    </li>
);

export default TaskCard;