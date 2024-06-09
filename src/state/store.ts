import {
    AnyAction,
    applyMiddleware,
    combineReducers, createStore,
    legacy_createStore
} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


export const rootReducer=combineReducers({
    todolists:todolistsReducer,
    tasks: tasksReducer
})


export const store=legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootState=ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>

// @ts-ignore
window.store=store;