import {useDispatch, useSelector} from "react-redux";
import {AppRootState, AppThunkDispatch} from "../../state/store";
import {useCallback, useEffect} from "react";
import {
    AddListAC, addToDoListTC, fetchToDoListsTC,
    ToDoListAppType,
} from "../../state/todolists-reducer";
import {ToDoListTasksType} from "../../state/tasks-reducer";


export const useToDoLists=()=>{
    const dispatch: AppThunkDispatch = useDispatch();
    const toDoListsPrimaryData = useSelector<AppRootState, Array<ToDoListAppType>>(state => state.todolists)
    const toDoListsTasks = useSelector<AppRootState, ToDoListTasksType>(state => state.tasks)


    useEffect(()=>{
        dispatch(fetchToDoListsTC())
    },[])


    const addList = useCallback(
        (titleList: string) => {
            dispatch(addToDoListTC(titleList))
        }, [dispatch])


    return {
        toDoListsPrimaryData,
        toDoListsTasks,
        addList
    }
}