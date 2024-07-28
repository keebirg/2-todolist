import {setErrorAC, setStatusAC} from "../app/app-reducer";
import {AuthAPIType, LoginServerType} from "../../api/toDoLists-api";
import {Dispatch} from "redux";


type DataType = LoginServerType
type PromiseAPIType = AuthAPIType

type ThunkInterfacePropsType = {
    dispatch: Dispatch
    data?: DataType
    promiseAPI: PromiseAPIType
    overallDispatch?: Array<() => void>
    thenDispatch?: Array<() => void>
    thenIfDispatch?: Array<() => void>
    catchDispatch?: Array<() => void>
}

export const thunkInterface = (props: ThunkInterfacePropsType) => {
    props.dispatch(setStatusAC({status: 'loading'}))
    props.overallDispatch?.forEach((ac: ()=>any) => props.dispatch(ac()))
    debugger
    props.promiseAPI(props.data?props.data:null)
        .then(res => {
            props.thenDispatch?.map((ac: ()=>any) => props.dispatch(ac()))
            if (res.data.resultCode === 0) {
                debugger
                props.thenIfDispatch?.forEach((ac: ()=>any) => props.dispatch(ac()))
            } else if (res.data.messages.length > 0) {
                props.dispatch(setErrorAC({error: res.data.messages[0]}))
            } else {
                props.dispatch(setErrorAC({error: 'error getAuthMeTC'}))
            }
        })
        .catch(error => {
            props.catchDispatch?.forEach((ac: ()=>any) => props.dispatch(ac()))
            props.dispatch(setErrorAC({error: error.message}))
        })
        .finally(() => {
            props.dispatch(setStatusAC({status: 'idle'}))
        })
}
