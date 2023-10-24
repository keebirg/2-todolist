import {
    FilterTypes,
    ToDoListsDataType,
    toDoListsTasksType
} from "../components/ToDoLists";
import {v1} from "uuid";

type todolistsReducerType = [
    Array<ToDoListsDataType>,
    toDoListsTasksType
]

type AddListActionType = {
    type: 'ADD-LIST'
    titleList: string
}
type DelListActionType = {
    type: 'DEL-LIST'
    idList: string
}
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
type UpdateFilterActionType = {
    type: 'FILTER-UPDATE'
    idList: string
    filter: FilterTypes
}
type UpdateTaskTitleActionType = {
    type: 'UPDATE-TASK-TITLE'
    idList: string
    idTask: string
    newTitle: string
}
type UpdateListTitleActionType = {
    type: 'UPDATE-LIST-TITLE'
    idList: string
    newTitle: string
}
type UpdateCheckboxTaskActionType = {
    type: 'UPDATE-CHECKBOX-TASK'
    idList: string
    idTask: string
    isCheck: boolean
}

type actionType =
    AddListActionType
    | DelListActionType
    | AddTaskActionType
    | DelTaskActionType
    | UpdateFilterActionType
    | UpdateTaskTitleActionType
    | UpdateListTitleActionType
    | UpdateCheckboxTaskActionType

export const todolistsReducer = (state: todolistsReducerType, action: actionType): todolistsReducerType => {

    const [startState1, startState2] = state

    switch (action.type) {
        case'ADD-LIST': {
            const newStartState1 = [...startState1]
            const newStartState2 = {...startState2}

            const idToDoList = v1();

            newStartState1.push({id: idToDoList, title: action.titleList, filter: "All"});
            newStartState2[idToDoList] = [
                {id: v1(), title: "js", isCheck: true},
                {id: v1(), title: "HTML/CSS", isCheck: true},
                {id: v1(), title: "REACT", isCheck: false},
            ];
            return [newStartState1, newStartState2]
        }
        case'DEL-LIST': {
            const newStartState1 = startState1.filter((data) => data.id !== action.idList);
            const newStartState2 = {...startState2};

            delete newStartState2[action.idList];

            return [newStartState1, newStartState2]
        }
        case'ADD-TASK': {
            let newTask = {id: v1(), title: action.newTitleTask, isCheck: false};
            const newStartState2 = {...startState2, [action.idList]: [...startState2[action.idList]]};
            newStartState2[action.idList].push(newTask);

            return [startState1, newStartState2]
        }
        case'DEL-TASK': {
            const newStartState2 = {...startState2};
            newStartState2[action.idList] = newStartState2[action.idList].filter(task => task.id !== action.idTask);

            return [startState1, newStartState2]
        }
        case'FILTER-UPDATE': {
            const newStartState1 = startState1.map((data) => {
                return {...data}
            })

            newStartState1.map((data) => {
                if (data.id === action.idList) data.filter = action.filter
            })


            return [newStartState1, startState2]
        }
        case'UPDATE-TASK-TITLE': {
            const newStartState2 = {
                ...startState2, [action.idList]: startState2[action.idList].map((task) => {
                    return {...task}
                })
            }
            newStartState2[action.idList].map((task) => {
                if (task.id === action.idTask) task.title = action.newTitle;
            })

            return [startState1, newStartState2]
        }
        case'UPDATE-LIST-TITLE': {
            const newStartState1 = startState1.map((data) => {
                return {...data}
            })

            newStartState1.map((list) => {
                if (list.id === action.idList) list.title = action.newTitle;
            })

            return [newStartState1, startState2]
        }
        case'UPDATE-CHECKBOX-TASK': {
            const newStartState2 = {
                ...startState2, [action.idList]: startState2[action.idList].map((task) => {
                    return {...task}
                })
            }

            newStartState2[action.idList].map((task) => {
                if (task.id === action.idTask) task.isCheck = action.isCheck;
            })

            return [startState1, newStartState2]
        }


        default:
            throw new Error("Don't understand this type")
    }
};

