import React, { SyntheticEvent, useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { GetServerSideProps } from 'next';
import { useGetOneTaskQuery, useUpdateTaskMutation } from 'src/store/tasks/apiSlice';
import TasksForm from '../../components/form/taskForm';
import Link from 'next/link';
import { Task } from '../../lib/models/tasks';
import { APIClient } from '../../lib/helpers/Api';

const TasksDetail = () => {
    const { query: { id }, back, reload } = useRouter()
    const { data } = useGetOneTaskQuery({id});
    const [UpdateTask, isError] = useUpdateTaskMutation();
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
		if (isError) {
			back();
		}
	}, [isError, back]);

    const HandleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await UpdateTask({id: data.id, title: formData.get("title") as string, color: formData.get("color") as string, completed: false});
        }
        catch(e: any) {
            setError(e?.message as string || "Unexpected Error Occurred");
        } finally {
            reload();
        }
    }
    return (
        <div>
           <Link href="/" className="arrow-link">
                <span className="fa-solid fa-chevron-left"/>
            </Link>
            <TasksForm SubmitHandler={HandleSubmit} taskColor={data.color} error={error}>
                <span className="button-text flex flex-center text-white">
                    <p>Save</p>
                    <span className="fa-solid space-infront fa-check fa-sharp"/>
                </span>
            </TasksForm>
        </div>
    );
}



export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.query.id;

	const api = new APIClient();
	const data = await api.Get(`/${id}`, {
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