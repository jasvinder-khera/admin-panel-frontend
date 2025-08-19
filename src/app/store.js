import { configureStore } from "@reduxjs/toolkit";
import chartReducer from '../features/charts/chartSlice'

export const store = configureStore({
    reducer:{
        charts: chartReducer,
    }
})