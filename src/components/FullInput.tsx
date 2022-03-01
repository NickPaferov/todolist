import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type propsType={
    addTask: (newTitle: string) => void
}

const FullInput=({addTask, ...props}: propsType)=>{
    let [newTitle, setNewTitle] = useState("")

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    const onClickHandler = () => {
        addTask(newTitle)
        setNewTitle("")
    }

    return (
        <div>
            <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>    )
}

export default FullInput;