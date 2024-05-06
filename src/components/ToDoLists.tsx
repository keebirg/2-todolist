import React, {useCallback} from 'react';
import {
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
import {toDoListsTasksType} from "../state/tasks-reducer";


export type FilterTypes = "All" | "Active" | "Completed";

export type ToDoListsDataType = {
    id: string
    title: string
    filter: FilterTypes
}


export const ToDoLists = React.memo(() => {

    console.log('print ToDoLists')

    const dispatch = useDispatch()
    const toDoListsPrimaryData = useSelector<AppRootState, Array<ToDoListsDataType>>(state => state.todolist)
    const toDoListsTasks = useSelector<AppRootState, toDoListsTasksType>(state => state.tasks)

    const filterClick = useCallback(
        (idList: string, filter: FilterTypes) => {
            dispatch(UpdateFilterAC(idList, filter))
        }, [dispatch])

    const delList = useCallback(
        (idList: string) => {
            dispatch(DelListAC(idList))
        }, [dispatch])

    const addList = useCallback(
        (titleList: string) => {
            dispatch(AddListAC(titleList))
        }, [dispatch])

    const updateListTitle = useCallback(
        (idList: string, newTitle: string) => {
            dispatch(UpdateListTitleAC(idList, newTitle))
        }, [dispatch])


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
});

const ToDoListsStyled = styled.div`


`

const InputStyled = styled.div`
  padding: 15px;
`