import {ChangeEvent, useCallback, useEffect} from "react";
import {
    DelTaskAC,
    delTaskTC,
    fetchTaskTC,
    UpdateCheckboxTaskAC,
    updateTitleTaskTC,
    UpdateTaskTitleAC, updateStatusTaskTC
} from "../../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatus} from "../../api/toDoLists-api";
import {AppThunkDispatch} from "../../state/store";


export const useTask = (idList: string, idTask: string) => {

    const dispatch: AppThunkDispatch = useDispatch();



    const delTask = useCallback(() => {
        dispatch(delTaskTC(idList, idTask))
    }, [dispatch])

    const updateTaskTitle = useCallback((newTitle: string) => {
        dispatch(updateTitleTaskTC(idList, idTask, newTitle))
    }, [dispatch])

    const onChangeCheckBox = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateStatusTaskTC(idList, idTask, event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New))
    }, [dispatch])

    return {
        delTask,
        updateTaskTitle,
        onChangeCheckBox
    }
}