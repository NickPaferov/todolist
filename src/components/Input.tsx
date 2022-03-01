import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

type propsType = {
    newTitle: string,
    setNewTitle: (newTitle: string) => void
    addTask: (newTitle: string) => void}

const Input = ({newTitle, setNewTitle, addTask, ...props}: propsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTask(newTitle)
            setNewTitle("")
        }
    }

    return (
        <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
    )
}

export default Input;