import React, {
    ChangeEvent, useCallback,
    useState
} from 'react';
import styled from "styled-components";
import {TextField} from "@mui/material";

type EditableTitlePropsType = {
    title: string
    updateTitle: (newTitle: string) => void
}


export const EditableTitle = React.memo((props: EditableTitlePropsType) => {

    console.log('print EditableTitle')

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState("")


    const activateEditMode =useCallback ( () => {
        setEditMode(true);
        setNewTitle(props.title);
    },[props.title])
    const activateViewMode =useCallback ( () => {
        setEditMode(false);
        props.updateTitle(newTitle);
    },[props.updateTitle, newTitle])
    const onChangeHandler = useCallback ((event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value);
    }, [])

    return (editMode ?
            <TextField
                size={"small"}
                autoFocus
                value={newTitle}
                onBlur={activateViewMode}
                onChange={onChangeHandler}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
});

const Input = styled.input`
  width: 100px;
`