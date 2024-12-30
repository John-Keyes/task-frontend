import React from 'react';

const TaskEmpty = () => {
    
    return (
        <div className="flex flex-column">
            <span className="fa-solid fa-clipboard-list"></span>
            <h3>You don't have any tasks registered yet. Create tasks and organize your to-do items.</h3>
            <p>Create tasks and organize your to-do items</p>
        </div>
    );
}

export default TaskEmpty;