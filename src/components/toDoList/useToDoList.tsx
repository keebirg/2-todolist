import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {AddTaskAC} from "../../state/tasks-reducer";
import {DelListAC, FilterTypes, UpdateFilterAC, UpdateListTitleAC} from "../../state/todolists-reducer";
import {TaskStatus, TaskType} from "../../api/toDoLists-api";

export const useToDoList=(idList:string, filter:FilterTypes, toDoListsTasks:Array<TaskType>)=>{

    const dispatch = useDispatch()

    let tasks;
    switch (filter) {
        case "Completed":
            tasks = toDoListsTasks.filter((task) => task.status==TaskStatus.Completed);
            break;
        case "Active":
            tasks = toDoListsTasks.filter((task) => task.status==TaskStatus.New);
            break;
        case "All":
            tasks = toDoListsTasks;
            break;
    }

    const addTask = useCallback((newTitleTask: string) => {
        dispatch(AddTaskAC(idList, newTitleTask))
    }, [dispatch])

    const filterClick = useCallback(
        (filter: FilterTypes) => {
            dispatch(UpdateFilterAC(idList, filter))
        }, [dispatch])

    const delList = useCallback(
        () => {
            dispatch(DelListAC(idList))
        }, [dispatch])

    const updateListTitle = useCallback(
        (newTitle: string) => {
            dispatch(UpdateListTitleAC(idList, newTitle))
        }, [dispatch])

    const onAllClickHandler = useCallback(() => filterClick( "All"), []);
    const onActiveClickHandler = useCallback(() =>filterClick("Active"), []);
    const onCompletedClickHandler = useCallback(() =>filterClick("Completed"), []);

    return{
        tasks,
        addTask,
        updateListTitle,
        delList,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
    }
}