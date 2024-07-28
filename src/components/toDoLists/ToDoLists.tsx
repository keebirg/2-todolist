import React, {useEffect} from 'react';
import {ToDoList} from "../toDoList/ToDoList";
import styled from "styled-components";
import {InputAddItem} from "../inputAddItem/InputAddItem";
import {
    Container,
    Grid,
    Paper,
} from "@mui/material";


import {useToDoLists} from "./useToDoLists";




export const ToDoLists = React.memo(() => {

    console.log('print ToDoLists')

    const {
        toDoListsPrimaryData,
        toDoListsTasks,
        addList,
        isLoggedIn,
        navigate
    } = useToDoLists();


    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login"); // Используем navigate для редиректа
        }
    }, [isLoggedIn, navigate]);

    return (
        <ToDoListsStyled>
            <Container fixed>
                <Grid container>
                    <InputStyled>
                        <span>Add list</span>
                        <InputAddItem addItem={addList}/>
                    </InputStyled>
                </Grid>

                <Grid gap={3} container>
                    {toDoListsPrimaryData.map((list) => {
                        return (
                            <Grid key={list.id}>
                                <Paper>
                                    <ToDoList
                                        toDoListsTasks={toDoListsTasks[list.id]}
                                        listTitle={list.title}
                                        idList={list.id}
                                        key={list.id}
                                        filter={list.filter}
                                        disabledList={list.disabled}
                                    />
                                </Paper>
                            </Grid>

                        )
                    })}
                </Grid>
            </Container>
        </ToDoListsStyled>
    );
});

const ToDoListsStyled = styled.div`


`

const InputStyled = styled.div`
  padding: 15px;
`

