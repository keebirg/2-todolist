import React, {
    ChangeEvent,
    useState
} from 'react';
import styled from "styled-components";
import {TextField} from "@mui/material";

type EditableTitlePropsType = {
    title: string
    updateTitle: (newTitle: string)=>void
}


export const EditableTitle = (props: EditableTitlePropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle]= useState("")


    const activateEditMode = () => {
        setEditMode(true);
        setNewTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.updateTitle(newTitle);
    }


    const onChangeHandler=(event: ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(event.currentTarget.value);
    }

    return (editMode ?
            <TextField
                size={"small"}
                autoFocus
                value={newTitle}
                onBlur={activateViewMode}
                onChange={onChangeHandler}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
};

const Input = styled.input`
  width: 100px;
`