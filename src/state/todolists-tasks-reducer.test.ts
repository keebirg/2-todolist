import {v1} from "uuid";

import {
    AddListAC,
    DelListAC, SetToDoListsAC, ToDoListAppType,
    todolistsReducer
} from "./todolists-reducer";
import {tasksReducer, ToDoListTasksType} from "./tasks-reducer";
import {TaskPriority, TaskStatus} from "../api/toDoLists-api";

const idToDoList1 = v1();
const idToDoList2 = v1();


const startStateList: Array<ToDoListAppType> = [
    {id: idToDoList1, title: "Job1", filter: "All", addedDate:"", order: 0},
    {id: idToDoList2, title: "Job2", filter: "Active", addedDate:"", order: 0},
]

const startStateTasks: ToDoListTasksType = {
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
}


test('correct todoList addList', () => {

    const action = AddListAC({id: v1(), title: 'AAA', addedDate:"", order: 0})

    const endStateList = todolistsReducer(startStateList, action)
    const endStateTask = tasksReducer(startStateTasks, action)

    expect(endStateList.length).toBe(3);
    expect(Object.keys(endStateTask).length).toBe(2);
    expect(endStateList[2].title).toBe('AAA');

});

test('correct todoList delList', () => {
    const action= DelListAC(idToDoList1)

    const endStateList = todolistsReducer(startStateList, action)
    const endStateTask = tasksReducer(startStateTasks, action)


    expect(endStateList.length).toBe(1);
    expect(Object.keys(endStateTask).length).toBe(1);
    expect(endStateList[0].title).toBe('Job2');

});

test('correct set todoList', () => {

    const action=SetToDoListsAC(startStateList)
    const endStateList = todolistsReducer([], action)
    const endStateTask = tasksReducer({}, action)

    expect(endStateList.length).toBe(2)
    expect(endStateTask[idToDoList1]).toStrictEqual([])
    expect(endStateTask[idToDoList2]).toStrictEqual([])
});


