import {v1} from "uuid";
import {
    AddTaskAC,
    DelTaskAC, SetTaskAC,
    tasksReducer, ToDoListTasksType,
    UpdateCheckboxTaskAC,
    UpdateTaskTitleAC
} from "./tasks-reducer";
import {TaskPriority, TaskStatus, TaskType} from "../api/toDoLists-api";
import {todolistsReducer} from "./todolists-reducer";


const idToDoList1 = v1();
const idToDoList2 = v1();
const idToDoList3 = v1();

const startState: ToDoListTasksType = {
    [idToDoList1]: [
        {
            todoListId: idToDoList1,
            id: v1(),
            title: "js",
            status: TaskStatus.Completed,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriority.Low
        },
        {
            todoListId: idToDoList1,
            id: v1(),
            title: "HTML",
            status: TaskStatus.Completed,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriority.Low
        },
        {
            todoListId: idToDoList1,
            id: v1(),
            title: "REACT",
            status: TaskStatus.New,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriority.Low
        },
    ],
    [idToDoList2]: [
        {
            todoListId: idToDoList2,
            id: v1(),
            title: "js",
            status: TaskStatus.Completed,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriority.Low
        },
        {
            todoListId: idToDoList2,
            id: v1(),
            title: "HTML",
            status: TaskStatus.Completed,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriority.Low
        },
        {
            todoListId: idToDoList2,
            id: v1(),
            title: "REACT",
            status: TaskStatus.New,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriority.Low
        },
    ],
}

const setStateTaskList3: Array<TaskType> = [
    {
        todoListId: idToDoList3,
        id: v1(),
        title: "js",
        status: TaskStatus.Completed,
        addedDate: '',
        deadline: '',
        order: 0,
        startDate: '',
        description: '',
        priority: TaskPriority.Low
    },
]


test('correct todoList addTask', () => {
    const newTask:TaskType={
            todoListId: idToDoList1,
            id: v1(),
            title: 'AAA',
            status: TaskStatus.Completed,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriority.Low
        }
    const action = AddTaskAC(newTask)
    const endState = tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(2);
    expect(endState[idToDoList1].length).toBe(4);
    expect(endState[idToDoList1][3].title).toBe('AAA');

});

test('correct todoList delTask', () => {
    const action = DelTaskAC(idToDoList1, startState[idToDoList1][0].id)
    const endState = tasksReducer(startState, action)

    expect(startState[idToDoList1][0].title).toBe("js")
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[idToDoList1].length).toBe(2);
    expect(endState[idToDoList1][0].title).toBe('HTML');

});


test('correct todoList updateTaskTitle', () => {
    const action = UpdateTaskTitleAC(idToDoList1, startState[idToDoList1][0].id, "AAA")
    const endState = tasksReducer(startState, action)

    expect(endState[idToDoList1][0].title).toBe("AAA")
});


test('correct todoList updateCheckboxTask', () => {
    const action = UpdateCheckboxTaskAC(idToDoList1, startState[idToDoList1][0].id, TaskStatus.New)
    const endState = tasksReducer(startState, action)

    expect(endState[idToDoList1][0].status).toBe(TaskStatus.New)
});

test('correct todoList setTasks', () => {
    const action = SetTaskAC(idToDoList3, setStateTaskList3)
    const endState = tasksReducer(startState, action)


    expect(Object.keys(endState).length).toBe(3)
});


test('correct start data', () => {
    expect(Object.keys(startState).length).toBe(2);
    expect(startState[idToDoList1].length).toBe(3)
    expect(startState[idToDoList2].length).toBe(3)
    expect(startState[idToDoList1][0].title).toBe("js")
    expect(startState[idToDoList1][1].title).toBe("HTML")
    expect(startState[idToDoList1][0].status).toBe(TaskStatus.Completed)
});

