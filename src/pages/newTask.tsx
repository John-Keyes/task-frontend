import React from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useCreateTaskMutation } from 'src/store/tasks/apiSlice';
import TasksForm from 'src/components/form/taskForm';

const NewTask: NextPage = () => {
    const {push} = useRouter();
    const {CreateTask} = useCreateTaskMutation();
    
    return (
        <div id="home">
            <TasksForm SubmitHandler={CreateTask}/>
        </div>
    );
}

export default NewTask;