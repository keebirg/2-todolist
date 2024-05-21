import {v1} from "uuid";
import {
    ToDoListsDataType,
    todolistsReducer,
    UpdateFilterAC,
    UpdateListTitleAC
} from "./todolists-reducer";



const idToDoList1 = v1();
const idToDoList2 = v1();

const startState: Array<ToDoListsDataType> = [
    {id: idToDoList1, title: "Job1", filter: "All", addedDate:"", order: 0},
    {id: idToDoList2, title: "Job2", filter: "Active", addedDate:"", order: 0},
]


test('correct todoList filterUpdate', () => {
    const action=UpdateFilterAC(idToDoList1, "Active" )
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("Active")

});

test('correct todoList updateListTitle', () => {
    const action=UpdateListTitleAC(idToDoList1, "AAA" )
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("AAA")
});


test('correct start data', () => {
    expect(startState.length).toBe(2);
    expect(startState[0].title).toBe("Job1");
    expect(startState[1].title).toBe("Job2");
    expect(startState[0].filter).toBe("All")
});