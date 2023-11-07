import {
    combineReducers,
    createStore
} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {taskReducer} from "./tasks-reducer";


export const rootReducer=combineReducers({
    todolist:todolistsReducer,
    tasks: taskReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer);

// @ts-ignore
window.store=store;