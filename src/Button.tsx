import React from 'react';

type ButtonType = {
    name: string,
    callBack: () => void,
    // title:string,
    // setTitle: (title: string) => void

}

export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callBack()
        // props.setTitle("")
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    );
};

