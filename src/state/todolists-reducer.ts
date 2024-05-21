import {v1} from "uuid";
import {ToDoListType} from "../api/toDoLists-api";

export type FilterTypes = "All" | "Active" | "Completed";

export type ToDoListsDataType =ToDoListType & {
    filter: FilterTypes
}

export type AddListActionType = {
    type: 'ADD-LIST'
    titleList: string
    idList: string
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

type actionType =
    AddListActionType
    | DelListActionType
    | UpdateFilterActionType
    | UpdateListTitleActionType


export const idToDoList1 = v1();
export const idToDoList2 = v1();
export const idToDoList3 = v1();

let initialState: Array<ToDoListsDataType> = [
    {id: idToDoList1, title: "Job1", filter: "All", addedDate:"", order: 0},
    {id: idToDoList2, title: "Job2", filter: "Active", addedDate:"", order: 0},
    {id: idToDoList3, title: "Job3", filter: "Completed", addedDate:"", order: 0},
]


export const todolistsReducer = (state: Array<ToDoListsDataType> = initialState, action: actionType): Array<ToDoListsDataType> => {

    const startState = state

    switch (action.type) {
        case'ADD-LIST': {
            const newStartState = [...startState]

            newStartState.push({id: action.idList, title: action.titleList, filter: "All", addedDate:"", order: 0});

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
        default:
            return state;
    }
};

export const AddListAC = (titleList: string): AddListActionType => {
    const idList = v1();
    return {type: 'ADD-LIST', titleList: titleList, idList: idList}
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
