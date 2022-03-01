import React from "react"

type propsType = {
    name: string,
    callBack: () => void
}

export const Button = (props: propsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}