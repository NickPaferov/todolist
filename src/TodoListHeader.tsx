import React from 'react';
import Button from "./Button";
import EditableSpan from "./EditableSpan";

type TodoListHeaderPropsType = {
    title: string
    removeTodoList: () => void
    changeTodoListTitle: (newTitle: string)=> void
}

const TodoListHeader: React.FC<TodoListHeaderPropsType> = (
    {
        title,
        changeTodoListTitle,
        ...props
    }
) => {
    return (
        <h3>
            <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
            <Button title={"x"} onClickHandler={props.removeTodoList} active={false}/>
        </h3>
    );
};

export default TodoListHeader;