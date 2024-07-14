import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    legacy_createStore
} from "redux";
import {toDoListsReducer} from "../components/toDoLists/todolists-reducer";
import {tasksReducer} from "../components/task/tasks-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {appReducer} from "../components/app/app-reducer";
import {authReducer} from "../components/login/auth-reducer";


export const rootReducer=combineReducers({
    todolists:toDoListsReducer,
    tasks: tasksReducer,
    app:appReducer,
    auth:authReducer
})


export const store=legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootState=ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>

// @ts-ignore
window.store=store;