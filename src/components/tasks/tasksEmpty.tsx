import React from 'react';

const TaskEmpty = () => (
        <div className="flex flex-column task-empty-border-top flex-center">
            <span className="fa-solid fa-2xl text-icon fa-clipboard-list"></span>
            <h4 className="text-icon task-empty-h4">You don't have any tasks registered yet. Create tasks and organize your to-do items.</h4>
            <p className="text-icon">Create tasks and organize your to-do items</p>
        </div>
);

export default TaskEmpty;