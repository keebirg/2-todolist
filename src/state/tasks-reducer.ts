import {v1} from "uuid";
import {
    AddListActionType,
    DelListActionType, SetToDoListsAC,
    SetToDoListsActionType
} from "./todolists-reducer";
import {DataToUpdateType, TaskPriority, TaskStatus, TaskType, toDoListsAPI} from "../api/toDoLists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


type AddTaskActionType = {
    type: 'ADD-TASK'
    newTask:TaskType
}
type DelTaskActionType = {
    type: 'DEL-TASK'
    idList: string
    idTask: string
}

type UpdateTaskTitleActionType = {
    type: 'UPDATE-TASK-TITLE'
    idList: string
    idTask: string
    newTitle: string
}

type UpdateCheckboxTaskActionType = {
    type: 'UPDATE-CHECKBOX-TASK'
    idList: string
    idTask: string
    status: TaskStatus
}

export type ToDoListTasksType = {
    [key: string]: Array<TaskType>
}

type SetTasksActionType = {
    type: 'SET-TASKS'
    idList:string
    tasks: Array<TaskType>
}


type actionType =
    AddTaskActionType
    | DelTaskActionType
    | UpdateTaskTitleActionType
    | UpdateCheckboxTaskActionType
    | AddListActionType
    | DelListActionType
    | SetToDoListsActionType
    | SetTasksActionType


// let initialState: ToDoListTasksType = {
//     [idToDoList1]: [
//         {todoListId: idToDoList1, id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
//         {todoListId: idToDoList1, id: v1(), title: "HTML", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
//         {todoListId: idToDoList1, id: v1(), title: "REACT", status: TaskStatus.New, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
//     ]
// }

export const tasksReducer = (state: ToDoListTasksType = {}, action: actionType): ToDoListTasksType => {

    switch (action.type) {

        case'ADD-LIST': {
            const newStartState = {...state, [action.newToDoList.id]:[]}

            return newStartState
        }
        case'DEL-LIST': {
            const newStartState = {...state}
            delete newStartState[action.idList];

            return newStartState
        }

        case "SET-TO-DO-LISTS": {
            const newStartState = {...state}

            action.toDoLists.forEach(tdl => {
                newStartState[tdl.id] = [];
            })

            return newStartState
        }

        case'ADD-TASK': {
            const newStartState = {...state, [action.newTask.todoListId]: [...state[action.newTask.todoListId]]};
            newStartState[action.newTask.todoListId].push(action.newTask);

            return newStartState
        }
        case'DEL-TASK': {
            const newStartState = {...state};
            newStartState[action.idList] = newStartState[action.idList].filter(task => task.id !== action.idTask);

            return newStartState
        }

        case'UPDATE-TASK-TITLE': {
            const newStartState = {
                ...state, [action.idList]: state[action.idList].map((task) => {
                    return {...task}
                })
            }
            newStartState[action.idList].map((task) => {
                if (task.id === action.idTask) task.title = action.newTitle;
            })

            return newStartState
        }

        case'UPDATE-CHECKBOX-TASK': {
            const newStartState = {
                ...state, [action.idList]: state[action.idList].map((task) => {
                    if (task.id != action.idTask) return task
                    else return {...task, status: action.status}
                })
            }

            return newStartState
        }

        case'SET-TASKS':{
            const newStartState={...state, [action.idList]:action.tasks}
            return newStartState
        }

        default:
            return state;
    }

};

export const AddTaskAC = (newTask:TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', newTask:newTask}
}
export const DelTaskAC = (idList: string, idTask: string): DelTaskActionType => {
    return {type: 'DEL-TASK', idList: idList, idTask: idTask}
}
export const UpdateTaskTitleAC = (idList: string, idTask: string, newTitle: string): UpdateTaskTitleActionType => {
    return {type: 'UPDATE-TASK-TITLE', newTitle: newTitle, idList: idList, idTask: idTask}
}
export const UpdateCheckboxTaskAC = (idList: string, idTask: string, status: TaskStatus): UpdateCheckboxTaskActionType => {
    return {type: 'UPDATE-CHECKBOX-TASK', status: status, idList: idList, idTask: idTask}
}
export const SetTaskAC = (idList:string, tasks:Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASKS',idList:idList, tasks:tasks}
}


// type ModelDataToUpdateType={
//     title?: string
//     description?: string
//     completed?: boolean
//     status?: TaskStatus
//     priority?: TaskPriority
//     startDate?: string
//     deadline?: string
// }

export const fetchTaskTC=(idList:string)=>{
    return (dispatch: Dispatch)=>{
        toDoListsAPI.getTasks(idList)
            .then(res=>{
                dispatch(SetTaskAC(idList, res.data.items))
            })
    }
}
export const delTaskTC=(idList:string, idTask: string)=>{
    return (dispatch: Dispatch)=>{
        toDoListsAPI.deleteTask(idList, idTask)
            .then(res=>{
                dispatch(DelTaskAC(idList, idTask))
            })
    }
}
export const updateTitleTaskTC=(idList:string, idTask: string, title: string)=>{
    return (dispatch: Dispatch, getState:()=>AppRootState)=>{
        const task=getState().tasks[idList].find((task)=>task.id===idTask)
        if(!task){
            throw new Error('undefined task in state')
            return
        }


        const DataToUpdate:DataToUpdateType={
            title: title,
            status: task.status,
            priority: task.priority,
        }

        toDoListsAPI.updateTask(idList, idTask, DataToUpdate)
            .then(res=>{
                dispatch(UpdateTaskTitleAC(idList, idTask, title))
            })
    }
}
export const updateStatusTaskTC=(idList:string, idTask: string, status: TaskStatus)=>{
    return (dispatch: Dispatch, getState:()=>AppRootState)=>{
        const task=getState().tasks[idList].find((task)=>task.id===idTask)
        if(!task){
            throw new Error('undefined task in state')
            return
        }


        const DataToUpdate:DataToUpdateType={
            title: task.title,
            status: status,
            priority: task.priority,
        }

        toDoListsAPI.updateTask(idList, idTask, DataToUpdate)
            .then(res=>{
                dispatch(UpdateCheckboxTaskAC(idList, idTask, status))
            })
    }
}
export const addTaskTC=(idList:string, title: string)=>{
    return (dispatch: Dispatch)=>{
        toDoListsAPI.createTask(idList, title)
            .then(res=>{
                dispatch(AddTaskAC(res.data.data.item))
            })
    }
}
