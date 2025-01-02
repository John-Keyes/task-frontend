import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import getConfig from 'next/config';
import {NewTask, Task, TaskList} from 'src/lib/models/tasks';

const {publicRuntimeConfig: {apiUrl}} = getConfig();

//type BuilderType = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "tasks", "api">;

//<return type arg>
export const tasksApiSlice = createApi({
    reducerPath: "/tasks",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        mode: "cors",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    tagTypes: ["tasks"],
    endpoints: (builder) => ({
        GetTasks: builder.query<TaskList, void>({
            query: () => "/",
            providesTags: ["tasks"]
        }),
        GetOneTask :builder.query<Task, number>({
            query: (id: number) => `/${id}`,
            providesTags: ["tasks"]
        }),
        CreateTask: builder.mutation<Task, NewTask>({
            query: (newTask: NewTask) => ({
                url: "/",
                method: "POST",
                body: newTask
            }),
            invalidatesTags: ["tasks"]
        }),
        UpdateTask: builder.mutation<Task, Task>({
            query: (task: Task) => ({
                url: `/${task.id}`,
                method: "PUT",
                body: task
            }),
            invalidatesTags: ["tasks"]
        }),
        DeleteTask: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
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