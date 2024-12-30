import React from 'react';
import {useRouter} from 'next/router';

type TaskHeaderStyle = {taskCount: number | null, completedCount: number | null};
const TaskHeader = (props: TaskHeaderStyle) => {
    return (
        <div className="task-header-top flex">
            <span>
                <h3 className="text-button">Tasks</h3>
                <p>{props.taskCount || 0}</p>
            </span>
            <span>
                <h3 className="text-indigo">Completed</h3>
                <p>{props.completedCount || 0} de {props.taskCount || 0}</p>
            </span>
        </div>
    );
}

export default TaskHeader;