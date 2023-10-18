import React, {ChangeEvent} from 'react';
import styled from "styled-components";
import {FilterTypes} from "./ToDoLists";
import {InputAddItem} from "./InputAddItem";
import {EditableTitle} from "./EditableTitle";
import {
    Button,
    Checkbox,
    IconButton
} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TasksType = {
    id: string
    title: string
    isCheck: boolean
}

type ToDoListPropsType = {
    listTitle: string
    tasks: Array<TasksType>
    addTask: (idList: string, newTitleTask: string) => void
    delTask: (idList: string, idTask: string) => void
    filterClick: (idList: string, filter: FilterTypes) => void
    idList: string
    filter: FilterTypes
    delList: (idList: string) => void
    updateTaskTitle: (idList: string, idTask: string, newTitle: string) => void
    updateListTitle: (idList: string, newTitle: string) => void
    updateCheckbox: (idList: string, idTask: string, isCheck: boolean) => void
}

export const ToDoList = (props: ToDoListPropsType) => {
    const delList = () => props.delList(props.idList)


    const onAllClickHandler = () => props.filterClick(props.idList, "All");
    const onActiveClickHandler = () => props.filterClick(props.idList, "Active");
    const onCompletedClickHandler = () => props.filterClick(props.idList, "Completed");

    const addTask = (titleTask: string) => {
        props.addTask(props.idList, titleTask);
    }

    const updateListTitle = (newTitle: string) => {
        props.updateListTitle(props.idList, newTitle)
    }


    return (
        <ToDoListStyled>

            <Title>
                <EditableTitle title={props.listTitle} updateTitle={updateListTitle}/>
                <IconButton onClick={delList}>
                    <Delete/>
                </IconButton>
            </Title>

            <InputAddItem addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((task) => {
                        const delTask = () => {
                            props.delTask(props.idList, task.id)
                        }

                        const updateTaskTitle = (newTitle: string) => {
                            props.updateTaskTitle(props.idList, task.id, newTitle)
                        }

                        const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.updateCheckbox(props.idList, task.id, event.currentTarget.checked);
                        }

                        return (
                            <LiStyled key={task.id}>
                                <Checkbox checked={task.isCheck} onChange={onChangeInputHandler}/>
                                <EditableTitle title={task.title} updateTitle={updateTaskTitle}/>
                                <IconButton onClick={delTask}>
                                    <Delete/>
                                </IconButton>
                            </LiStyled>
                        )
                    })
                }
            </ul>

            <div>
                <Button
                    color={"success"}
                    variant={props.filter ==="All" ? "contained":"text" }
                    onClick={onAllClickHandler}>All</Button>
                <Button
                    color={"primary"}
                    variant={props.filter ==="Active" ? "contained":"text" }
                    onClick={onActiveClickHandler}>Active</Button>
                <Button
                    color={"secondary"}
                    variant={props.filter ==="Completed" ? "contained":"text" }
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>

        </ToDoListStyled>
    );
}


type ButtonPropsType = {
    isFilter?: boolean
}

const ToDoListStyled = styled.div`
  padding: 15px;

  ul {
    padding: 0;
  }
`

const Title = styled.h3`
`
const LiStyled = styled.li`
  list-style-type: none;
`

