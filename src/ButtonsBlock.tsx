import React from 'react';
import Button from "./Button";
import {FilterValuesType} from "./App";

type ButtonsBlockPropsType = {
    filter: FilterValuesType
    setFilterValue: (filter: FilterValuesType) => () => void
}

const ButtonsBlock: React.FC<ButtonsBlockPropsType> = (
    {
        filter,
        setFilterValue

    }
) => {
    return (
        <div>
            <Button
                active={filter === "all"}
                title={"All"}
                onClickHandler={setFilterValue("all")}
            />
            <Button
                active={filter === "active"}
                title={"Active"}
                onClickHandler={setFilterValue("active")}
            />
            <Button
                active={filter === "completed"}
                title={"Completed"}
                onClickHandler={setFilterValue("completed")}
            />
        </div>
    );
};

export default ButtonsBlock;