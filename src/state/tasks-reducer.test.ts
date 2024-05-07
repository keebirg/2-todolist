import {v1} from "uuid";
import {
    AddTaskAC,
    DelTaskAC,
    tasksReducer, toDoListsTasksType,
    UpdateCheckboxTaskAC,
    UpdateTaskTitleAC
} from "./tasks-reducer";


const idToDoList1 = v1();
const idToDoList2 = v1();

const startState: toDoListsTasksType = {
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



test('correct todoList addTask', () => {
    const action=AddTaskAC(idToDoList1, 'AAA')
    const endState= tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(2);
    expect(endState[idToDoList1].length).toBe(4);
    expect(endState[idToDoList1][3].title).toBe('AAA');

});

test('correct todoList delTask', () => {
    const action=DelTaskAC(idToDoList1, startState[idToDoList1][0].id)
    const endState= tasksReducer(startState, action)

    expect(startState[idToDoList1][0].title).toBe("js")
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[idToDoList1].length).toBe(2);
    expect(endState[idToDoList1][0].title).toBe('HTML/CSS');

});


test('correct todoList updateTaskTitle', () => {
    const action=UpdateTaskTitleAC( idToDoList1, startState[idToDoList1][0].id, "AAA")
    const endState= tasksReducer(startState, action)

    expect(endState[idToDoList1][0].title).toBe("AAA")
});



test('correct todoList updateCheckboxTask', () => {
    const action=UpdateCheckboxTaskAC(idToDoList1, startState[idToDoList1][0].id, false)
    const endState = tasksReducer(startState, action)

    expect(endState[idToDoList1][0].isCheck).toBe(false)
});



test('correct start data', () => {
    expect(Object.keys(startState).length).toBe(2);
    expect(startState[idToDoList1].length).toBe(3)
    expect(startState[idToDoList2].length).toBe(3)
    expect(startState[idToDoList1][0].title).toBe("js")
    expect(startState[idToDoList1][1].title).toBe("HTML/CSS")
    expect(startState[idToDoList1][0].isCheck).toBe(true)
});