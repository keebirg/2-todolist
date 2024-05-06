import React, {useCallback} from 'react';
import styled from "styled-components";
import {FilterTypes} from "./ToDoLists";
import {InputAddItem} from "./InputAddItem";
import {EditableTitle} from "./EditableTitle";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {AddTaskAC, TaskType} from "../state/tasks-reducer";
import {Task} from "./Task";



type ToDoListPropsType = {
    listTitle: string
    filterClick: (idList: string, filter: FilterTypes) => void
    idList: string
    filter: FilterTypes
    delList: (idList: string) => void
    updateListTitle: (idList: string, newTitle: string) => void
    toDoListsTasks:Array<TaskType>
}

export const ToDoList = React.memo((props: ToDoListPropsType) => {
    console.log('print ToDoList')


    const dispatch = useDispatch()

    let tasks;
    switch (props.filter) {
        case "Completed":
            tasks = props.toDoListsTasks.filter((task) => task.isCheck);
            break;
        case "Active":
            tasks = props.toDoListsTasks.filter((task) => !task.isCheck);
            break;
        case "All":
            tasks = props.toDoListsTasks;
            break;
    }

    const addTask = useCallback((newTitleTask: string) => {
        dispatch(AddTaskAC(props.idList, newTitleTask))
    }, [dispatch, props.idList])
    const delList = useCallback(() => props.delList(props.idList), [props.delList, props.idList])
    const onAllClickHandler = useCallback(() => props.filterClick(props.idList, "All"), [props.filterClick, props.idList]);
    const onActiveClickHandler = useCallback(() => props.filterClick(props.idList, "Active"), [props.filterClick, props.idList]);
    const onCompletedClickHandler = useCallback(() => props.filterClick(props.idList, "Completed"), [props.filterClick, props.idList]);
    const updateListTitle = useCallback(
        (newTitle: string) => {
            props.updateListTitle(props.idList, newTitle)
        }, [props.updateListTitle, props.idList])


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
                    tasks.map((task) => {
                        return <Task idList={props.idList} task={task} key={task.id}/>
                    })
                }
            </ul>

            <div>
                <Button
                    color={"success"}
                    variant={props.filter === "All" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
                <Button
                    color={"primary"}
                    variant={props.filter === "Active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === "Completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>

        </ToDoListStyled>
    );
});


const ToDoListStyled = styled.div`
  padding: 15px;

  ul {
    padding: 0;
  }
`

const Title = styled.h3`
`


