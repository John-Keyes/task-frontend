import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import getConfig from 'next/config';
import {NewTask, Task} from 'src/lib/models/tasks';

const {publicRuntimeConfig: {apiUrl}} = getConfig();

//type BuilderType = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "tasks", "api">;

export const tasksApiSlice = createApi({
    reducerPath: "/tasks",
    baseQuery: fetchBaseQuery({baseUrl: apiUrl}),
    tagTypes: ["tasks"],
    endpoints: (builder) => ({
        GetTasks: builder.query({
            query: () => "/",
            providesTags: ["tasks"]
        }),
        GetOneTask :builder.query({
            query: ({id}) => `/${id}`,
            providesTags: ["tasks"]
        }),
        CreateTask: builder.mutation({
            query: (task: NewTask) => ({
                url: "/",
                method: "POST",
                body: task
            }),
            invalidatesTags: ["tasks"]
        }),
        UpdateTask: builder.mutation({
            query: (task: Task) => ({
                url: `/${task.id}`,
                method: "PUT",
                body: task
            }),
            invalidatesTags: ["tasks"]
        }),
        DeleteTask: builder.mutation({
            query: ({id}: {id: number}) => ({
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