import {authAPI, LoginServerType} from "../../api/toDoLists-api";
import { setErrorAC, setLoggedAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    disabled: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        UpdateDisabledLoginAC(state, action: PayloadAction<{ disabled: boolean }>) {
            state.disabled=action.payload.disabled
        },

    }
})

export const authReducer=slice.reducer;
export const {UpdateDisabledLoginAC}=slice.actions;


export const loginTC = (data: LoginServerType) => {
    return (dispatch: Dispatch) => {
        dispatch(UpdateDisabledLoginAC({disabled:true}))
        dispatch(setStatusAC({status: 'loading'}))
        authAPI.login(data)
            .then(res => {
                dispatch(UpdateDisabledLoginAC({disabled:false}))
                if (res.data.resultCode === 0) {
                    dispatch(setLoggedAC({isLoggedIn: true}))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: 'error getAuthMeTC'}))
                }
            })
            .catch(error => {
                dispatch(UpdateDisabledLoginAC({disabled:false}))
                dispatch(setErrorAC({error: error.message}))
            })
            .finally(()=>{
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        dispatch(UpdateDisabledLoginAC({disabled:true}))
        authAPI.logout()
            .then(res => {
                dispatch(UpdateDisabledLoginAC({disabled:false}))
                dispatch(setStatusAC({status: 'idle'}))
                if (res.data.resultCode === 0) {
                    dispatch(setLoggedAC({isLoggedIn: false}))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: 'error getAuthMeTC'}))
                }
            })
            .catch(error => {
                dispatch(UpdateDisabledLoginAC({disabled:false}))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}


// export const authReducer = (state: authType = {disabled: false}, action: ActionType): authType => {
//     switch (action.type) {
//         case "LOGIN/UPDATE-DISABLED":
//             return {...state, disabled: action.disabled}
//
//         default:
//             return state;
//     }
//
// }
//
//
// const UpdateDisabledLoginAC = (disabled: boolean) => {
//     return {type: 'LOGIN/UPDATE-DISABLED', disabled}
// }
//
// type authType = {
//     disabled: boolean
// }
// type ActionType = ReturnType<typeof UpdateDisabledLoginAC>