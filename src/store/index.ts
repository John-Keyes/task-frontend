
import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {tasksApiSlice} from "./tasks/apiSlice";
import { tasksSlice } from './tasks/slice';

export const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
        [tasksApiSlice.reducerPath]: tasksApiSlice.reducer
    },
    middleware: getDefaultMiddleware => (
		getDefaultMiddleware({serializableCheck: false}).concat(
            tasksApiSlice.middleware
        )
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
