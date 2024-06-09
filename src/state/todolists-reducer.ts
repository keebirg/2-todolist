import {v1} from "uuid";
import {toDoListsAPI, ToDoListServerType} from "../api/toDoLists-api";
import {Dispatch} from "redux";



export type FilterTypes = "All" | "Active" | "Completed";

export type ToDoListAppType =ToDoListServerType & {
    filter: FilterTypes
}

export type AddListActionType = {
    type: 'ADD-LIST'
    newToDoList: ToDoListServerType
}
export type DelListActionType = {
    type: 'DEL-LIST'
    idList: string
}
type UpdateFilterActionType = {
    type: 'FILTER-UPDATE'
    idList: string
    filter: FilterTypes
}
type UpdateListTitleActionType = {
    type: 'UPDATE-LIST-TITLE'
    idList: string
    newTitle: string
}
export type SetToDoListsActionType={
    type:'SET-TO-DO-LISTS'
    toDoLists: Array<ToDoListServerType>
}

type actionType =
    AddListActionType
    | DelListActionType
    | UpdateFilterActionType
    | UpdateListTitleActionType
    | SetToDoListsActionType


export const idToDoList1 = v1();
export const idToDoList2 = v1();


// let initialState: Array<ToDoListsAppType> = [
//     {id: idToDoList1, title: "Job1", filter: "All", addedDate:"", order: 0},
// ]


export const todolistsReducer = (state: Array<ToDoListAppType> = [], action: actionType): Array<ToDoListAppType> => {

    const startState = state

    switch (action.type) {
        case'ADD-LIST': {
            const newStartState = [...startState]

            newStartState.push({...action.newToDoList, filter: "All"});

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

        case 'SET-TO-DO-LISTS':{
            return action.toDoLists.map(tdl=>{
                return {...tdl, filter: "All"}
            })
        }
        default:
            return state;
    }
};

export const AddListAC = (newToDoList: ToDoListServerType): AddListActionType => {
    return {type: 'ADD-LIST', newToDoList: newToDoList}
}
export const DelListAC = (idList: string): DelListActionType => {
    return {type: 'DEL-LIST', idList: idList}
}
export const UpdateFilterAC = (idList: string, filter: FilterTypes): UpdateFilterActionType => {
    return {type: 'FILTER-UPDATE', filter: filter, idList: idList}
}
export const UpdateListTitleAC = (idList: string, newTitle: string): UpdateListTitleActionType => {
    return {type: 'UPDATE-LIST-TITLE', newTitle: newTitle, idList: idList}
}
export const SetToDoListsAC = (toDoLists: Array<ToDoListServerType>):SetToDoListsActionType  => {
    return {type: 'SET-TO-DO-LISTS', toDoLists:toDoLists}
}



export const fetchToDoListsTC=()=>{
    return (dispatch: Dispatch)=>{
        toDoListsAPI.getToDoLists()
            .then(res=>{
                const action=SetToDoListsAC(res.data)
                dispatch(action)
            })
    }
}
export const delToDoListTC=(idList: string)=>{
    return (dispatch: Dispatch)=>{
        toDoListsAPI.deleteToDoList(idList)
            .then(res=>{
                const action=DelListAC(idList)
                dispatch(action)
            })
    }
}
export const addToDoListTC=(titleList: string)=>{
    return (dispatch: Dispatch)=>{
        toDoListsAPI.createToDoList(titleList)
            .then(res=>{
                const action=AddListAC(res.data.data.item)
                dispatch(action)
            })
    }
}
export const updateToDoListTC=(idList: string, newTitle: string)=>{
    return (dispatch: Dispatch)=>{
        toDoListsAPI.updateToDoList(idList, newTitle)
            .then(res=>{
                const action=UpdateListTitleAC(idList, newTitle)
                dispatch(action)
            })
    }
}