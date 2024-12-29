
import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {tasksApiSlice} from "./tasks/apiSlice";

const MakeStore = () => configureStore({
    reducer: {
        [tasksApiSlice.reducerPath]: tasksApiSlice.reducer,
    },
    middleware: getDefaultMiddleware => (
		getDefaultMiddleware({serializableCheck: false}).concat(
            tasksApiSlice.middleware
        )
    )
});

export const store = createWrapper(MakeStore);
