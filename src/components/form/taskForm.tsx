import React, { BaseSyntheticEvent, ReactNode, useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { useCreateTaskMutation } from 'src/store/tasks/apiSlice';
import Spinner from '../spinner';
import TextInput from './textInput';
import Button from '../button';
import Ellipse from '../ellipse';
import Label from './label';


type TasksFormType = {
    children: ReactNode, 
    taskTitle?: string,
    taskColor?: string, 
    SubmitHandler: any,
    error: string | null
}
const TasksForm = ({children, taskTitle = "", taskColor, SubmitHandler, error} : TasksFormType) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [color, setColor] = useState<string>(taskColor || "red");
    const [title, setTitle] = useState<string>(taskTitle || "");
    const HandleEllipseClick = (e: BaseSyntheticEvent) => {
        setColor(color)
    }
    return (
            <form onSubmit={SubmitHandler} className="fit-width space-above">
                <TextInput
                    name="Title"
                    id="task-form-title"
                    placeholder="Ex: Brush Your Teeth"
                    value={title}
                    onChange={(e: BaseSyntheticEvent) => setTitle(e.currentTarget.value)}
                    minLength={4}
                    maxLength={50}
                />
                <div className="fit-width space-above">
                    <Label htmlForName="Color"/>
                </div>
                <div className="flex space-above">
                    <Ellipse id="ellipse-red" group="form-color" color="red" formColor={color} onClick={HandleEllipseClick}/>
                    <Ellipse id="ellipse-orange" group="form-color"  color="orange" formColor={color} onClick={HandleEllipseClick}/>
                    <Ellipse id="ellipse-yellow" group="form-color" color="yellow" formColor={color} onClick={HandleEllipseClick}/>
                    <Ellipse id="ellipse-green" group="form-color" color="green" formColor={color} onClick={HandleEllipseClick}/>
                    <Ellipse id="ellipse-blue" group="form-color" color="blue" formColor={color} onClick={HandleEllipseClick}/>
                    <Ellipse id="ellipse-indigo" group="form-color" color="indigo" formColor={color} onClick={HandleEllipseClick}/>
                    <Ellipse id="ellipse-purple" group="form-color"  color="purple" formColor={color} onClick={HandleEllipseClick}/>
                    <Ellipse id="ellipse-pink" group="form-color" color="pink" formColor={color} onClick={HandleEllipseClick}/>
                    <Ellipse id="ellipse-brown" group="form-color" color="brown" formColor={color} onClick={HandleEllipseClick}/>
                    <input value={color} style={{display: "none"}} />
                </div>
                <div className="flex sign-button-container fit-width space-above">
                    <Button id="task-form-submit" className="fit-width" type="submit" disabled={isLoading/* || (!IsClear())*/}>
                        {children}
                    </Button>
                </div>
                <span className="feedback">
                    {error && <p>{error}</p>}
                </span>
            </form>
    );
}

export default TasksForm;