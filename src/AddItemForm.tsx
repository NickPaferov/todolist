import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBoxOutlined} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

   /* const errorMessageStyle = {color: "white", backgroundColor: "red"}
    const errorMessage = error
        ? <div style={errorMessageStyle}>Title is required!</div>
        : null
*/
    return (
        <div>
            <TextField value={title}
                       onChange={onChangeSetTitle} //input.value
                       onKeyPress={onKeyPressAddItem}
                       variant="outlined"
                       label="Title"
                       size="small"
                       error={error}
                       helperText={error && "Title is required!"}
            />
            {/*          <input
                value={title}
                onChange={onChangeSetTitle} //input.value
                onKeyPress={onKeyPressAddItem}
                className={error ? "error" : ""}
            />*/}
            <IconButton onClick={onClickAddItem}>
                <AddBoxOutlined/>
            </IconButton>
            {/*<Button title={"+"} onClickHandler={onClickAddItem} active={false}/>*/}
            {/*{errorMessage}*/}
        </div>
    );
};

export default AddItemForm;