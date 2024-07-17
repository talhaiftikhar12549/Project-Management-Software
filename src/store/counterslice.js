import {createSlice} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
const initialState = {
    value: 69,
    task: [
    ],
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        addTask: (state, action) => {
            const data = action.payload
            console.log('Payload received in addTask:',data);
            state.task.unshift(data); // Adding task to the array
            console.log('Updated task array:', state.task);


        },
    },
})

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount, addTask} = counterSlice.actions

export default counterSlice.reducer