import React from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useGetTasksQuery } from 'src/store/tasks/apiSlice';
import Spinner from '../components/spinner';
import Button from '../components/button';
import FlatList from 'flatlist-react/lib';
import TaskCard, { TaskCardProps } from '../components/tasks/taskCard';
import TasksEmpty from '../components/tasks/tasksEmpty';
import TaskHeader from '../components/tasks/taskHeader';

const Home: NextPage = () => {
    const {push} = useRouter();
    const {data, isLoading, isSuccess, isError, error} = useGetTasksQuery();
    let content;
    if(isLoading) {
        content = <Spinner/>;
    }
    else if(isError) {
        content = <p>{"error"}</p>
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
                        renderItem={(item) => <TaskCard task={item}/>}
                        renderWhenEmpty={() => <TasksEmpty/>}
                    />
                </ul>
            </div>
        </div>
    );
}

export default Home;