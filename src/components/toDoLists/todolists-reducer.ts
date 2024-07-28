import {toDoListsAPI, ToDoListServerType} from "../../api/toDoLists-api";
import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from "../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState: Array<ToDoListAppType> = []

const slice = createSlice({
    name: 'toDoLists',
    initialState: initialState,
    reducers: {
        AddListAC(state, action: PayloadAction<{ newToDoList: ToDoListServerType }>) {
            state.push({...action.payload.newToDoList, filter: "All", disabled: false})
        },
        DelListAC(state, action: PayloadAction<{ idList: string }>) {
            const index = state.findIndex(el => el.id === action.payload.idList)
            state.splice(index, 1)
        },
        UpdateFilterAC(state, action: PayloadAction<{ idList: string, filter: FilterTypes }>) {
            const index = state.findIndex(el => el.id === action.payload.idList)
            state[index].filter = action.payload.filter
        },
        UpdateListTitleAC(state, action: PayloadAction<{ idList: string, newTitle: string }>) {
            const index = state.findIndex(el => el.id === action.payload.idList)
            state[index].title = action.payload.newTitle
        },
        UpdateListDisabledAC(state, action: PayloadAction<{ idList: string, disabled: boolean }>) {
            const index = state.findIndex(el => el.id === action.payload.idList)
            state[index].disabled = action.payload.disabled
        },
        SetToDoListsAC(state, action: PayloadAction<{ toDoLists: Array<ToDoListServerType> }>) {
            return action.payload.toDoLists.map(el => ({...el, filter: "All", disabled: false}))
        }
    }
})


export const {AddListAC, DelListAC, UpdateFilterAC, UpdateListTitleAC, UpdateListDisabledAC, SetToDoListsAC}=slice.actions;
export const toDoListsReducer=slice.reducer;

export const fetchToDoListsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        toDoListsAPI.getToDoLists()
            .then(res => {
                dispatch(setStatusAC({status: 'idle'}))
                dispatch(SetToDoListsAC({toDoLists:res.data}))
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}
export const delToDoListTC = (idList: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        dispatch(UpdateListDisabledAC({idList:idList, disabled:true}))
        toDoListsAPI.deleteToDoList(idList)
            .then(res => {
                dispatch(setStatusAC({status: 'idle'}))
                dispatch(DelListAC({idList:idList}))
            })
            .catch(error => {
                dispatch(UpdateListDisabledAC({idList:idList, disabled:false}))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}
export const addToDoListTC = (titleList: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        toDoListsAPI.createToDoList(titleList)
            .then(res => {
                dispatch(setStatusAC({status: 'idle'}))
                if (res.data.resultCode === 0) {
                    dispatch(AddListAC({newToDoList:res.data.data.item}))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: 'error addToDoListTC'}))
                }
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}
export const updateToDoListTC = (idList: string, newTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        toDoListsAPI.updateToDoList(idList, newTitle)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(UpdateListTitleAC({idList:idList, newTitle:newTitle}))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: 'error addToDoListTC'}))
                }
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
            })
            .finally(() => dispatch(setStatusAC({status: 'idle'})))
    }
}


export type FilterTypes = "All" | "Active" | "Completed";
export type ToDoListAppType = ToDoListServerType & {
    filter: FilterTypes
    disabled: boolean
}

// export type AddListActionType = ReturnType<typeof AddListAC>
// export type DelListActionType = ReturnType<typeof DelListAC>
// // type UpdateFilterActionType = ReturnType<typeof UpdateFilterAC>
// // type UpdateListTitleActionType = ReturnType<typeof UpdateListTitleAC>
// // type UpdateListDisabledActionType = ReturnType<typeof UpdateListDisabledAC>
// export type SetToDoListsActionType = ReturnType<typeof SetToDoListsAC>

// type actionType =
//     AddListActionType
//     | DelListActionType
//     | UpdateFilterActionType
//     | UpdateListTitleActionType
//     | SetToDoListsActionType
//     | UpdateListDisabledActionType

// export const toDoListsReducer = (state: Array<ToDoListAppType> = [], action: actionType): Array<ToDoListAppType> => {
//
//     const startState = state
//
//     switch (action.type) {
//         case'ADD-LIST': {
//             const newStartState = [...startState]
//
//             newStartState.push({...action.newToDoList, filter: "All", disabled: false});
//
//             return newStartState
//         }
//         case'DEL-LIST': {
//             return startState.filter((data) => data.id !== action.idList);
//         }
//         case'FILTER-UPDATE': {
//             const newStartState = startState.map((data) => {
//                 return {...data}
//             })
//
//             newStartState.map((data) => {
//                 if (data.id === action.idList) data.filter = action.filter
//             })
//
//
//             return newStartState
//         }
//
//         case'UPDATE-LIST-TITLE': {
//             const newStartState = startState.map((data) => {
//                 return {...data}
//             })
//             newStartState.map((list) => {
//                 if (list.id === action.idList) list.title = action.newTitle;
//             })
//             return newStartState
//         }
//
//         case'UPDATE-LIST-DISABLED': {
//             const newStartState = startState.map((data) => {
//                 return {...data}
//             })
//             newStartState.map((list) => {
//                 if (list.id === action.idList) list.disabled = action.disabled
//             })
//             return newStartState
//         }
//
//         case 'SET-TO-DO-LISTS': {
//             return action.toDoLists.map(tdl => {
//                 return {...tdl, filter: "All", disabled: false}
//             })
//         }
//         default:
//             return state;
//     }
// };
//
//
// export const AddListAC = (newToDoList: ToDoListServerType) => {
//     return {type: 'ADD-LIST', newToDoList: newToDoList} as const
// }
// export const DelListAC = (idList: string) => {
//     return {type: 'DEL-LIST', idList: idList} as const
// }
// export const UpdateFilterAC = (idList: string, filter: FilterTypes) => {
//     return {type: 'FILTER-UPDATE', filter: filter, idList: idList} as const
// }
// export const UpdateListTitleAC = (idList: string, newTitle: string) => {
//     return {type: 'UPDATE-LIST-TITLE', newTitle: newTitle, idList: idList} as const
// }
// export const SetToDoListsAC = (toDoLists: Array<ToDoListServerType>) => {
//     return {type: 'SET-TO-DO-LISTS', toDoLists: toDoLists} as const
// }
// export const UpdateListDisabledAC = (idList: string, disabled: boolean) => {
//     return {type: 'UPDATE-LIST-DISABLED', idList: idList, disabled: disabled} as const
// }