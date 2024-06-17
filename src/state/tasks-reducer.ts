import {
    AddListActionType,
    DelListActionType,
    SetToDoListsActionType
} from "./todolists-reducer";
import {DataToUpdateType, TaskStatus, TaskTypeAPI, toDoListsAPI} from "../api/toDoLists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";
import {setErrorAC, setStatusAC} from "./app-reducer";


export const tasksReducer = (state: ToDoListTasksType = {}, action: ActionType): ToDoListTasksType => {

    switch (action.type) {

        case'ADD-LIST':  return {...state, [action.newToDoList.id]: []}


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
            newStartState[action.newTask.todoListId].push({...action.newTask, disabled:false});

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
        case'UPDATE-DISABLED-TASK': {
            const newStartState = {
                ...state, [action.idList]: state[action.idList].map((task) => {
                    if (task.id != action.idTask) return task
                    else return {...task, disabled: action.disabled}
                })
            }

            return newStartState
        }

        case'SET-TASKS': {
            const newStartState = {...state, [action.idList]: action.tasks.map((task)=>({...task, disabled: false}))}
            return newStartState
        }

        default:
            return state;
    }

};

export const AddTaskAC = (newTask: TaskTypeAPI) => {
    return {type: 'ADD-TASK', newTask: newTask} as const
}
export const DelTaskAC = (idList: string, idTask: string) => {
    return {type: 'DEL-TASK', idList: idList, idTask: idTask} as const
}
export const UpdateTaskTitleAC = (idList: string, idTask: string, newTitle: string) => {
    return {type: 'UPDATE-TASK-TITLE', newTitle: newTitle, idList: idList, idTask: idTask} as const
}
export const UpdateCheckboxTaskAC = (idList: string, idTask: string, status: TaskStatus) => {
    return {type: 'UPDATE-CHECKBOX-TASK', status: status, idList: idList, idTask: idTask} as const
}
export const UpdateDisabledTaskAC = (idList: string, idTask: string, disabled: boolean) => {
    return {type: 'UPDATE-DISABLED-TASK', idList: idList, idTask: idTask, disabled: disabled} as const
}
export const SetTaskAC = (idList: string, tasks: Array<TaskTypeAPI>) => {
    return {type: 'SET-TASKS', idList: idList, tasks: tasks} as const
}


export const fetchTaskTC = (idList: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        toDoListsAPI.getTasks(idList)
            .then(res => {
                dispatch(setStatusAC('idle'))
                dispatch(SetTaskAC(idList, res.data.items))
            })
            .catch(error=>{
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}
export const delTaskTC = (idList: string, idTask: string) => {
    return (dispatch: Dispatch) => {
        dispatch(UpdateDisabledTaskAC(idList, idTask, true))
        dispatch(setStatusAC('loading'))
        toDoListsAPI.deleteTask(idList, idTask)
            .then(res => {
                dispatch(setStatusAC('idle'))
                dispatch(DelTaskAC(idList, idTask))
            })
            .catch(error=>{
                dispatch(UpdateDisabledTaskAC(idList, idTask, false))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}
export const updateTitleTaskTC = (idList: string, idTask: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        dispatch(UpdateDisabledTaskAC(idList, idTask, true))
        dispatch(setStatusAC('loading'))
        const task = getState().tasks[idList].find((task) => task.id === idTask)
        if (!task) {
            throw new Error('undefined task in state')
            return
        }


        const DataToUpdate: DataToUpdateType = {
            title: title,
            status: task.status,
            priority: task.priority,
        }

        toDoListsAPI.updateTask(idList, idTask, DataToUpdate)
            .then(res => {
                dispatch(setStatusAC('idle'))
                dispatch(UpdateDisabledTaskAC(idList, idTask, false))
                dispatch(UpdateTaskTitleAC(idList, idTask, title))
            })
            .catch(error=>{
                dispatch(UpdateDisabledTaskAC(idList, idTask, false))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}
export const updateStatusTaskTC = (idList: string, idTask: string, status: TaskStatus) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        dispatch(UpdateDisabledTaskAC(idList, idTask, true))
        dispatch(setStatusAC('loading'))
        const task = getState().tasks[idList].find((task) => task.id === idTask)
        if (!task) {
            throw new Error('undefined task in state')
            return
        }

        const DataToUpdate: DataToUpdateType = {
            title: task.title,
            status: status,
            priority: task.priority,
        }

        toDoListsAPI.updateTask(idList, idTask, DataToUpdate)
            .then(res => {
                dispatch(setStatusAC('idle'))
                dispatch(UpdateDisabledTaskAC(idList, idTask, false))
                dispatch(UpdateCheckboxTaskAC(idList, idTask, status))
            })
            .catch(error=>{
                dispatch(UpdateDisabledTaskAC(idList, idTask, false))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}
export const addTaskTC = (idList: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        toDoListsAPI.createTask(idList, title)
            .then(res => {
                dispatch(setStatusAC('idle'))
                if (res.data.resultCode === 0) {
                    dispatch(AddTaskAC(res.data.data.item))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('error addTaskTC'))
                }
            })
            .catch(error=>{
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC('idle'))
            })
    }
}

export type TaskType = TaskTypeAPI & {
    disabled: boolean
}

export type ToDoListTasksType = {
    [key: string]: Array<TaskType>
}
type AddTaskActionType = ReturnType<typeof AddTaskAC>
type DelTaskActionType = ReturnType<typeof DelTaskAC>
type UpdateTaskTitleActionType = ReturnType<typeof UpdateTaskTitleAC>
type UpdateCheckboxTaskActionType = ReturnType<typeof UpdateCheckboxTaskAC>
type UpdateDisabledTaskActionType = ReturnType<typeof UpdateDisabledTaskAC>
type SetTasksActionType = ReturnType<typeof SetTaskAC>


type ActionType =
    AddTaskActionType
    | DelTaskActionType
    | UpdateTaskTitleActionType
    | UpdateCheckboxTaskActionType
    | AddListActionType
    | DelListActionType
    | SetToDoListsActionType
    | SetTasksActionType
    | UpdateDisabledTaskActionType