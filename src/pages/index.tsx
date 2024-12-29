import React from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useGetTasksQuery, useCreateTaskMutation } from 'src/store/tasks/apiSlice';
import Spinner from '../components/spinner';
import Button from 'src/components/button';
import FlatList from 'flatlist-react/lib';

const TasksHome: NextPage = () => {
    const {push} = useRouter();
    const {data: tasks, isLoading, isSuccess, isError, error} = useGetTasksQuery();
    let content;
    if(isLoading) {
        content = <Spinner/>;
    }
    else if(isSuccess) {
        content = tasks;
    }
    else if(isError) {
        content = <p>{error}</p>
    }
    return (
        <div id="home">
            <div id="welcome-section" className="flex flex-center content-container">
                <Button onClick={() => push("/")}>Create Task</Button>
                <ul>
                    <FlatList
                    list={tasks}
                    renderItem={Task}
                    renderWhenEmpty={() => <div>List is empty!</div>}
                    groupBy={person => person.info.age > 18 ? 'Over 18' : 'Under 18'}
                    />
                </ul>
            </div>
        </div>
    );
}

export default TasksHome;