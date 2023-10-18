import React, {
    ChangeEvent,
    useState
} from 'react';
import styled from "styled-components";
import {
    Button,
    IconButton,
    TextField
} from "@mui/material";
import {Add} from "@mui/icons-material";

type InputAddItemPropsType = {
    addItem: (title: string) => void
}

export const InputAddItem = (props: InputAddItemPropsType) => {
    let [newTitleTask, setNeTitleTask] = useState('');
    let [error, setError] = useState('');

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNeTitleTask(event.currentTarget.value)
    const addItem = () => {
        if (!newTitleTask.trim()) {
            setError("Title is required");
            return;
        }
        props.addItem(newTitleTask);
        setNeTitleTask('')
    }
    const onKeyPressHandler = () => setError('');

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

            <IconButton  onClick={addItem}>
                <Add/>
            </IconButton>

        </InputAddItemStyled>
    );
};

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