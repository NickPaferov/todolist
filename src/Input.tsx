import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputType = {
    title: string
    setTitle: (title: string) => void
    callBack: ()=>void
    }

export const Input = ({title, setTitle, ...props}: InputType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.callBack();
        }
    }

    return (
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
        />
    );
};

