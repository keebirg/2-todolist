import {v1} from "uuid";
import {
    ToDoListsDataType,
} from "../components/toDoLists/ToDoLists";
import {
    AddListAC,
    DelListAC,
    todolistsReducer
} from "./todolists-reducer";
import {tasksReducer, toDoListsTasksType} from "./tasks-reducer";

const idToDoList1 = v1();
const idToDoList2 = v1();


const startStateList: Array<ToDoListsDataType> = [
    {id: idToDoList1, title: "Job1", filter: "All"},
    {id: idToDoList2, title: "Job2", filter: "Active"},
]

const startStateTasks: toDoListsTasksType = {
    [idToDoList1]: [
        {id: v1(), title: "js", isCheck: true},
        {id: v1(), title: "HTML/CSS", isCheck: true},
        {id: v1(), title: "REACT", isCheck: false},
    ],
    [idToDoList2]: [
        {id: v1(), title: "js", isCheck: true},
        {id: v1(), title: "HTML/CSS", isCheck: true},
        {id: v1(), title: "REACT", isCheck: false},
    ],
}


test('correct todoList addList', () => {

    const action = AddListAC('AAA')

    const endStateList = todolistsReducer(startStateList, action)
    const endStateTask = tasksReducer(startStateTasks, action)

    expect(endStateList.length).toBe(3);
    expect(Object.keys(endStateTask).length).toBe(3);
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


