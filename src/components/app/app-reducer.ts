import {Dispatch} from "redux";
import {authAPI} from "../../api/toDoLists-api";


export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = {
    status: AppStatusType
    error: string | null
    isInitialized: boolean
    isLoggedIn:boolean
}

const initialState={status:'idle', error:null, isInitialized:false, isLoggedIn:false} as const

export const appReducer = (state: AppStateType = initialState, action: actionType): AppStateType => {
    switch (action.type){
        case 'APP/SET-STATUS':
            return {...state, status:action.status}
        case 'APP/SET-ERROR':
            return {...state, error:action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized:action.isInitialized}
        case 'APP/SET-LOGGED':
            return {...state, isLoggedIn:action.isLoggedIn}
        default: return {...state}
    }
}

export const setStatusAC = (status: AppStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}
export const setInitializedAC = (isInitialized: boolean) => {
    return {type: 'APP/SET-INITIALIZED', isInitialized} as const
}
export const setLoggedAC = (isLoggedIn: boolean) => {
    return {type: 'APP/SET-LOGGED', isLoggedIn} as const
}

export const getAuthMeTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        authAPI.getAuthMe()
            .then(res => {
                dispatch(setStatusAC('idle'))
                if (res.data.resultCode === 0) {
                    dispatch(setInitializedAC(true))
                    dispatch(setLoggedAC(true))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC(res.data.messages[0]))
                    dispatch(setInitializedAC(true))
                } else {
                    dispatch(setErrorAC('error getAuthMeTC'))
                    dispatch(setInitializedAC(true))
                }
            })
            .catch(error=>{
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}


type actionType =
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setInitializedAC>
    | ReturnType<typeof setLoggedAC>