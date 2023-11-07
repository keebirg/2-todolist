import React, {ChangeEvent} from 'react';
import styled from "styled-components";
import {
    FilterTypes,
    toDoListsTasksType
} from "./ToDoLists";
import {InputAddItem} from "./InputAddItem";
import {EditableTitle} from "./EditableTitle";
import {
    Button,
    Checkbox,
    IconButton
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {AppRootState} from "../state/store";
import {
    AddTaskAC,
    DelTaskAC,
    UpdateCheckboxTaskAC,
    UpdateTaskTitleAC
} from "../state/tasks-reducer";

export type TasksType = {
    id: string
    title: string
    isCheck: boolean
}

type ToDoListPropsType = {
    listTitle: string
    filterClick: (idList: string, filter: FilterTypes) => void
    idList: string
    filter: FilterTypes
    delList: (idList: string) => void
    updateListTitle: (idList: string, newTitle: string) => void
}

export const ToDoList = (props: ToDoListPropsType) => {
    const dispatch = useDispatch()
    const toDoListsTasks = useSelector<AppRootState, toDoListsTasksType>(state => state.tasks)

    let tasks;
    switch (props.filter) {
        case "Completed":
            tasks = toDoListsTasks[props.idList].filter((task) => task.isCheck);
            break;
        case "Active":
            tasks = toDoListsTasks[props.idList].filter((task) => !task.isCheck);
            break;
        case "All":
            tasks = toDoListsTasks[props.idList];
            break;
    }



    const addTask = (newTitleTask: string) => {
        dispatch(AddTaskAC(props.idList, newTitleTask))
    }



    const delList = () => props.delList(props.idList)
    const onAllClickHandler = () => props.filterClick(props.idList, "All");
    const onActiveClickHandler = () => props.filterClick(props.idList, "Active");
    const onCompletedClickHandler = () => props.filterClick(props.idList, "Completed");
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
                    tasks.map((task) => {
                        const delTask = () => dispatch(DelTaskAC(props.idList, task.id))

                        const updateTaskTitle = (newTitle: string) => dispatch(UpdateTaskTitleAC(props.idList, task.id, newTitle))

                        const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => dispatch(UpdateCheckboxTaskAC(props.idList, task.id, event.currentTarget.checked))

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

