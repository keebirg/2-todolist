import React from 'react';
import {TextField} from "@mui/material";
import {useEditableTitle} from "./useEditableTitle";

type EditableTitlePropsType = {
    title: string
    updateTitle: (newTitle: string) => void
    disabled:boolean
}


export const EditableTitle = React.memo((props: EditableTitlePropsType) => {

    console.log('print EditableTitle')

    const {
        editMode,
        newTitle,
        activateEditMode,
        activateViewMode,
        onChangeHandler,
    }=useEditableTitle(props.title, props.updateTitle, props.disabled)




    return (editMode ?
            <TextField
                size={"small"}
                autoFocus
                value={newTitle}
                onBlur={activateViewMode}
                onChange={onChangeHandler}
                disabled={props.disabled}/> :
            <span style={props.disabled? {opacity: 0.5}:{}} onDoubleClick={activateEditMode}>{props.title}</span>
    );
});
