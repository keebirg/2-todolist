import React, {useEffect} from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField} from "@mui/material";
import styled from "styled-components";
import {useFormik} from "formik";
import { useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, AppThunkDispatch} from "../../state/store";
import {loginTC} from "./auth-reducer";

export const Login = () => {
    const isLoggedIn=useSelector<AppRootState, boolean>(state=>state.app.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppThunkDispatch>();
    const loginDisabled=useSelector<AppRootState, boolean>(state=>state.auth.disabled)



    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/"); // Используем navigate для редиректа
        }
    }, [isLoggedIn, navigate]);

    return (
        <LoginStyled>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField
                            label='Email'
                            margin='normal'
                            {...formik.getFieldProps('email')}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            margin='normal'
                            {...formik.getFieldProps('password')}
                        />
                        <FormControlLabel
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}/>}
                            label={'Remember me'}
                        />
                        <Button disabled={loginDisabled} type={"submit"} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </LoginStyled>
    );
};

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;

`

