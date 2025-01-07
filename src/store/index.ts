
import {configureStore} from '@reduxjs/toolkit';
import {tasksApiSlice} from "./tasks/apiSlice";

export const store = configureStore({
    reducer: {
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
