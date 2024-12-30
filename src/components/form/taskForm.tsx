import React, { ReactNode, useState } from 'react';
import {useRouter} from 'next/router';
import { useCreateTaskMutation } from 'src/store/tasks/apiSlice';
import Spinner from '../spinner';
import TextInput from './textInput';
import Button from '../button';
import Ellipse from '../ellipse';


type TasksFormType = {
    children: ReactNode, 
    taskColor?: string, 
    SubmitHandler: any
}
const TasksForm = ({children, taskColor, SubmitHandler} : TasksFormType) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [color, setColor] = useState<string>(taskColor || "red");
    return (
            <form className="form-container" onSubmit={SubmitHandler}>
                <TextInput
                    name="title"
                    type="title"
                    id="task-form-title"
                    placeholder="Ex: Brush Your Teeth"
                    minLength={4}
                    maxLength={50}
                />
                <div className="flex">
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
                <div className="flex sign-button-container fit-width">
                    <Button id="task-form-submit" className="fit-width" type="submit" disabled={isLoading/* || (!IsClear())*/}>
                        {children}
                    </Button>
                </div>
                <span className="feedback">
                    {/*<Toast serverErrors={serverErrors}/>*/}
                    {"Fix Errors before submitting"}
                </span>
            </form>
    );
}

export default TasksForm;