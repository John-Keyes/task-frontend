import React, { useState } from 'react';
import {useRouter} from 'next/router';
import { useCreateTaskMutation } from 'src/store/tasks/apiSlice';
import Spinner from '../spinner';
import TextInput from './textInput';
import Button from '../button';
import Ellipse from '../ellipse';

const TasksForm = ({SubmitHandler} : {SubmitHandler: () => void}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
            <form className="form-container" onSubmit={SubmitHandler}>
                <TextInput
                    name="email"
                    type="email"
                    id="login-email"
                    placeholder="Your Email"
                    minLength={4}
                    maxLength={50}
                />
                <div className="flex">
                    <Ellipse color="red"/>
                    <Ellipse color="orange"/>
                    <Ellipse color="yellow"/>
                    <Ellipse color="green"/>
                    <Ellipse color="blue"/>
                    <Ellipse color="indigo"/>
                    <Ellipse color="purple"/>
                    <Ellipse color="pink"/>
                    <Ellipse color="brown"/>
                </div>
                <div className="flex sign-button-container">
                    <Button id="login-submit" className="sign-button rounded-md" type="submit" disabled={isLoading/* || (!IsClear())*/}>
                        <span className="button-text">{}</span>
                    </Button>
                </div>
                <span className="feedback">
                    {/*<Toast serverErrors={serverErrors}/>*/}
                    {"errors"}
                </span>
            </form>
    );
}

export default TasksForm;