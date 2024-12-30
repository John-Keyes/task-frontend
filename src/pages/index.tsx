import React from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useGetTasksQuery } from 'src/store/tasks/apiSlice';
import Spinner from '../components/spinner';
import Button from '../components/button';
import FlatList from 'flatlist-react/lib';
import TaskCard from '../components/tasks/taskCard';
import TasksEmpty from '../components/tasks/tasksEmpty';
import TaskHeader from '../components/tasks/taskHeader';

const TasksHome: NextPage = () => {
    const {push} = useRouter();
    const {data, isLoading, isSuccess, isError, error} = useGetTasksQuery({});
    let content;
    if(isLoading) {
        content = <Spinner/>;
    }
    else if(isSuccess) {
        content = data.tasks;
    }
    else if(isError) {
        content = <p>{error}</p>
    }
    return (
        <div id="home">
            <div id="welcome-section" className="flex flex-center flex-column content-container">
                <Button onClick={() => push("/new")}>
                    <span className="button-text flex text-white">
                        <p>Create Task</p>
                        <span className="fa-solid fa-plus"/>
                    </span> 
                </Button>
                <TaskHeader taskCount={data.taskCount} completedCount={data.completedCount}/>
                <ul>
                    <FlatList
                        list={data.tasks}
                        renderItem={TaskCard}
                        renderWhenEmpty={() => <TasksEmpty/>}
                    />
                </ul>
            </div>
        </div>
    );
}

export default TasksHome;