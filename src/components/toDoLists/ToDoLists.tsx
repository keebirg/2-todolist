import React from 'react';
import {
    ToDoList
} from "../toDoList/ToDoList";
import styled from "styled-components";
import {InputAddItem} from "../inputAddItem/InputAddItem";
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";


import {useToDoLists} from "./useToDoLists";



export const ToDoLists = React.memo(() => {

    console.log('print ToDoLists')

    const {
        toDoListsPrimaryData,
        toDoListsTasks,
        addList}=useToDoLists();


    return (
        <ToDoListsStyled>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
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