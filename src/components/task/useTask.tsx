import {ChangeEvent, useCallback} from "react";
import {DelTaskAC, UpdateCheckboxTaskAC, UpdateTaskTitleAC} from "../../state/tasks-reducer";
import {useDispatch} from "react-redux";

export const useTask=(idList:string, idTask:string)=>{

    const dispatch = useDispatch()


    const delTask =useCallback( () => {
        dispatch(DelTaskAC(idList, idTask))
    },[dispatch])

    const updateTaskTitle =useCallback( (newTitle: string) => {
        dispatch(UpdateTaskTitleAC(idList, idTask, newTitle))
    },[dispatch])

    const onChangeCheckBox =useCallback( (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(UpdateCheckboxTaskAC(idList, idTask, event.currentTarget.checked))
    }, [dispatch])

    return{
        delTask,
        updateTaskTitle,
        onChangeCheckBox
    }
}