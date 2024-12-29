import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import getConfig from 'next/config';
import Task from 'src/lib/models/tasks';

const {publicRuntimeConfig: {apiUrl}} = getConfig();

export const tasksApiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: apiUrl}),
    reducerPath: "api",
    tagTypes: ["tasks"],
    endPoints: (builder: any) => ({
        GetTasks: builder.query({
            query: () => "/tasks",
            providesTags: ["tasks"]
        }),
        CreateTask: builder.mutation({
            query: (task: Task) => ({
                url: "/tasks",
                method: "POST",
                body: task
            }),
            invalidatesTags: ["tasks"]
        }),
        UpdateTask: builder.mutation({
            query: (task: Task) => ({
                url: `/tasks/${task.id}`,
                method: "PUT",
                body: task
            }),
            invalidatesTags: ["tasks"]
        }),
        DeleteTask: builder.mutation({
            query: ({ id }: { id: number}) => ({
                url: `/tasks/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = tasksApiSlice;