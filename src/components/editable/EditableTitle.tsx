import React from 'react';
import {TextField} from "@mui/material";
import {useEditableTitle} from "./useEditableTitle";

type EditableTitlePropsType = {
    title: string
    updateTitle: (newTitle: string) => void
}


export const EditableTitle = React.memo((props: EditableTitlePropsType) => {

    console.log('print EditableTitle')

    const {
        editMode,
        newTitle,
        activateEditMode,
        activateViewMode,
        onChangeHandler,
    }=useEditableTitle(props.title, props.updateTitle)

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
