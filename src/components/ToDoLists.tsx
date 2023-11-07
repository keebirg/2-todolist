import React from 'react';
import {
    TasksType,
    ToDoList
} from "./ToDoList";
import styled from "styled-components";
import {InputAddItem} from "./InputAddItem";
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
import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    AddListAC,
    DelListAC,
    UpdateFilterAC,
    UpdateListTitleAC
} from "../state/todolists-reducer";
import {AppRootState} from "../state/store";


export type FilterTypes = "All" | "Active" | "Completed";

export type ToDoListsDataType = {
    id: string
    title: string
    filter: FilterTypes
}

export type toDoListsTasksType = {
    [key: string]: Array<TasksType>
}

export const ToDoLists = () => {


    const dispatch = useDispatch()
    const toDoListsPrimaryData = useSelector<AppRootState, Array<ToDoListsDataType>>(state => state.todolist)

    const filterClick = (idList: string, filter: FilterTypes) => {
        dispatch(UpdateFilterAC(idList, filter))
    }

    const delList = (idList: string) => {
        dispatch(DelListAC(idList))
    }

    const addList = (titleList: string) => {
        dispatch(AddListAC(titleList))
    }

    const updateListTitle = (idList: string, newTitle: string) => {
        dispatch(UpdateListTitleAC(idList, newTitle))
    }



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
                            <Grid item>
                                <Paper>
                                    <ToDoList
                                        filterClick={filterClick}
                                        idList={list.id}
                                        key={list.id}
                                        listTitle={list.title}
                                        filter={list.filter}
                                        delList={delList}
                                        updateListTitle={updateListTitle}
                                    />
                                </Paper>
                            </Grid>

                        )
                    })}
                </Grid>
            </Container>
        </ToDoListsStyled>
    );
};

const ToDoListsStyled = styled.div`


`

const InputStyled = styled.div`
  padding: 15px;
`