import {ChangeEvent, useCallback, useState} from "react";

export const useEditableTitle = (title: string, updateTitle: (newTitle: string) => void, disabled: boolean) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState("")


    const activateEditMode = useCallback(() => {
        if (disabled) return;

        setEditMode(true);
        setNewTitle(title);
    }, [title, disabled])
    const activateViewMode = useCallback(() => {
        setEditMode(false);
        updateTitle(newTitle);
    }, [updateTitle, newTitle])
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value);
    }, [])

    return {
        editMode,
        newTitle,
        activateEditMode,
        activateViewMode,
        onChangeHandler,
    }
}