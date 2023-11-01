import {
    toDoListsTasksType
} from "../components/ToDoLists";
import {v1} from "uuid";
import {
    AddListActionType,
    DelListActionType
} from "./todolists-reducer";


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
    isCheck: boolean
}


type actionType =
    AddTaskActionType
    | DelTaskActionType
    | UpdateTaskTitleActionType
    | UpdateCheckboxTaskActionType
    | AddListActionType
    | DelListActionType

export const taskReducer = (state: toDoListsTasksType, action: actionType): toDoListsTasksType => {

    const startState = state

    switch (action.type) {

        case'ADD-LIST': {
            const newStartState = {...startState}

            newStartState[action.idList] = [
                {id: v1(), title: "js", isCheck: true},
                {id: v1(), title: "HTML/CSS", isCheck: true},
                {id: v1(), title: "REACT", isCheck: false},
            ];

            return newStartState
        }
        case'DEL-LIST': {
            const newStartState = {...startState}
            delete newStartState[action.idList];

            return newStartState
        }
        case'ADD-TASK': {
            let newTask = {id: v1(), title: action.newTitleTask, isCheck: false};
            const newStartState = {...startState, [action.idList]: [...startState[action.idList]]};
            newStartState[action.idList].push(newTask);

            return newStartState
        }
        case'DEL-TASK': {
            const newStartState = {...startState};
            newStartState[action.idList] = newStartState[action.idList].filter(task => task.id !== action.idTask);

            return newStartState
        }

        case'UPDATE-TASK-TITLE': {
            const newStartState = {
                ...startState, [action.idList]: startState[action.idList].map((task) => {
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
                ...startState, [action.idList]: startState[action.idList].map((task) => {
                    return {...task}
                })
            }

            newStartState[action.idList].map((task) => {
                if (task.id === action.idTask) task.isCheck = action.isCheck;
            })

            return newStartState
        }


        default:
            throw new Error("Don't understand this type")
    }

};

export const AddTaskAC = (idList: string, newTitleTask: string): AddTaskActionType => {
    return {type: 'ADD-TASK', idList: idList, newTitleTask: newTitleTask}
}
export const DelTaskAC = (idList: string, idTask: string): DelTaskActionType => {
    return {type: 'DEL-TASK', idList: idList, idTask: idTask}
}
export const UpdateTaskTitleAC = (newTitle: string, idList: string, idTask: string): UpdateTaskTitleActionType => {
    return {type: 'UPDATE-TASK-TITLE', newTitle: newTitle, idList: idList, idTask: idTask}
}
export const UpdateCheckboxTaskAC = (isCheck: boolean, idList: string, idTask: string): UpdateCheckboxTaskActionType => {
    return {type: 'UPDATE-CHECKBOX-TASK', isCheck: isCheck, idList: idList, idTask: idTask}
}


