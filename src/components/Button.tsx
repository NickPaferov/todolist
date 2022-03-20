import React from 'react';
import {FilterValuesType} from "../App";

type ButtonPropsType = {
    buttonCallBack: () => void
    name: string
    filter?: FilterValuesType
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.buttonCallBack()
    }
    return (
        <button className={props.filter === props.name? "active-filter" : ""}
                onClick={onClickHandler}>{props.name}
        </button>
    )
}
