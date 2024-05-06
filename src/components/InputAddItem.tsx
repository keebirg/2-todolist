import React, {
    ChangeEvent, useCallback,
    useState
} from 'react';
import styled from "styled-components";
import {
    IconButton,
    TextField
} from "@mui/material";
import {Add} from "@mui/icons-material";

type InputAddItemPropsType = {
    addItem: (title: string) => void
}




export const InputAddItem = React.memo((props: InputAddItemPropsType) => {

    console.log('print InputAddItem')

    let [newTitleTask, setNeTitleTask] = useState('');
    let [error, setError] = useState('');

    const onNewTitleChangeHandler =useCallback ( (event: ChangeEvent<HTMLInputElement>) => {
        setNeTitleTask(event.currentTarget.value)
    },[])
    const addItem = useCallback (() => {
        if (!newTitleTask.trim()) {
            setError("Title is required");
            return;
        }
        props.addItem(newTitleTask);
        setNeTitleTask('')
    },[props.addItem, newTitleTask])

    const onKeyPressHandler = useCallback (() => {
        if (error) setError('');
    }, [error])

    return (
        <InputAddItemStyled>

            <TextField
                helperText={error}
                value={newTitleTask}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label="Type value"
                variant="outlined"/>

            <IconButton onClick={addItem}>
                <Add/>
            </IconButton>

        </InputAddItemStyled>
    );
});

type InputPropsType = {
    error: string
}

const InputAddItemStyled = styled.div`

`

const Input = styled.input<InputPropsType>`
  border-color: ${props => props.error ? "red" : "black"};
`
const ErrorText = styled.div`
  color: red;
`