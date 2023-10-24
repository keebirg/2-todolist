import {v1} from "uuid";
import {todolistsReducer} from "./todolists-reducer";
import {
    ToDoListsDataType,
    toDoListsTasksType
} from "../components/ToDoLists";


const idToDoList1 = v1();
const idToDoList2 = v1();

const startState1: Array<ToDoListsDataType> = [
    {id: idToDoList1, title: "Job1", filter: "All"},
    {id: idToDoList2, title: "Job2", filter: "Active"},
]

const startState2: toDoListsTasksType = {
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
    const [endState1, endState2] = todolistsReducer([startState1, startState2], {type: 'ADD-LIST', titleList: 'AAA'})

    expect(endState1.length).toBe(3);
    expect(Object.keys(endState2).length).toBe(3);
    expect(endState1[2].title).toBe('AAA');

});

test('correct todoList delList', () => {
    const [endState1, endState2] = todolistsReducer([startState1, startState2], {type: 'DEL-LIST', idList: idToDoList1})

    expect(endState1.length).toBe(1);
    expect(Object.keys(endState2).length).toBe(1);
    expect(endState1[0].title).toBe('Job2');

});

test('correct todoList addTask', () => {
    const [endState1, endState2] = todolistsReducer([startState1, startState2], {
        type: 'ADD-TASK',
        idList: idToDoList1,
        newTitleTask: 'AAA'
    })

    expect(endState1.length).toBe(2);
    expect(Object.keys(endState2).length).toBe(2);
    expect(endState2[idToDoList1].length).toBe(4);
    expect(endState2[idToDoList1][3].title).toBe('AAA');

});

test('correct todoList delTask', () => {
    const [endState1, endState2] = todolistsReducer([startState1, startState2], {
        type: 'DEL-TASK',
        idList: idToDoList1,
        idTask: startState2[idToDoList1][0].id
    })

    expect(startState2[idToDoList1][0].title).toBe("js")
    expect(endState1.length).toBe(2);
    expect(Object.keys(endState2).length).toBe(2);
    expect(endState2[idToDoList1].length).toBe(2);
    expect(endState2[idToDoList1][0].title).toBe('HTML/CSS');


});

test('correct todoList filterUpdate', () => {
    const [endState1, endState2] = todolistsReducer([startState1, startState2], {
        type: 'FILTER-UPDATE',
        idList: idToDoList1,
        filter: "Active"
    })

    expect(endState1[0].filter).toBe("Active")

});

test('correct todoList updateTaskTitle', () => {
    const [endState1, endState2] = todolistsReducer([startState1, startState2], {
        type: 'UPDATE-TASK-TITLE',
        idList: idToDoList1,
        idTask: startState2[idToDoList1][0].id,
        newTitle: "AAA"
    })

    expect(endState2[idToDoList1][0].title).toBe("AAA")
});

test('correct todoList updateListTitle', () => {
    const [endState1, endState2] = todolistsReducer([startState1, startState2], {
        type: 'UPDATE-LIST-TITLE',
        idList: idToDoList1,
        newTitle: "AAA"
    })

    expect(endState1[0].title).toBe("AAA")
});

test('correct todoList updateCheckboxTask', () => {
    const [endState1, endState2] = todolistsReducer([startState1, startState2], {
        type: 'UPDATE-CHECKBOX-TASK',
        idList: idToDoList1,
        idTask: startState2[idToDoList1][0].id,
        isCheck:false
    })

    expect(endState2[idToDoList1][0].isCheck).toBe(false)
});



test('correct start data', () => {
    expect(startState1.length).toBe(2);
    expect(startState1[0].title).toBe("Job1");
    expect(startState1[1].title).toBe("Job2");
    expect(startState1[0].filter).toBe("All")


    expect(Object.keys(startState2).length).toBe(2);
    expect(startState2[idToDoList1].length).toBe(3)
    expect(startState2[idToDoList2].length).toBe(3)
    expect(startState2[idToDoList1][0].title).toBe("js")
    expect(startState2[idToDoList1][1].title).toBe("HTML/CSS")
    expect(startState2[idToDoList1][0].isCheck).toBe(true)
});