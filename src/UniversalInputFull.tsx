import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type UniversalInputFullType = {
    addTask: (title: string) => void
}

    export const UniversalInputFull = (props:UniversalInputFullType) => {
    let [title, setTitle] = useState("")
    const addTask = () => {
        props.addTask(title);
        setTitle("");
            }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
        </div>
    );
};

