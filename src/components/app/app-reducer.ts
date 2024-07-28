import {Dispatch} from "redux";
import {authAPI} from "../../api/toDoLists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = {
    status: AppStatusType
    error: string | null
    isInitialized: boolean
    isLoggedIn: boolean
}

const initialState: AppStateType = {status: 'idle', error: null, isInitialized: false, isLoggedIn: false}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatusAC(state, action: PayloadAction<{ status: AppStatusType }>) {
            state.status = action.payload.status
        },
        setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error=action.payload.error
        },
        setInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized=action.payload.isInitialized
        },
        setLoggedAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn=action.payload.isLoggedIn
        },
    }
})

export const {setStatusAC, setErrorAC, setInitializedAC, setLoggedAC}=slice.actions;
export const appReducer =slice.reducer;

export const getAuthMeTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status:'loading'}))
        authAPI.getAuthMe()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setInitializedAC({isInitialized:true}))
                    dispatch(setLoggedAC({isLoggedIn:true}))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC({error:res.data.messages[0]}))
                    dispatch(setInitializedAC({isInitialized:true}))
                } else {
                    dispatch(setErrorAC({error:'error getAuthMeTC'}))
                    dispatch(setInitializedAC({isInitialized :true}))
                }
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
            })
            .finally(()=>dispatch(setStatusAC({status:'idle'})))
    }
}

// export const appReducer = (state: AppStateType = initialState, action: actionType): AppStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'APP/SET-INITIALIZED':
//             return {...state, isInitialized: action.isInitialized}
//         case 'APP/SET-LOGGED':
//             return {...state, isLoggedIn: action.isLoggedIn}
//         default:
//             return {...state}
//     }
// }
//
// export const setStatusAC = (status: AppStatusType) => {
//     return {type: 'APP/SET-STATUS', status} as const
// }
// export const setErrorAC = (error: string | null) => {
//     return {type: 'APP/SET-ERROR', error} as const
// }
// export const setInitializedAC = (isInitialized: boolean) => {
//     return {type: 'APP/SET-INITIALIZED', isInitialized} as const
// }
// export const setLoggedAC = (isLoggedIn: boolean) => {
//     return {type: 'APP/SET-LOGGED', isLoggedIn} as const
// }

// type actionType =
//     | ReturnType<typeof setStatusAC>
//     | ReturnType<typeof setErrorAC>
//     | ReturnType<typeof setInitializedAC>
//     | ReturnType<typeof setLoggedAC>
