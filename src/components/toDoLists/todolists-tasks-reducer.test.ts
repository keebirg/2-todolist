import {v1} from "uuid";

import {
    AddListAC,
    DelListAC, SetToDoListsAC, ToDoListAppType,
    toDoListsReducer
} from "./todolists-reducer";
import {tasksReducer, ToDoListTasksType} from "../task/tasks-reducer";
import {TaskPriority, TaskStatus} from "../../api/toDoLists-api";

const idToDoList1 = v1();
const idToDoList2 = v1();


const startStateList: Array<ToDoListAppType> = [
    {id: idToDoList1, title: "Job1", filter: "All", addedDate:"", order: 0, disabled:false},
    {id: idToDoList2, title: "Job2", filter: "Active", addedDate:"", order: 0, disabled:false},
]

const startStateTasks: ToDoListTasksType = {
    [idToDoList1]: [
        {todoListId: idToDoList1, id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
        {todoListId: idToDoList1, id: v1(), title: "HTML", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
        {todoListId: idToDoList1, id: v1(), title: "REACT", status: TaskStatus.New, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
    ],
    [idToDoList2]: [
        {todoListId: idToDoList2, id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
        {todoListId: idToDoList2, id: v1(), title: "HTML", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low , disabled:false},
        {todoListId: idToDoList2, id: v1(), title: "REACT", status: TaskStatus.New, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
    ],
}


test('correct todoList addList', () => {

    const action = AddListAC({newToDoList:{id: v1(), title: 'AAA', addedDate:"", order: 0}})

    const endStateList = toDoListsReducer(startStateList, action)
    const endStateTask = tasksReducer(startStateTasks, action)

    expect(endStateList.length).toBe(3);
    expect(Object.keys(endStateTask).length).toBe(3);
    expect(endStateList[2].title).toBe('AAA');

});

test('correct todoList delList', () => {
    const action= DelListAC({idList:idToDoList1})

    const endStateList = toDoListsReducer(startStateList, action)
    const endStateTask = tasksReducer(startStateTasks, action)


    expect(endStateList.length).toBe(1);
    expect(Object.keys(endStateTask).length).toBe(1);
    expect(endStateList[0].title).toBe('Job2');

});

test('correct set todoList', () => {

    const action=SetToDoListsAC({toDoLists:startStateList})
    const endStateList = toDoListsReducer([], action)
    const endStateTask = tasksReducer({}, action)

    expect(endStateList.length).toBe(2)
    expect(endStateTask[idToDoList1]).toStrictEqual([])
    expect(endStateTask[idToDoList2]).toStrictEqual([])
});


