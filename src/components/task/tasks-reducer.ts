import {
    AddListAC,
    DelListAC,
    SetToDoListsAC,
} from "../toDoLists/todolists-reducer";
import {DataToUpdateType, TaskStatus, TaskTypeAPI, toDoListsAPI} from "../../api/toDoLists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../state/store";
import {setErrorAC, setStatusAC} from "../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: ToDoListTasksType = {};

const slice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        AddTaskAC(state, action: PayloadAction<{ newTask: TaskTypeAPI }>) {
            state[action.payload.newTask.todoListId].push({...action.payload.newTask, disabled: false})
        },
        DelTaskAC(state, action: PayloadAction<{ idList: string, idTask: string }>) {
            const tasks = state[action.payload.idList]
            const index = tasks.findIndex((task) => task.id === action.payload.idTask)
            tasks.splice(index, 1)
        },
        UpdateTaskTitleAC(state, action: PayloadAction<{ idList: string, idTask: string, newTitle: string }>) {
            const tasks = state[action.payload.idList]
            const index = tasks.findIndex((task) => task.id === action.payload.idTask)
            tasks[index].title = action.payload.newTitle
        },
        UpdateCheckboxTaskAC(state, action: PayloadAction<{ idList: string, idTask: string, status: TaskStatus }>) {
            const tasks = state[action.payload.idList]
            const index = tasks.findIndex((task) => task.id === action.payload.idTask)
            tasks[index].status = action.payload.status
        },
        UpdateDisabledTaskAC(state, action: PayloadAction<{ idList: string, idTask: string, disabled: boolean }>) {
            const tasks = state[action.payload.idList]
            const index = tasks.findIndex((task) => task.id === action.payload.idTask)
            tasks[index].disabled = action.payload.disabled
        },
        SetTaskAC(state, action: PayloadAction<{ idList: string, tasks: Array<TaskTypeAPI> }>) {
            state[action.payload.idList] = action.payload.tasks.map((task) => {
                return {...task, disabled: false}
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AddListAC, (state, action) => {
            state[action.payload.newToDoList.id] = [];
        })
        builder.addCase(DelListAC, (state, action) => {
            delete state[action.payload.idList];
        })
        builder.addCase(SetToDoListsAC, (state, action) => {
            action.payload.toDoLists.forEach(tdl => state[tdl.id] = [])
        })
    }
})

export const {
    AddTaskAC,
    DelTaskAC,
    UpdateTaskTitleAC,
    UpdateCheckboxTaskAC,
    UpdateDisabledTaskAC,
    SetTaskAC
} = slice.actions

export const tasksReducer = slice.reducer;


export const fetchTaskTC = (idList: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        toDoListsAPI.getTasks(idList)
            .then(res => {
                dispatch(setStatusAC({status: 'idle'}))
                dispatch(SetTaskAC({idList: idList, tasks: res.data.items}))
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}
export const delTaskTC = (idList: string, idTask: string) => {
    return (dispatch: Dispatch) => {
        dispatch(UpdateDisabledTaskAC({idList:idList, idTask:idTask, disabled:true}))
        dispatch(setStatusAC({status: 'loading'}))
        toDoListsAPI.deleteTask(idList, idTask)
            .then(res => {
                dispatch(setStatusAC({status: 'idle'}))
                dispatch(DelTaskAC({idList:idList, idTask:idTask}))
            })
            .catch(error => {
                dispatch(UpdateDisabledTaskAC({idList:idList, idTask:idTask, disabled:false}))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}
export const updateTitleTaskTC = (idList: string, idTask: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        dispatch(UpdateDisabledTaskAC({idList: idList, idTask: idTask, disabled: true}))
        dispatch(setStatusAC({status: 'loading'}))
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
                dispatch(setStatusAC({status: 'idle'}))
                dispatch(UpdateDisabledTaskAC({idList: idList, idTask: idTask, disabled: false}))
                dispatch(UpdateTaskTitleAC({idList: idList, idTask: idTask, newTitle: title}))
            })
            .catch(error => {
                dispatch(UpdateDisabledTaskAC({idList: idList, idTask: idTask, disabled: false}))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}
export const updateStatusTaskTC = (idList: string, idTask: string, status: TaskStatus) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        dispatch(UpdateDisabledTaskAC({idList:idList, idTask:idTask, disabled:true}))
        dispatch(setStatusAC({status: 'loading'}))
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
                dispatch(setStatusAC({status: 'idle'}))
                dispatch(UpdateDisabledTaskAC({idList:idList, idTask:idTask, disabled:false}))
                if (res.data.resultCode === 0) {
                    dispatch(UpdateCheckboxTaskAC({idList:idList, idTask:idTask, status:status}))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: 'error updateStatusTaskTC'}))
                }
            })
            .catch(error => {
                dispatch(UpdateDisabledTaskAC({idList:idList, idTask:idTask, disabled:false}))
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}
export const addTaskTC = (idList: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        toDoListsAPI.createTask(idList, title)
            .then(res => {
                dispatch(setStatusAC({status: 'idle'}))
                if (res.data.resultCode === 0) {
                    dispatch(AddTaskAC({newTask:res.data.data.item}))
                } else if (res.data.messages.length > 0) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: 'error addTaskTC'}))
                }
            })
            .catch(error => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC({status: 'idle'}))
            })
    }
}

export type TaskType = TaskTypeAPI & {
    disabled: boolean
}

export type ToDoListTasksType = {
    [key: string]: Array<TaskType>
}


// type AddTaskActionType = ReturnType<typeof AddTaskAC>
// type DelTaskActionType = ReturnType<typeof DelTaskAC>
// type UpdateTaskTitleActionType = ReturnType<typeof UpdateTaskTitleAC>
// type UpdateCheckboxTaskActionType = ReturnType<typeof UpdateCheckboxTaskAC>
// type UpdateDisabledTaskActionType = ReturnType<typeof UpdateDisabledTaskAC>
// type SetTasksActionType = ReturnType<typeof SetTaskAC>


// export const tasksReducer = (state: ToDoListTasksType = {}, action: ActionType): ToDoListTasksType => {
//
//     switch (action.type) {
//
//         // case'ADD-LIST':
//         //     return {...state, [action.newToDoList.id]: []}
//         //
//         //
//         // case'DEL-LIST': {
//         //     const newStartState = {...state}
//         //     delete newStartState[action.idList];
//         //
//         //     return newStartState
//         // }
//         //
//         // case "SET-TO-DO-LISTS": {
//         //     const newStartState = {...state}
//         //
//         //     action.toDoLists.forEach(tdl => {
//         //         newStartState[tdl.id] = [x];
//         //     })
//         //
//         //     return newStartState
//         // }
//
//         case'ADD-TASK': {
//             const newStartState = {...state, [action.newTask.todoListId]: [...state[action.newTask.todoListId]]};
//             newStartState[action.newTask.todoListId].push({...action.newTask, disabled: false});
//
//             return newStartState
//         }
//         case'DEL-TASK': {
//             const newStartState = {...state};
//             newStartState[action.idList] = newStartState[action.idList].filter(task => task.id !== action.idTask);
//
//             return newStartState
//         }
//
//         case'UPDATE-TASK-TITLE': {
//             const newStartState = {
//                 ...state, [action.idList]: state[action.idList].map((task) => {
//                     return {...task}
//                 })
//             }
//             newStartState[action.idList].map((task) => {
//                 if (task.id === action.idTask) task.title = action.newTitle;
//             })
//
//             return newStartState
//         }
//
//         case'UPDATE-CHECKBOX-TASK': {
//             return {
//                 ...state, [action.idList]: state[action.idList].map((task) => {
//                     if (task.id != action.idTask) return task
//                     else return {...task, status: action.status}
//                 })
//             }
//
//
//         }
//         case'UPDATE-DISABLED-TASK': {
//             return {
//                 ...state, [action.idList]: state[action.idList].map((task) => {
//                     if (task.id != action.idTask) return task
//                     else return {...task, disabled: action.disabled}
//                 })
//             }
//
//         }
//
//         case'SET-TASKS': {
//             return {...state, [action.idList]: action.tasks.map((task) => ({...task, disabled: false}))}
//         }
//
//         default:
//             return state;
//     }
//
// };

// export const AddTaskAC = (newTask: TaskTypeAPI) => {
//     return {type: 'ADD-TASK', newTask: newTask} as const
// }
// export const DelTaskAC = (idList: string, idTask: string) => {
//     return {type: 'DEL-TASK', idList: idList, idTask: idTask} as const
// }
// export const UpdateTaskTitleAC = (idList: string, idTask: string, newTitle: string) => {
//     return {type: 'UPDATE-TASK-TITLE', newTitle: newTitle, idList: idList, idTask: idTask} as const
// }
// export const UpdateCheckboxTaskAC = (idList: string, idTask: string, status: TaskStatus) => {
//     return {type: 'UPDATE-CHECKBOX-TASK', status: status, idList: idList, idTask: idTask} as const
// }
// export const UpdateDisabledTaskAC = (idList: string, idTask: string, disabled: boolean) => {
//     return {type: 'UPDATE-DISABLED-TASK', idList: idList, idTask: idTask, disabled: disabled} as const
// }
// export const SetTaskAC = (idList: string, tasks: Array<TaskTypeAPI>) => {
//     return {type: 'SET-TASKS', idList: idList, tasks: tasks} as const
// }


// type ActionType =
//     AddTaskActionType
//     | DelTaskActionType
//     | UpdateTaskTitleActionType
//     | UpdateCheckboxTaskActionType
//     | AddListActionType
//     | DelListActionType
//     | SetToDoListsActionType
//     | SetTasksActionType
//     | UpdateDisabledTaskActionType