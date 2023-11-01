import {
    FilterTypes,
    ToDoListsDataType,
} from "../components/ToDoLists";





export type AddListActionType = {
    type: 'ADD-LIST'
    titleList: string
    idList:string
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


export const todolistsReducer = (state: Array<ToDoListsDataType>, action: actionType): Array<ToDoListsDataType> => {

    const startState = state

    switch (action.type) {
        case'ADD-LIST': {
            const newStartState = [...startState]

            newStartState.push({id: action.idList, title: action.titleList, filter: "All"});

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
            throw new Error("Don't understand this type")
    }
};

export const AddListAC=(titleList:string, idToDoList:string):AddListActionType=>{
    return {type:'ADD-LIST', titleList:titleList, idList:idToDoList}
}
export const DelListAC=(idList:string):DelListActionType=>{
    return {type:'DEL-LIST', idList:idList}
}
export const UpdateFilterAC=(filter:FilterTypes, idList:string):UpdateFilterActionType=>{
    return {type:'FILTER-UPDATE', filter:filter, idList:idList}
}
export const UpdateListTitleAC=(newTitle:string, idList:string):UpdateListTitleActionType=>{
    return {type:'UPDATE-LIST-TITLE', newTitle:newTitle, idList:idList}
}
