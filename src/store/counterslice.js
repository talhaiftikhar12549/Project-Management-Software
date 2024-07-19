import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const initialState = {
    value: 69,
    task: JSON.parse(localStorage.getItem('localData')) || [],
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        addTask: (state, action) => {
            const data = action.payload;
            const newData = {id: uuidv4(), status: "Back log", ...data};
            let reqData = [...state.task];
            reqData.unshift(newData);
            state.task = reqData; // Adding task to the array
            const localData = JSON.stringify(state.task);
            localStorage.setItem("localData", localData);
        },
        downloadJson: (state) => {
            const jsonString = JSON.stringify(state.task, null, 2);
            const blob = new Blob([jsonString], {type: "application/json"});
            const link = document.createElement("a");
            link.download = "backlog-data.json";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        importFile: (state, action) => {
            const newFileData = action.payload;
            state.task = newFileData;
            const localData = JSON.stringify(state.task);
            localStorage.setItem("localData", localData);
        },
        editData: (state, action) => {
            const updatedTask = action.payload;
            const index = state.task.findIndex((task) => task.id === updatedTask.id);
            if (index !== -1) {
                state.task[index] = {...state.task[index], ...updatedTask};
                const localData = JSON.stringify(state.task);
                localStorage.setItem("localData", localData);
            }
        },
    },
});

export const {
    increment,
    decrement,
    incrementByAmount,
    addTask,
    downloadJson,
    importFile,
    editData,
} = counterSlice.actions;

export default counterSlice.reducer;
