import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/counterslice'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})