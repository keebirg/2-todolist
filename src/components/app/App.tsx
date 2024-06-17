import React from 'react';
import {ToDoLists} from "../toDoLists/ToDoLists";
import styled from "styled-components";



function App() {

    return (
        <AppStyled>
            <ToDoLists/>
        </AppStyled>
    );
}

export default App;

const AppStyled = styled.div`
  height: 100vh;
`