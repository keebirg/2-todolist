import React, {
    ChangeEvent,
    useState
} from 'react';
import styled from "styled-components";
import {FilterTypes} from "./ToDoLists";

type TasksType = {
    id: string
    title: string
    isCheck: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TasksType>
    addTask: (idList: string, newTitleTask: string) => void
    delTask: (idList: string, idTask: string) => void
    filterClick: (idList: string, filter: FilterTypes) => void
    idList: string
    filter: FilterTypes
    delList: (idList:string)=>void
}

export const ToDoList = (props: ToDoListPropsType) => {

    let [newTitleTask, setNeTitleTask] = useState('');
    let [error, setError] = useState('');

    const delList=()=>props.delList(props.idList)

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNeTitleTask(event.currentTarget.value)
    const addTask = () => {
        if(!newTitleTask.trim()){
            setError("Title is required");
            return;
        }
        props.addTask(props.idList, newTitleTask);
        setNeTitleTask('')
    }
    const onKeyPressHandler=()=>setError('');


    const onAllClickHandler = () => props.filterClick(props.idList, "All");
    const onActiveClickHandler = () => props.filterClick(props.idList, "Active");
    const onCompletedClickHandler = () => props.filterClick(props.idList, "Completed");

    return (
        <ToDoListStyled>
            <Title>
                {props.title}
                <Button onClick={delList}>x</Button>
            </Title>

            <Input
                error={error}
                type={"text"}
                value={newTitleTask}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error? <ErrorText>{error}</ErrorText>:<></>}

            <ul>
                {
                    props.tasks.map((task) => {
                        const delTask = () => {
                            props.delTask(props.idList, task.id)
                        }

                        return (
                            <LiStyled key={task.id}>
                                <input type={"checkbox"} checked={task.isCheck}/>
                                <span>{task.title}</span>
                                <Button onClick={delTask}>x</Button>
                            </LiStyled>
                        )
                    })
                }
            </ul>

            <div>
                <Button isFilter={props.filter==="All"} onClick={onAllClickHandler}>All</Button>
                <Button isFilter={props.filter==="Active"} onClick={onActiveClickHandler}>Active</Button>
                <Button isFilter={props.filter==="Completed"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>

        </ToDoListStyled>
    );
};


type ButtonPropsType = {
    isFilter?:boolean
}
type InputPropsType = {
    error: string
}

const ToDoListStyled = styled.div`
  border: 1px solid black;
  padding: 15px;
`
const Title = styled.h3`
`
const LiStyled = styled.li`
`
const Input = styled.input<InputPropsType>`
    border-color: ${props=>props.error? "red" :"black"};
`
const Button = styled.button<ButtonPropsType>`
    background-color: ${props=>props.isFilter? "aquamarine" : "none"};
`
const ErrorText = styled.div`
  color: red;
`