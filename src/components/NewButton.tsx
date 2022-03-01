import React from "react";

type propsType = {
    name: string
    callBack: () => void
}

const NewButton = ({name, callBack, ...props}: propsType) => {
    const onClickHandler = () => {
        callBack()
    }
    return (
        <div>
            <button onClick={onClickHandler}>{name}</button>
        </div>
    )
}

export default NewButton;