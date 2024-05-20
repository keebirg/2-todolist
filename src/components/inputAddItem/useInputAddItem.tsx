import {ChangeEvent, useCallback, useState} from "react";

export const useInputAddItem=(addItem:(newTitle:string)=>void)=>{
    let [newTitle, setNewTitle] = useState('');
    let [error, setError] = useState('');

    const onNewTitleChange =useCallback ( (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    },[])
    const onAddItem = useCallback (() => {
        if (!newTitle.trim()) {
            setError("Title is required");
            return;
        }
        addItem(newTitle);
        setNewTitle('')
    },[addItem, newTitle])

    const onKeyPress = useCallback (() => {
        if (error) setError('');
    }, [error])

    return{
        error,
        newTitle,
        onNewTitleChange,
        onAddItem,
        onKeyPress,
    }
}