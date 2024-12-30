type Task = {
    id: number,
    title: string,
    color: string,
    completed: boolean
}

type NewTask = {
    title: string, 
    color: string, 
    completed: boolean
}

type TaskList = {
    tasks: Task[],
    taskCount: number,
    completedCount: number
}

export const emptyTasks: TaskList = {tasks: [], taskCount: 0, completedCount: 0};

export type {NewTask, Task, TaskList};
