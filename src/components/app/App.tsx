import React, {useEffect} from 'react';
import {ToDoLists} from "../toDoLists/ToDoLists";
import styled from "styled-components";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../login/Login";

import {Header} from "../header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, AppThunkDispatch} from "../../state/store";
import {getAuthMeTC} from "./app-reducer";


function App() {
    const dispatch:AppThunkDispatch=useDispatch();
    const isInitialized=useSelector<AppRootState, boolean>(state=>state.app.isInitialized)
    useEffect(()=>{
        dispatch(getAuthMeTC())
    },[])

    if(!isInitialized) return <AppStyled><Header/></AppStyled>

    return (
        <BrowserRouter>
            <AppStyled>
                <Header/>
                <Routes>
                    <Route path={"/"} element={<ToDoLists/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </AppStyled>
        </BrowserRouter>
    );
}

export default App;

const AppStyled = styled.div`
  height: 100vh;
`
