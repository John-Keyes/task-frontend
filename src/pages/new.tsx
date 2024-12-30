import React, { BaseSyntheticEvent, SyntheticEvent, useState } from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useCreateTaskMutation } from 'src/store/tasks/apiSlice';
import TasksForm from 'src/components/form/taskForm';
import TaskHeader from 'src/components/tasks/taskHeader';
import { Task } from '../lib/models/tasks';
import Link from 'next/link';

const New: NextPage = () => {
    const {back, push} = useRouter();
    const [CreateTask] = useCreateTaskMutation();
    const [error, setError] = useState<string | null>(null);

    const HandleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await CreateTask({title: formData.get("title") as string, color: formData.get("color") as string, completed: false});
        }
        catch(e: any) {
            setError(e?.message as string || "Unexpected Error Occurred");
        } finally {
            push("/");
        }
    }
    
    return (
        <div className="flex page-padding flex-center flex-column content-container">
            <Link href="/" className="arrow-link">
                <span className="fa-solid fa-chevron-left"/>
            </Link>
            <TasksForm SubmitHandler={HandleSubmit} error={error}>
                <span className="button-text flex flex-center text-white">
                    <p>Add Task</p>
                    <span className="fa-solid space-infront fa-plus"/>
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