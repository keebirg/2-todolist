import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {useCallback} from "react";
import {
    AddListAC,
    ToDoListsDataType,
} from "../../state/todolists-reducer";
import {ToDoListTasksType} from "../../state/tasks-reducer";

export const useToDoLists=()=>{
    const dispatch = useDispatch()
    const toDoListsPrimaryData = useSelector<AppRootState, Array<ToDoListsDataType>>(state => state.todolists)
    const toDoListsTasks = useSelector<AppRootState, ToDoListTasksType>(state => state.tasks)



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