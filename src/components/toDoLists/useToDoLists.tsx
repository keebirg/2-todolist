import {useDispatch, useSelector} from "react-redux";
import {AppRootState, AppThunkDispatch} from "../../state/store";
import {useCallback, useEffect} from "react";
import {
    addToDoListTC, fetchToDoListsTC,
    ToDoListAppType,
} from "./todolists-reducer";
import {ToDoListTasksType} from "../task/tasks-reducer";
import {useNavigate} from "react-router-dom";


export const useToDoLists=()=>{
    const dispatch: AppThunkDispatch = useDispatch();
    const toDoListsPrimaryData = useSelector<AppRootState, Array<ToDoListAppType>>(state => state.todolists)
    const toDoListsTasks = useSelector<AppRootState, ToDoListTasksType>(state => state.tasks)
    const isLoggedIn=useSelector<AppRootState, boolean>(state=>state.app.isLoggedIn)
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchToDoListsTC())
    },[])


    const addList = useCallback(
        (titleList: string) => {
            dispatch(addToDoListTC(titleList))
        }, [])


    return {
        toDoListsPrimaryData,
        toDoListsTasks,
        addList,
        isLoggedIn,
        navigate,
    }
}