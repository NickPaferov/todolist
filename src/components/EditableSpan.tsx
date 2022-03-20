import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    editTitleCallBack: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onDoubleClickHandler = () => {
        setEditMode(true)
    }
    const onBlurHandler = () => {
        props.editTitleCallBack(newTitle)
        setEditMode(false)
    }
    const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && onBlurHandler()

    return (
        editMode
            ? <input
                value={newTitle}
                autoFocus
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressOffEditMode}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    )
}
