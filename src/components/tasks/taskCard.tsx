import { useRouter } from 'next/router';
import {BaseSyntheticEvent, ComponentProps, useRef, useState} from 'react';
import {Task} from 'src/lib/models/tasks';
import { useDeleteTaskMutation, useUpdateTaskMutation } from 'src/store/tasks/apiSlice';
import Link from 'next/link';
import { useAutosave } from 'react-autosave';

export interface TaskCardProps extends ComponentProps<"li"> {
    it: Task;
    HandleDelete: (id: number) => void;
}

const TaskCard = ({it, HandleDelete, ...props}: TaskCardProps) => {
    const [UpdateTask] = useUpdateTaskMutation();
    const {reload} = useRouter();
    const taskCardInputRef = useRef<HTMLInputElement>(null);
    const [task, setTask] = useState(it);
    const HandleUpdate = async (task: Task) => {
        try {
            await UpdateTask(task);
        } catch(e) {
            console.log(e);
        }
    }

    const HandleClick = () => {
        setTask({...task, completed: !task.completed});
    }

    useAutosave({data: task, onSave: HandleUpdate});

    return (
        <li {...props} className="task-card space-above flex flex-center">
            <div onClick={HandleClick} className={`cursor-pointer task-card-checkbox ${task.completed ? `task-card-checkbox-checked-${task.color}` :""}`}>
                {task.completed && <span className="fa-solid fa-check fa-sharp fa-sm text-white task-card-checkbox-icon"/>}
            </div>
            <input ref={taskCardInputRef} id={`task-card-${task.id}`} style={{display: "none"}} type="checkbox" checked={task.completed} name={task.title as string}/>
            <Link href={`/${task.id}`} className={`text-white task-card-link ${task.completed ? "task-card-link-checked" :""}`}>
                {task.title}
            </Link>
            <span className="fa-regular fa-trash-can text-icon cursor-pointer" onClick={() => HandleDelete(task.id)} />
        </li>
    );
}

export default TaskCard;