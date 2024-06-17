
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = {
    status: AppStatusType
    error: string | null
}


export const appReducer = (state: AppStateType = {status:'idle', error:null}, action: actionType): AppStateType => {
    switch (action.type){
        case 'SET-STATUS':
            return {...state, status:action.status}
        case 'SET-ERROR':
            return {...state, error:action.error}
        default: return {...state}
    }
}

export const setStatusAC = (status: AppStatusType) => {
    return {type: 'SET-STATUS', status} as const
}
export const setErrorAC = (error: string | null) => {
    return {type: 'SET-ERROR', error} as const
}

type actionType =
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>