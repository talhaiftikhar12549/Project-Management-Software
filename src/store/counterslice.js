import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const initialState = {
    value: 69,
    task: JSON.parse(localStorage.getItem('localData')) || [],
    taskInColumn: JSON.parse(localStorage.getItem('Task counts')) || {
        backlog: 0,
        open: 0,
        new: 0,
        inProgress: 0,
        feedBackNeeded: 0,
        readyForTesting: 0,
        qaInProgress: 0,
    }
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


            const mergeData = [...action.payload, ...state.task];

            function filterUniqueTasks(tasks) {
                const seen = new Set();
                return tasks.filter(task => {
                    const isDuplicate = seen.has(task.id);
                    seen.add(task.id);
                    return !isDuplicate;
                });
            }

            const uniqueTasks = filterUniqueTasks(mergeData);
            // state.form = uniqueTasks;
            //
            //
            //
            //
            //
            //
            //
            // const newFileData = action.payload;
            state.task = uniqueTasks;
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
        taskCount: (state) => {
            state.taskInColumn = {
                backlog: 0,
                open: 0,
                new: 0,
                inProgress: 0,
                feedBackNeeded: 0,
                readyForTesting: 0,
                qaInProgress: 0,
            };
            state.task.forEach(item => {
                switch (item.columnId) {
                    case 1:
                        state.taskInColumn.backlog += 1;
                        break;
                    case 2:
                        state.taskInColumn.open += 1;
                        break;
                    case 3:
                        state.taskInColumn.new += 1;
                        break;
                    case 4:
                        state.taskInColumn.inProgress += 1;
                        break;
                    case 5:
                        state.taskInColumn.feedBackNeeded += 1;
                        break;
                    case 6:
                        state.taskInColumn.readyForTesting += 1;
                        break;
                    case 7:
                        state.taskInColumn.qaInProgress += 1;
                        break;
                    default:
                        console.log('Unknown columnId:', item.columnId);
                }
            });
            console.log('Task counts:', state.taskInColumn);
            localStorage.setItem("Task counts", JSON.stringify(state.taskInColumn));
        }
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
