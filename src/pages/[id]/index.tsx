import React, { SyntheticEvent, useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { useGetOneTaskQuery, useUpdateTaskMutation } from 'src/store/tasks/apiSlice';
import TasksForm from '../../components/form/taskForm';
import Link from 'next/link';
import { Task } from '../../lib/models/tasks';
import { APIClient } from '../../lib/helpers/Api';

const TasksDetail = () => {
    const [newTask, setNewTask] = useState<Task>();
    const { query: { id }, back } = useRouter()
    const { data } = useGetOneTaskQuery({id});
    const [UpdateTask, isError] = useUpdateTaskMutation();
    useEffect(() => {
		if (isError) {
			back();
		}
	}, [isError, back]);

    const HandleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        UpdateTask({id: data.id, title: formData.get("title") as string, color: formData.get("color") as string, completed: false});
    }
    return (
        <div>
            <Link href="/" target="_blank" rel="noopener noreferrer">
                <span className="fa-solid fa-chevron-left"/>
            </Link>
            <TasksForm SubmitHandler={UpdateTask} taskColor={data.color}>
                <span className="button-text flex text-white">
                    <p>Save</p>
                    <span className="fa-solid fa-check"/>
                </span>
            </TasksForm>
        </div>
    );
}



export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.query.id;

	const api = new APIClient();
	const data = await api.get(`/${ id }`, {
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