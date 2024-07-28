import {v1} from "uuid";
import {
    ToDoListAppType,
    toDoListsReducer,
    UpdateFilterAC, UpdateListDisabledAC,
    UpdateListTitleAC
} from "./todolists-reducer";



const idToDoList1 = v1();
const idToDoList2 = v1();

const startState: Array<ToDoListAppType> = [
    {id: idToDoList1, title: "Job1", filter: "All", addedDate:"", order: 0, disabled:false},
    {id: idToDoList2, title: "Job2", filter: "Active", addedDate:"", order: 0, disabled:false},
]


test('correct todoList filterUpdate', () => {
    const action=UpdateFilterAC({idList:idToDoList1, filter:"Active"} )
    const endState = toDoListsReducer(startState, action)

    expect(endState[0].filter).toBe("Active")

});

test('correct todoList disabledUpdate', () => {
    const action=UpdateListDisabledAC({idList:idToDoList1, disabled:true} )
    const endState = toDoListsReducer(startState, action)

    expect(endState[0].disabled).toBe(true)
    expect(startState[0].disabled).toBe(false)

});

test('correct todoList updateListTitle', () => {
    const action=UpdateListTitleAC({idList:idToDoList1, newTitle:"AAA"} )
    const endState = toDoListsReducer(startState, action)

    expect(endState[0].title).toBe("AAA")
});




test('correct start data', () => {
    expect(startState.length).toBe(2);
    expect(startState[0].title).toBe("Job1");
    expect(startState[1].title).toBe("Job2");
    expect(startState[0].filter).toBe("All")
});

