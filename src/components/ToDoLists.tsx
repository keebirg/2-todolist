import React, {useState} from 'react';
import {v1} from "uuid";
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


export type FilterTypes = "All" | "Active" | "Completed";

type ToDoListsDataType = {
    id: string
    title: string
    filter: FilterTypes
}

type toDoListsTasksType = {
    [key: string]: Array<TasksType>
}

export const ToDoLists = () => {

    const idToDoList1 = v1();
    const idToDoList2 = v1();
    const idToDoList3 = v1();

    let [toDoListsPrimaryData, setToDoListsPrimaryData] = useState<Array<ToDoListsDataType>>([
        {id: idToDoList1, title: "Job1", filter: "All"},
        {id: idToDoList2, title: "Job2", filter: "Active"},
        {id: idToDoList3, title: "Job3", filter: "Completed"},
    ])

    let [toDoListsTasks, setToDoListsTasks] = useState<toDoListsTasksType>({
        [idToDoList1]: [
            {id: v1(), title: "js", isCheck: true},
            {id: v1(), title: "HTML/CSS", isCheck: true},
            {id: v1(), title: "REACT", isCheck: false},
        ],
        [idToDoList2]: [
            {id: v1(), title: "js", isCheck: true},
            {id: v1(), title: "HTML/CSS", isCheck: true},
            {id: v1(), title: "REACT", isCheck: false},
        ],
        [idToDoList3]: [
            {id: v1(), title: "js", isCheck: true},
            {id: v1(), title: "HTML/CSS", isCheck: true},
            {id: v1(), title: "REACT", isCheck: false},
        ],
    })


    const addTask = (idList: string, newTitleTask: string) => {
        let newTask = {id: v1(), title: newTitleTask, isCheck: false};
        toDoListsTasks[idList].push(newTask);
        setToDoListsTasks({...toDoListsTasks});
    }
    const delTask = (idList: string, idTask: string) => {
        toDoListsTasks[idList] = toDoListsTasks[idList].filter(task => task.id !== idTask);
        setToDoListsTasks({...toDoListsTasks});
    }

    const filterClick = (idList: string, filter: FilterTypes) => {
        toDoListsPrimaryData.map((data) => {
            if (data.id === idList) data.filter = filter
        })

        setToDoListsPrimaryData([...toDoListsPrimaryData])
    }

    const delList = (idList: string) => {
        toDoListsPrimaryData = toDoListsPrimaryData.filter((data) => data.id !== idList)
        setToDoListsPrimaryData([...toDoListsPrimaryData])

        delete toDoListsTasks[idList];
        setToDoListsTasks({...toDoListsTasks})
    }

    const addList = (titleList: string) => {
        const idToDoList = v1();

        toDoListsTasks[idToDoList] = [
            {id: v1(), title: "js", isCheck: true},
            {id: v1(), title: "HTML/CSS", isCheck: true},
            {id: v1(), title: "REACT", isCheck: false},
        ];
        setToDoListsTasks({...toDoListsTasks});

        toDoListsPrimaryData.push({id: idToDoList, title: titleList, filter: "All"});
        setToDoListsPrimaryData([...toDoListsPrimaryData]);
    }

    const updateTaskTitle = (idList: string, idTask: string, newTitle: string) => {
        toDoListsTasks[idList].map((task) => {
            if (task.id === idTask) task.title = newTitle;
        })

        setToDoListsTasks({...toDoListsTasks})
    }

    const updateListTitle = (idList: string, newTitle: string) => {
        toDoListsPrimaryData.map((list) => {
            if (list.id === idList) list.title = newTitle;
        })

        setToDoListsPrimaryData([...toDoListsPrimaryData]);
    }

    const updateCheckbox = (idList: string, idTask: string, isCheck: boolean) => {
        toDoListsTasks[idList].map((task) => {
            if (task.id === idTask) task.isCheck = isCheck;
        })

        setToDoListsTasks({...toDoListsTasks})
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

                        let tasks;
                        switch (list.filter) {
                            case "Completed":
                                tasks = toDoListsTasks[list.id].filter((task) => task.isCheck);
                                break;
                            case "Active":
                                tasks = toDoListsTasks[list.id].filter((task) => !task.isCheck);
                                break;
                            case "All":
                                tasks = toDoListsTasks[list.id];
                                break;
                        }

                        return (
                            <Grid item>
                                <Paper>
                                    <ToDoList
                                        filterClick={filterClick}
                                        idList={list.id}
                                        addTask={addTask}
                                        delTask={delTask}
                                        key={list.id}
                                        listTitle={list.title}
                                        tasks={tasks}
                                        filter={list.filter}
                                        delList={delList}
                                        updateTaskTitle={updateTaskTitle}
                                        updateListTitle={updateListTitle}
                                        updateCheckbox={updateCheckbox}

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