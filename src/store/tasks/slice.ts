import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskList } from "src/lib/models/tasks";


const initialState: TaskList = {
    tasks: [],
    taskCount: 0,
    completedCount: 0
}

export const tasksSlice = createSlice({
    name:"tasks",
    initialState,
    reducers: {
        updateTasks: (state, action: PayloadAction<TaskList>) => {
            state = action.payload;
        }
    }
});

export const {updateTasks} = tasksSlice.actions;
export default tasksSlice.reducer;