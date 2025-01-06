import React, { SyntheticEvent, useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { GetServerSideProps } from 'next';
import { useGetOneTaskQuery, useUpdateTaskMutation } from 'src/store/tasks/apiSlice';
import TasksForm from '../../components/form/taskForm';
import Link from 'next/link';
import { Task } from '../../lib/models/tasks';
import { APIClient } from '../../lib/helpers/api';

const TasksDetail = () => {
    const { query: { id }, back, push } = useRouter()
    const { data } = useGetOneTaskQuery(Number(id));
    const [UpdateTask, isError] = useUpdateTaskMutation();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
		if (isError) {
			back();
		}
        setIsLoading(false);
	}, [isError, back]);

    const HandleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await UpdateTask({id: data?.id as number, title: formData.get("Title") as string, color: formData.get("Color") as string, completed: data?.completed as boolean} as Task);
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
            <TasksForm SubmitHandler={HandleSubmit} taskColor={data?.color} taskTitle={data?.title} isLoading={isLoading} error={error}>
                <span className="flex flex-center text-white">
                    <p>Save</p>
                    <span className="fa-solid space-infront fa-check fa-sharp"/>
                </span>
            </TasksForm>
        </div>
    );
}



export const getServerSideProps: GetServerSideProps = async (context) => {
	console.log(context.params);
    const id = context.query.id;
    

	const api = new APIClient();
	const data = await api.Get(`/tasks/${id}`, {
		Cookie: context.req.headers.cookie || '',
	})

	const task: Task = data.task;

	if (!task) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			}
		}
	}

  return {
    props: {
		pageTitle: `My Task: ${ task.title }`,
        pageDescription: "This task is a task"
	}
  }
}

export default TasksDetail;