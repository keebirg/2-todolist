import React from 'react'
import { Provider } from 'react-redux';
import {AppRootState} from "../../state/store";
import {combineReducers,  legacy_createStore} from "redux";
import {toDoListsReducer} from "../../state/todolists-reducer";
import {tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "../../api/toDoLists-api";


const idToDoList1=v1()
const idToDoList2=v1()

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer
})


const initialGlobalState:AppRootState = {
    todolists: [
        {id: idToDoList1, title: "Job1", filter: "All", addedDate:"", order: 0, disabled:false},
        {id: idToDoList2, title: "Job2", filter: "Active", addedDate:"", order: 0, disabled:false},
    ],
    tasks: {
        [idToDoList1]: [
            {todoListId: idToDoList1, id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
            {todoListId: idToDoList1, id: v1(), title: "HTML", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
            {todoListId: idToDoList1, id: v1(), title: "REACT", status: TaskStatus.New, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
        ],
        [idToDoList2]: [
            {todoListId: idToDoList2, id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
            {todoListId: idToDoList2, id: v1(), title: "HTML", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low , disabled:false},
            {todoListId: idToDoList2, id: v1(), title: "REACT", status: TaskStatus.New, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
        ],
    },
    app:{
        status:'idle',
        error:null
    }
};

export const storyBookStore = legacy_createStore(rootReducer);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}