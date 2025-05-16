import {configureStore } from '@reduxjs/toolkit'
import medicationsReducer from './slices/medicationsSlice'
import appointmentsReducer from './slices/appointmentsSlice'

export const store = configureStore({
    reducer:{
        medications: medicationsReducer,
        appointments: appointmentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

