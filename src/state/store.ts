import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    legacy_createStore
} from "redux";
import {toDoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";


export const rootReducer=combineReducers({
    todolists:toDoListsReducer,
    tasks: tasksReducer,
    app:appReducer
})


export const store=legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootState=ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>

// @ts-ignore
window.store=store;