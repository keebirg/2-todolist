import React from 'react';
import styled from "styled-components";
import {InputAddItem} from "../inputAddItem/InputAddItem";
import {EditableTitle} from "../editable/EditableTitle";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../task/Task";
import {useToDoList} from "./useToDoList";
import {FilterTypes} from "../../state/todolists-reducer";
import {TaskType} from "../../api/toDoLists-api";



type ToDoListPropsType = {
    toDoListsTasks:Array<TaskType>
    listTitle: string
    idList: string
    filter: FilterTypes
}

export const ToDoList = React.memo((props: ToDoListPropsType) => {
    console.log('print ToDoList')

    const {
        tasks,
        addTask,
        updateListTitle,
        delList,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
    }=useToDoList(props.idList, props.filter, props.toDoListsTasks)


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
                        return <Task
                            idList={props.idList}
                            task={task}
                            key={task.id}/>
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


