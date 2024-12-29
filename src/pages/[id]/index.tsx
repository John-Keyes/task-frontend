import React from 'react';
import {useRouter} from 'next/router';
import { NextPage } from 'next';
import { useCreateTaskMutation, useUpdateTaskMutation } from 'src/store/tasks/apiSlice';

const TasksDetail: NextPage = () => {
    const {push} = useRouter();
    const {UpdateTask} = useUpdateTaskMutation();
    const {CreateTask} = useCreateTaskMutation();
    
    return (
        <div id="home">
            <div id="welcome-section" className="flex flex-center content-container">
                <h1 className="fit-width">
                    <span className="home-title text-color1">Sample</span>
                    <span className="home-title text-color2">Full</span>
                    <span className="home-title text-color3">Stack</span>
                </h1>
            </div>
        </div>
    );
}

export default TasksDetail;