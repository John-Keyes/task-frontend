import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useDeleteTaskMutation, useGetTasksQuery } from 'src/store/tasks/apiSlice';
import Button from '../components/button';
import FlatList from 'flatlist-react/lib';
import TaskCard, { TaskCardProps } from '../components/tasks/taskCard';
import TasksEmpty from '../components/tasks/tasksEmpty';
import TaskHeader from '../components/tasks/taskHeader';
import { Task } from 'src/lib/models/tasks';
import { Spinner } from 'flowbite-react';

const Home: NextPage = () => {
    const {push, reload} = useRouter();
    const [DeleteTask] = useDeleteTaskMutation();
    const {data, isLoading: loading, isSuccess, isError, error} = useGetTasksQuery();
    const [isLoading, setIsLoading] = useState<boolean>(loading);
    const [taskCount, setTaskCount] = useState<number>(0);
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    const HandleDelete = async (id: number) => {
            let deletedTask;
            try {
                deletedTask = await DeleteTask(id);
            } catch(e) {
                console.log(e);
            }
            if(deletedTask) {
                setTasks(tasks.filter(tk => tk.id !== id));
            }
    }
        useEffect(() => {
            setTasks(data || []);
            if(tasks) {
                setTaskCount(tasks.length);
                setCompletedCount(tasks.filter(task => task.completed == true).length);
            }
            setIsLoading(false);
        }, [data, tasks]);
        
    if(isLoading) {
        return <Spinner/>;
    }
    return (
        <div id="home">
            <div className="flex page-padding flex-center flex-column content-container">
                <Button onClick={() => push("/new")} className="fit-width">
                    <span className="flex flex-center text-white">
                        <p>Create Task</p>
                        <span className="space-infront fa-solid fa-plus"/>
                    </span> 
                </Button>
                <TaskHeader taskCount={taskCount} completedCount={completedCount}/>
                <ul className="fit-width">
                    <FlatList
                        list={tasks}
                        keyExtractor={(item: Task) => item.id.toString()}
                        renderItem={(item: Task) => <TaskCard key={item.id} it={item} HandleDelete={HandleDelete}/>}
                        renderWhenEmpty={() => <TasksEmpty/>}
                    />
                </ul>
            </div>
        </div>
    );
}

export default Home;