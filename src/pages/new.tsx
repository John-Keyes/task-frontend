import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useCreateTaskMutation } from 'src/store/tasks/apiSlice';
import TasksForm from 'src/components/form/taskForm';
import { NewTask } from '../lib/models/tasks';
import Link from 'next/link';
import Spinner from 'src/components/spinner';

const New: NextPage = () => {
    const {push} = useRouter();
    const [CreateTask] = useCreateTaskMutation();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const HandleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await CreateTask({title: formData.get("Title") as string, color: formData.get("Color") as string, completed: false} as NewTask);
        }
        catch(e: any) {
            setError(e?.message as string || "Unexpected Error Occurred");
        } finally {
            push("/");
        }
    }

    useEffect(() => {
        setIsLoading(false);
    }, []);
    
    if(isLoading) {
        return <Spinner/>;
    }
    
    return (
        <div className="flex page-padding flex-center flex-column content-container">
            <Link href="/" className="arrow-link">
                <span className="fa-solid fa-chevron-left"/>
            </Link>
            <TasksForm isLoading={false} SubmitHandler={HandleSubmit} error={error}>
                <span className="flex flex-center text-white">
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