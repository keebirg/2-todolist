import {useDispatch} from "react-redux";
import {DelTaskAC, TaskType, UpdateCheckboxTaskAC, UpdateTaskTitleAC} from "../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableTitle} from "./EditableTitle";
import {Delete} from "@mui/icons-material";
import styled from "styled-components";

type TaskPropsType = {
    task: TaskType
    idList: string
}
export const Task = (props: TaskPropsType) => {
    const dispatch = useDispatch()

    const delTask =useCallback( () => {
        dispatch(DelTaskAC(props.idList, props.task.id))
    },[dispatch,props.idList, props.task.id])

    const updateTaskTitle =useCallback( (newTitle: string) => {
        dispatch(UpdateTaskTitleAC(props.idList, props.task.id, newTitle))
    },[dispatch, props.idList, props.task.id])

    const onChangeInputHandler =useCallback( (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(UpdateCheckboxTaskAC(props.idList, props.task.id, event.currentTarget.checked))
    }, [dispatch, props.idList, props.task.id])

    return (
        <LiStyled key={props.task.id}>
            <Checkbox checked={props.task.isCheck} onChange={onChangeInputHandler}/>
            <EditableTitle title={props.task.title} updateTitle={updateTaskTitle}/>
            <IconButton onClick={delTask}>
                <Delete/>
            </IconButton>
        </LiStyled>
    )
}
const LiStyled = styled.li`
  list-style-type: none;
`