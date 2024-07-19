import {createSlice} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid';

const initialState = {
    value: 69,
    task: JSON.parse(localStorage.getItem('localData')) || [
    // task: [
    //     {
    //         id: uuidv4(),
    //         name: "Nav Bar issue",
    //         description: "Nav Bar Not Found",
    //         assignee: "Kamran",
    //         dueDate: "2days",
    //         status: "backlog",
    //         timeSpent: "3",
    //         priority: "Low",
    //     },
    //     {
    //         id: uuidv4(),
    //         name: "css file",
    //         description: "css file not found",
    //         assignee: "fateh",
    //         dueDate: "3days",
    //         status: "backlog",
    //         timeSpent: "3",
    //         priority: "High",
    //     },
    //     {
    //         id: uuidv4(),
    //         name: "div not centered",
    //         description: "div not centerd in the page",
    //         assignee: "muneeb",
    //         dueDate: "1day",
    //         status: "backlog",
    //         timeSpent: "6",
    //         priority: "Urgent",
    //     }
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
            const newData = {id: uuidv4(), ...data}
            let reqData = [...state.task];
            reqData.unshift(newData);
            state.task = reqData; // Adding task to the array
            const localData = JSON.stringify(state.task);
            localStorage.setItem("localData", localData);
        },
        downloadJson(state) {
            const jsonString = JSON.stringify(state.task, null, 2);
            const blob = new Blob([jsonString], {type: "application/json"});
            const link = document.createElement("a");
            link.download = "backlog-data.json";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        importFile(state, action) {
            const newFileData = action.payload
            state.task = newFileData
            const localData = JSON.stringify(state.task);
            localStorage.setItem("localData", localData);
        },
        editData: (state, action) => {
            const updatedTask = action.payload;
            const index = state.task.findIndex(task => task.id === updatedTask.id);
            console.log("index", index)
            if (index !== -1) {
                state.task[index] = {...updatedTask};
                const localData = JSON.stringify(state.task);
                localStorage.setItem("localData", localData);
            }

        },
    },
})

// Action creators are generated for each case reducer function
export const {
    increment,
    decrement,
    incrementByAmount,
    addTask,
    downloadJson,
    importFile,
    editData
} = counterSlice.actions

export default counterSlice.reducer