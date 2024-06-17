import {toDoListsAPI, ToDoListServerType} from "../api/toDoLists-api";
import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from "./app-reducer";




// let initialState: Array<ToDoListsAppType> = [
//     {id: idToDoList1, title: "Job1", filter: "All", addedDate:"", order: 0},
// ]


export const toDoListsReducer = (state: Array<ToDoListAppType> = [], action: actionType): Array<ToDoListAppType> => {

    const startState = state

    switch (action.type) {
        case'ADD-LIST': {
            const newStartState = [...startState]

            newStartState.push({...action.newToDoList, filter: "All", disabled: false});

            return newStartState
        }
        case'DEL-LIST': {
            const newStartState = startState.filter((data) => data.id !== action.idList);

            return newStartState
        }
        case'FILTER-UPDATE': {
            const newStartState = startState.map((data) => {
                return {...data}
            })

            newStartState.map((data) => {
                if (data.id === action.idList) data.filter = action.filter
            })


            return newStartState
        }

        case'UPDATE-LIST-TITLE': {
            const newStartState = startState.map((data) => {
                return {...data}
            })
            newStartState.map((list) => {
                if (list.id === action.idList) list.title = action.newTitle;
            })
            return newStartState
        }

        case'UPDATE-LIST-DISABLED':{
            const newStartState = startState.map((data) => {
                return {...data}
            })
            newStartState.map((list)=>{
                if(list.id===action.idList) list.disabled=action.disabled
            })
            return newStartState
        }

        case 'SET-TO-DO-LISTS': {
            return action.toDoLists.map(tdl => {
                return {...tdl, filter: "All", disabled: false}
            })
        }
        default:
            return state;
    }
};


export const AddListAC = (newToDoList: ToDoListServerType) => {
    return {type: 'ADD-LIST', newToDoList: newToDoList} as const
}
export const DelListAC = (idList: string) => {
    return {type: 'DEL-LIST', idList: idList} as const
}
export const UpdateFilterAC = (idList: string, filter: FilterTypes) => {
    return {type: 'FILTER-UPDATE', filter: filter, idList: idList} as const
}
export const UpdateListTitleAC = (idList: string, newTitle: string) => {
    return {type: 'UPDATE-LIST-TITLE', newTitle: newTitle, idList: idList} as const
}
export const SetToDoListsAC = (toDoLists: Array<ToDoListServerType>) => {
    return {type: 'SET-TO-DO-LISTS', toDoLists: toDoLists} as const
}
export const UpdateListDisabledAC = (idList: string, disabled: boolean) => {
    return {type: 'UPDATE-LIST-DISABLED', idList: idList, disabled: disabled} as const
}


export const fetchToDoListsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        toDoListsAPI.getToDoLists()
            .then(res => {
                dispatch(setStatusAC('idle'))
                dispatch(SetToDoListsAC(res.data))
            })
            .catch(error=>{
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}
export const delToDoListTC = (idList: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(UpdateListDisabledAC(idList, true))
        toDoListsAPI.deleteToDoList(idList)
            .then(res => {
                dispatch(setStatusAC('idle'))
                dispatch(DelListAC(idList))
            })
            .catch(error=>{
                dispatch(UpdateListDisabledAC(idList, false))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}
export const addToDoListTC = (titleList: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        toDoListsAPI.createToDoList(titleList)
            .then(res => {
                dispatch(setStatusAC('idle'))
                if (res.data.resultCode === 0) {
                    dispatch(AddListAC(res.data.data.item))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('error addToDoListTC'))
                }
            })
            .catch(error=>{
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}
export const updateToDoListTC = (idList: string, newTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        toDoListsAPI.updateToDoList(idList, newTitle)
            .then(res => {
                dispatch(setStatusAC('idle'))
                const action = UpdateListTitleAC(idList, newTitle)
                dispatch(action)
            })
            .catch(error=>{
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}


export type FilterTypes = "All" | "Active" | "Completed";


export type ToDoListAppType = ToDoListServerType & {
    filter: FilterTypes
    disabled: boolean
}

export type AddListActionType = ReturnType<typeof AddListAC>
export type DelListActionType = ReturnType<typeof DelListAC>
type UpdateFilterActionType = ReturnType<typeof UpdateFilterAC>
type UpdateListTitleActionType = ReturnType<typeof UpdateListTitleAC>
type UpdateListDisabledActionType = ReturnType<typeof UpdateListDisabledAC>
export type SetToDoListsActionType = ReturnType<typeof SetToDoListsAC>

type actionType =
    AddListActionType
    | DelListActionType
    | UpdateFilterActionType
    | UpdateListTitleActionType
    | SetToDoListsActionType
    | UpdateListDisabledActionType