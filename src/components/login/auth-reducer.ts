import {authAPI, LoginServerType} from "../../api/toDoLists-api";
import {setErrorAC,  setLoggedAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";




export const authReducer = (state: authType={disabled:false}, action: ActionType): authType => {
    switch (action.type) {
        case "LOGIN/UPDATE-DISABLED": return {...state, disabled:action.disabled}

        default:
            return state;
    }

}


const UpdateDisabledLoginAC=(disabled:boolean)=>{
    return{type:'LOGIN/UPDATE-DISABLED', disabled}
}

export const loginTC = (data:LoginServerType) => {
    return (dispatch: Dispatch) => {
        dispatch(UpdateDisabledLoginAC(true))
        dispatch(setStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                dispatch(UpdateDisabledLoginAC(false))
                dispatch(setStatusAC('idle'))
                if (res.data.resultCode === 0) {
                    dispatch(setLoggedAC(true))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('error getAuthMeTC'))
                }
            })
            .catch(error=>{
                dispatch(UpdateDisabledLoginAC(false))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(UpdateDisabledLoginAC(true))
        authAPI.logout()
            .then(res => {
                dispatch(UpdateDisabledLoginAC(false))
                dispatch(setStatusAC('idle'))
                if (res.data.resultCode === 0) {
                    dispatch(setLoggedAC(false))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('error getAuthMeTC'))
                }
            })
            .catch(error=>{
                dispatch(UpdateDisabledLoginAC(false))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}



type authType = {
    disabled:boolean
}
type ActionType = ReturnType<typeof UpdateDisabledLoginAC>