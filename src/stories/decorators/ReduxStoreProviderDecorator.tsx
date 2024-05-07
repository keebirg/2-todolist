import React from 'react'
import { Provider } from 'react-redux';
import {AppRootState, store} from "../../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../../state/todolists-reducer";
import {tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {ToDoListsDataType} from "../../components/ToDoLists";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


const initialGlobalState = {
    todolists: [
        {id: "idToDoList1", title: "Job111", filter: "All"},
        {id: "idToDoList2", title: "Job2", filter: "Active"},
    ],
    tasks: {
        ["idToDoList1"]: [
            {id: v1(), title: "HTML&CSS", isCheck: true},
            {id: v1(), title: "JS", isCheck: false}
        ],
        ["idToDoList2"]: [
            {id: v1(), title: "Milk", isCheck: false},
            {id: v1(), title: "React Book", isCheck: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}