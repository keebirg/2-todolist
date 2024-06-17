import React from 'react';
import styled from "styled-components";
import {
    IconButton,
    TextField
} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useInputAddItem} from "./useInputAddItem";

type InputAddItemPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}




export const InputAddItem = React.memo((props: InputAddItemPropsType) => {

    console.log('print InputAddItem')

    const {
        error,
        newTitle,
        onNewTitleChange,
        onAddItem,
        onKeyPress,
    }=useInputAddItem(props.addItem)

    return (
        <InputAddItemStyled>

            <TextField
                helperText={error}
                value={newTitle}
                onChange={onNewTitleChange}
                onKeyPress={onKeyPress}
                error={!!error}
                label="Type value"
                variant="outlined"
                disabled={props.disabled}/>

            <IconButtonStyled>
                <IconButton onClick={onAddItem} disabled={props.disabled}>
                    <Add/>
                </IconButton>
            </IconButtonStyled>

        </InputAddItemStyled>
    );
});

const InputAddItemStyled = styled.div`
display: flex;
`
const IconButtonStyled = styled.div`
  display: flex;
`