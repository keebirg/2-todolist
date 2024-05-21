import {v1} from "uuid";
import {
    AddListActionType,
    DelListActionType,
    idToDoList1,
    idToDoList2,
    idToDoList3
} from "./todolists-reducer";
import {TaskPriority, TaskStatus, TaskType} from "../api/toDoLists-api";


type AddTaskActionType = {
    type: 'ADD-TASK'
    idList: string
    newTitleTask: string
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


type actionType =
    AddTaskActionType
    | DelTaskActionType
    | UpdateTaskTitleActionType
    | UpdateCheckboxTaskActionType
    | AddListActionType
    | DelListActionType


export type ToDoListTasksType = {
    [key: string]: Array<TaskType>
}

let initialState: ToDoListTasksType = {
    [idToDoList1]: [
        {todoListId: idToDoList1, id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
        {todoListId: idToDoList1, id: v1(), title: "HTML", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
        {todoListId: idToDoList1, id: v1(), title: "REACT", status: TaskStatus.New, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
    ],
    [idToDoList2]: [
        {todoListId: idToDoList2, id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
        {todoListId: idToDoList2, id: v1(), title: "HTML", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
        {todoListId: idToDoList2, id: v1(), title: "REACT", status: TaskStatus.New, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
    ],
    [idToDoList3]: [
        {todoListId: idToDoList3, id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
        {todoListId: idToDoList3, id: v1(), title: "HTML", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
        {todoListId: idToDoList3, id: v1(), title: "REACT", status: TaskStatus.New, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
    ],
}

export const tasksReducer = (state: ToDoListTasksType = initialState, action: actionType): ToDoListTasksType => {

    switch (action.type) {

        case'ADD-LIST': {
            const newStartState = {...state}

            newStartState[action.idList] = [
                {todoListId: action.idList, id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
                {todoListId: action.idList, id: v1(), title: "HTML", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
                {todoListId: action.idList, id: v1(), title: "REACT", status: TaskStatus.New, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low },
            ];

            return newStartState
        }
        case'DEL-LIST': {
            const newStartState = {...state}
            delete newStartState[action.idList];

            return newStartState
        }
        case'ADD-TASK': {
            let newTask = {todoListId: action.idList, id: v1(), title: action.newTitleTask, status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low };
            const newStartState = {...state, [action.idList]: [...state[action.idList]]};
            newStartState[action.idList].push(newTask);

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
            // const newStartState = {
            //     ...state, [action.idList]: state[action.idList].map((task) => {
            //         return {...task}
            //     })
            // }
            // newStartState[action.idList].map((task) => {
            //     if (task.id === action.idTask) task.isCheck = action.isCheck;
            // })
            const newStartState = {
                ...state, [action.idList]: state[action.idList].map((task) => {
                    if (task.id != action.idTask) return task
                    else return {...task, status:action.status}
                })
            }

            return newStartState
        }


        default:
            return state;
    }

};

export const AddTaskAC = (idList: string, newTitleTask: string): AddTaskActionType => {
    return {type: 'ADD-TASK', idList: idList, newTitleTask: newTitleTask}
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


