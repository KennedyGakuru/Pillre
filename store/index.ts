import {configureStore } from '@reduxjs/toolkit'
import medicationsReducer from './slices/medicationsSlice'

export const store = configureStore({
    reducer:{
        medications: medicationsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

