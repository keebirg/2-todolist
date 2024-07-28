import {
    AnyAction,
    combineReducers,
} from "redux";
import {toDoListsReducer} from "../components/toDoLists/todolists-reducer";
import {tasksReducer} from "../components/task/tasks-reducer";
import {ThunkDispatch} from "redux-thunk";
import {appReducer} from "../components/app/app-reducer";
import {authReducer} from "../components/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


export const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})


// export const store=legacy_createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer
})

export type RootReducerType=typeof rootReducer

export type AppRootState = ReturnType<RootReducerType>

export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>

// @ts-ignore
window.store = store;