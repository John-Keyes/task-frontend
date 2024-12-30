import React, { ReactNode, useState } from 'react';
import {useRouter} from 'next/router';
import { useCreateTaskMutation } from 'src/store/tasks/apiSlice';
import Spinner from '../spinner';
import TextInput from './textInput';
import Button from '../button';
import Ellipse from '../ellipse';
import Label from './label';


type TasksFormType = {
    children: ReactNode, 
    taskColor?: string, 
    SubmitHandler: any,
    error: string | null
}
const TasksForm = ({children, taskColor, SubmitHandler, error} : TasksFormType) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [color, setColor] = useState<string>(taskColor || "red");
    return (
            <form onSubmit={SubmitHandler} className="fit-width space-above">
                <TextInput
                    name="Title"
                    id="task-form-title"
                    placeholder="Ex: Brush Your Teeth"
                    minLength={4}
                    maxLength={50}
                />
                <div className="fit-width space-above">
                    <Label htmlForName="Color"/>
                </div>
                <div className="flex space-above">
                    <Ellipse color="red" setColor={setColor}/>
                    <Ellipse color="orange" setColor={setColor}/>
                    <Ellipse color="yellow" setColor={setColor}/>
                    <Ellipse color="green" setColor={setColor}/>
                    <Ellipse color="blue" setColor={setColor}/>
                    <Ellipse color="indigo" setColor={setColor}/>
                    <Ellipse color="purple" setColor={setColor}/>
                    <Ellipse color="pink" setColor={setColor}/>
                    <Ellipse color="brown" setColor={setColor}/>
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