import React, { BaseSyntheticEvent, SyntheticEvent, useState } from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useCreateTaskMutation } from 'src/store/tasks/apiSlice';
import TasksForm from 'src/components/form/taskForm';
import TaskHeader from 'src/components/tasks/taskHeader';
import { Task } from '../lib/models/tasks';
import Link from 'next/link';

const New: NextPage = () => {
    const {back} = useRouter();
    const [CreateTask] = useCreateTaskMutation();

    const HandleSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        CreateTask({title: formData.get("title") as string, color: formData.get("color") as string, completed: false});
    }
    
    return (
        <div className="flex flex-column">
            <Link href="/" target="_blank" rel="noopener noreferrer">
                <span className="fa-solid fa-chevron-left"/>
            </Link>
            <TasksForm SubmitHandler={CreateTask}>
                <span className="button-text flex text-white">
                    <p>Add Task</p>
                    <span className="fa-solid fa-plus"/>
                </span>
            </TasksForm>
        </div>
    );
}

New.getInitialProps = async () => {
    return {
        pageTitle: "New",
        pageDescription: "New tasks."
    }
}

export default New;