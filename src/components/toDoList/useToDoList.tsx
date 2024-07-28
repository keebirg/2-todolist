import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import {addTaskTC, fetchTaskTC, TaskType} from "../task/tasks-reducer";
import {
    delToDoListTC,
    FilterTypes,
    UpdateFilterAC,
    updateToDoListTC
} from "../toDoLists/todolists-reducer";
import {TaskStatus} from "../../api/toDoLists-api";
import {AppThunkDispatch} from "../../state/store";

export const useToDoList=(idList:string, filter:FilterTypes, toDoListsTasks:Array<TaskType>)=>{

    const dispatch: AppThunkDispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchTaskTC(idList))
    },[])

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
        dispatch(addTaskTC(idList, newTitleTask))
    }, [dispatch])

    const filterClick = useCallback(
        (filter: FilterTypes) => {
            dispatch(UpdateFilterAC({idList:idList, filter:filter}))
        }, [dispatch])

    const delList = useCallback(
        () => {
            dispatch(delToDoListTC(idList))
        }, [dispatch])

    const updateListTitle = useCallback(
        (newTitle: string) => {
            dispatch(updateToDoListTC(idList, newTitle))
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