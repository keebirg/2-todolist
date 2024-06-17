
import React from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableTitle} from "../editable/EditableTitle";
import {Delete} from "@mui/icons-material";
import styled from "styled-components";
import {useTask} from "./useTask";
import {TaskStatus} from "../../api/toDoLists-api";
import {TaskType} from "../../state/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    idList: string
    disabled:boolean
}
export const Task = React.memo( (props: TaskPropsType) => {
    console.log('Task')

    const {
        delTask,
        updateTaskTitle,
        onChangeCheckBox
    }=useTask(props.idList, props.task.id)



    return (
        <LiStyled key={props.task.id}>
            <Checkbox checked={props.task.status==TaskStatus.Completed} onChange={onChangeCheckBox} disabled={props.disabled}/>
            <EditableTitle title={props.task.title} updateTitle={updateTaskTitle} disabled={props.disabled}/>
            <IconButton onClick={delTask} disabled={props.disabled}>
                <Delete/>
            </IconButton>
        </LiStyled>
    )
})
const LiStyled = styled.li`
  list-style-type: none;
`