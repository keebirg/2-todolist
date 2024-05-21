
import React from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableTitle} from "../editable/EditableTitle";
import {Delete} from "@mui/icons-material";
import styled from "styled-components";
import {useTask} from "./useTask";
import {TaskStatus, TaskType} from "../../api/toDoLists-api";

type TaskPropsType = {
    task: TaskType
    idList: string
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
            <Checkbox checked={props.task.status==TaskStatus.Completed} onChange={onChangeCheckBox}/>
            <EditableTitle title={props.task.title} updateTitle={updateTaskTitle}/>
            <IconButton onClick={delTask}>
                <Delete/>
            </IconButton>
        </LiStyled>
    )
})
const LiStyled = styled.li`
  list-style-type: none;
`