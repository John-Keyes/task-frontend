import React from 'react';

type TaskHeaderType = {taskCount: number | null, completedCount: number | null};
const TaskHeader = (props: TaskHeaderType) => {
    return (
        <div id="task-header-top" className="flex fit-width">
            <span className="flex flex-center">
                <h4 className="text-button">Tasks</h4>
                <p className="task-header-num">{props.taskCount}</p>
            </span>
            <span className="flex flex-center">
                <h4 className="text-indigo">Completed</h4>
                <p className="task-header-num">{props.completedCount} de {props.taskCount}</p>
            </span>
        </div>
    );
}

export default TaskHeader;