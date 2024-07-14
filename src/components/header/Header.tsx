import React from 'react';
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, AppThunkDispatch} from "../../state/store";
import {AppStateType} from "../app/app-reducer";
import styled from "styled-components";
import {logoutTC} from "../login/auth-reducer";

export const Header = () => {
    const appDate = useSelector<AppRootState, AppStateType>(state => state.app)
    const logoutDisabled=useSelector<AppRootState, boolean>(state=>state.auth.disabled)
    const dispatch = useDispatch<AppThunkDispatch>();
    const logout = () => dispatch(logoutTC());


    return (
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
                    {appDate.isLoggedIn && <Button disabled={logoutDisabled} color="inherit" onClick={logout}>Logout</Button>}
                </Toolbar>
                <BoxLinearProgress>
                    {appDate.status === 'loading' && <LinearProgress/>}
                </BoxLinearProgress>
            </AppBar>
        </Box>
    );
};

const BoxLinearProgress = styled.div`
  height: 4px;
`