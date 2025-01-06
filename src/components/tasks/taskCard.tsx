import { useRouter } from 'next/router';
import {BaseSyntheticEvent, ComponentProps, useEffect, useRef, useState} from 'react';
import {Task} from 'src/lib/models/tasks';
import { useDeleteTaskMutation, useUpdateTaskMutation } from 'src/store/tasks/apiSlice';
import Label from '../form/label';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import Link from 'next/link';

export interface TaskCardProps extends ComponentProps<"li"> {
    task: Task;
}

const TaskCard = ({task, ...props}: TaskCardProps) => {
    const [UpdateTask] = useUpdateTaskMutation();
    const [DeleteTask] = useDeleteTaskMutation();
    const {reload, push} = useRouter();
    const [hovering, setHovering] = useState<boolean>(false);
    const taskCardInputRef = useRef<HTMLInputElement>(null);
    //const [checked, setChecked] = useState<boolean>(task.completed);
    const [changed, setChanged] = useState<boolean>(false);
    const [delay, setDelay] = useState<number | string | NodeJS.Timeout>(0);
    const HandleOnMouseEnter = (e: BaseSyntheticEvent) => {
        setHovering(true);
        setDelay(setTimeout(() => {
            HandleUpdateTask()
        }, 1000));
    }
    const HandleOnMouseLeave = async (e: BaseSyntheticEvent) => {
        clearTimeout(delay);
        setHovering(false);
    }
    
    const HandleUpdateTask = async () => {
        if(!hovering) {
            try {
                await UpdateTask({...task, completed: taskCardInputRef?.current?.checked || task.completed});
            } catch(e) {
                console.log(e);
            }
        }
    }

    const HandleOnChange = async () => {
        //changed ? HandleUpdateTask() : setChanged(true);
        if(!changed) {
            setChanged(true);
        }
        else {
            HandleUpdateTask();
        }
    }

    const HandleDelete = async (e: BaseSyntheticEvent) => {
        //if(!hovering) {
            try {
                await DeleteTask(task.id);
            } catch(e) {
                console.log(e);
            }
            finally {
                reload();
            }
        //}
    }

    const HandleClick = () => {
        taskCardInputRef?.current?.click();
    }

    return (
        <li {...props} onMouseLeave={HandleOnMouseLeave} className="task-card space-above flex flex-center">
            <div onMouseEnter={HandleOnMouseEnter} onClick={HandleClick} className={`cursor-pointer task-card-checkbox ${taskCardInputRef?.current?.checked ? `task-card-checkbox-checked-${task.color}` :""}`}>
                {taskCardInputRef?.current?.checked && <span className="fa-solid fa-check fa-sharp fa-sm text-white task-card-checkbox-icon"/>}
            </div>
            <input ref={taskCardInputRef} id={`task-card-${task.id}`} onChange={HandleOnChange} style={{display: "none"}} type="checkbox" defaultChecked={task.completed} name={task.title as string}/>
            {/*<Label htmlFor={`task-card-${task.id}`} onClick={() => push(`/${task.id}`)} className={`text-white task-card-label ${taskCardInputRef?.current?.checked ? "task-card-label-checked" :""}`} htmlforname={task.title}/>*/}
            <Link href={`/${task.id}`} className={`text-white task-card-label ${taskCardInputRef?.current?.checked ? "task-card-label-checked" :""}`}>
                {task.title}
            </Link>
            <span className="fa-regular fa-trash-can text-icon cursor-pointer" onClick={HandleDelete} />
        </li>
    );
}

export default TaskCard;