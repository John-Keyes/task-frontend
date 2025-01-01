import { useRouter } from 'next/router';
import {BaseSyntheticEvent, ComponentProps, useState} from 'react';
import {Task} from 'src/lib/models/tasks';
import { useDeleteTaskMutation, useUpdateTaskMutation } from 'src/store/tasks/apiSlice';

export interface TaskCardProps extends ComponentProps<"li"> {
    task: Task;
}

const TaskCard = ({task, ...props}: TaskCardProps) => {
    const [UpdateTask] = useUpdateTaskMutation();
    const [DeleteTask] = useDeleteTaskMutation();
    const {reload, push} = useRouter();
    const [focused, setFocused] = useState<boolean>(false);
    const HandleOnFocus = (e: BaseSyntheticEvent) => {
        setFocused(true);
    }
    const HandleOnBlur = (e: BaseSyntheticEvent) => {
        const timeout = setTimeout(() => {
            console.log("T");
        }, 3000);
        setFocused(false);
        return () => clearTimeout(timeout)
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

    const HandleDelete = async (e: BaseSyntheticEvent) => {
        if(!focused) {
            try {
                await DeleteTask(task.id);
            } catch(e) {
                console.log(e);
            }
            finally {
                reload();
            }
        }
    }
    return (
        <li {...props} className="fit-width task-card space-above" onClick={() => push(`/${task.id}`)}>
            <input id={`task-card-${task.id}`} onFocus={HandleOnFocus} onChange={HandleOnChange} type="checkbox" onBlur={HandleOnBlur} value="" checked={task.completed} name={task.title as string} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor={`task-card-${task.id}`} className="ms-2 text-sm font-medium text-white">{task.title}</label>
            <span className="fa-solid fa-trash" onClick={HandleDelete} />
        </li>
    );
}

export default TaskCard;