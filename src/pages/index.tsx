import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useGetTasksQuery } from 'src/store/tasks/apiSlice';
import Spinner from '../components/spinner';
import Button from '../components/button';
import FlatList from 'flatlist-react/lib';
import TaskCard, { TaskCardProps } from '../components/tasks/taskCard';
import TasksEmpty from '../components/tasks/tasksEmpty';
import TaskHeader from '../components/tasks/taskHeader';
import { Task } from 'src/lib/models/tasks';

const Home: NextPage = () => {
    const {push} = useRouter();
    const {data, isLoading: loading, isSuccess, isError, error} = useGetTasksQuery();
    const [isLoading, setIsLoading] = useState<boolean>(loading);
        useEffect(() => {
            setIsLoading(false);
        }, []);
        
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
                <TaskHeader taskCount={data?.taskCount || 0} completedCount={data?.completedCount || 0}/>
                <ul className="fit-width">
                    <FlatList
                        list={data?.tasks || []}
                        keyExtractor={(item: Task) => item.id.toString()}
                        renderItem={(item: Task) => <TaskCard key={item.id} task={item}/>}
                        renderWhenEmpty={() => <TasksEmpty/>}
                    />
                </ul>
            </div>
        </div>
    );
}

export default Home;