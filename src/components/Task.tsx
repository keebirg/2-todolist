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
    delTask:(idTask:string)=>void
    updateTaskTitle:(newTitle: string, idTask:string)=>void
    onChangeCheckBox:(event: ChangeEvent<HTMLInputElement>, idTask:string)=>void
}
export const Task = (props: TaskPropsType) => {

    const onChangeCheckBoxHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        props.onChangeCheckBox(event, props.task.id)
    }

    const updateTitleHandler=(newTitle: string)=>{
        props.updateTaskTitle(newTitle, props.task.id)
    }

    const delTaskHandler=()=>{
        props.delTask(props.task.id)
    }

    return (
        <LiStyled key={props.task.id}>
            <Checkbox checked={props.task.isCheck} onChange={onChangeCheckBoxHandler}/>
            <EditableTitle title={props.task.title} updateTitle={updateTitleHandler}/>
            <IconButton onClick={delTaskHandler}>
                <Delete/>
            </IconButton>
        </LiStyled>
    )
}
const LiStyled = styled.li`
  list-style-type: none;
`