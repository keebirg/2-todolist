import React, {useState} from 'react';
import {v1} from "uuid";
import {ToDoList} from "./ToDoList";
import styled from "styled-components";

export type FilterTypes = "All" | "Active" | "Completed";

type ToDoListsDataType = {
    id: string
    title: string
    filter: FilterTypes
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

    let [toDoListsTasks, setToDoListsTasks] = useState({
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

    const delList=(idList:string)=>{
        toDoListsPrimaryData=toDoListsPrimaryData.filter((data)=>data.id!==idList)
        setToDoListsPrimaryData([...toDoListsPrimaryData])

        delete toDoListsTasks[idList];
        setToDoListsTasks({...toDoListsTasks})
    }

    return (
        <ToDoListsStyled>
            {toDoListsPrimaryData.map((list) => {

                let tasks;
                switch (list.filter) {
                    case "Completed":
                        tasks=toDoListsTasks[list.id].filter((task)=>task.isCheck);
                        break;
                    case "Active":
                        tasks=toDoListsTasks[list.id].filter((task)=>!task.isCheck);
                        break;
                    case "All":
                        tasks=toDoListsTasks[list.id];
                        break;
                }

                return (
                    <ToDoList
                        filterClick={filterClick}
                        idList={list.id}
                        addTask={addTask}
                        delTask={delTask}
                        key={list.id}
                        title={list.title}
                        tasks={tasks}
                        filter={list.filter}
                        delList={delList}
                    />
                )
            })}
        </ToDoListsStyled>
    );
};

const ToDoListsStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

`