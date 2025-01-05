import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import getConfig from 'next/config';
import {NewTask, Task, TaskList} from 'src/lib/models/tasks';

const {publicRuntimeConfig: {apiUrl, clientUrl}} = getConfig();
//reducerPath: "/tasks",
export const tasksApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        mode: "cors",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            headers.set("Access-Control-Allow-Origin", clientUrl);
            return headers;
        }
    }),
    tagTypes: ["tasks"],
    endpoints: (builder) => ({
        GetTasks: builder.query<TaskList, void>({
            query: () => "/tasks",
            providesTags: ["tasks"]
        }),
        GetOneTask :builder.query<Task, number>({
            query: (id: number) => `/tasks/${id}`
        }),
        CreateTask: builder.mutation<Task, NewTask>({
            query: (newTask: NewTask) => ({
                url: "/tasks",
                method: "POST",
                body: JSON.stringify(newTask)
            }),
            invalidatesTags: ["tasks"]
        }),
        UpdateTask: builder.mutation<Task, Task>({
            query: (task: Task) => ({
                url: `/tasks/${task.id}`,
                method: "PUT",
                body: JSON.stringify(task)
            }),
            invalidatesTags: ["tasks"]
        }),
        DeleteTask: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/tasks/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const {
    useGetTasksQuery,
    useGetOneTaskQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = tasksApiSlice;