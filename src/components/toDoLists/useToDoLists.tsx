import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {ToDoListsDataType} from "./ToDoLists";
import {toDoListsTasksType} from "../../state/tasks-reducer";
import {useCallback} from "react";
import {AddListAC, DelListAC, UpdateFilterAC, UpdateListTitleAC} from "../../state/todolists-reducer";

export const useToDoLists=()=>{
    const dispatch = useDispatch()
    const toDoListsPrimaryData = useSelector<AppRootState, Array<ToDoListsDataType>>(state => state.todolists)
    const toDoListsTasks = useSelector<AppRootState, toDoListsTasksType>(state => state.tasks)



    const addList = useCallback(
        (titleList: string) => {
            dispatch(AddListAC(titleList))
        }, [dispatch])


    return {
        toDoListsPrimaryData,
        toDoListsTasks,
        addList
    }
}