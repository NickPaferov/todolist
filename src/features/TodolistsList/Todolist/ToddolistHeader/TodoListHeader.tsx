import React from 'react';
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

type TodoListHeaderPropsType = {
    title: string
    removeTodoList: () => void
    changeTodoListTitle: (newTitle: string) => void
}

const TodoListHeader: React.FC<TodoListHeaderPropsType> = React.memo((
    {
        title,
        changeTodoListTitle,
        ...props
    }
) => {

    console.log("TodoListHeader")

    return (
        <div style={{textAlign: "center"}}>
        <h3>
            <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
            <IconButton onClick={props.removeTodoList}>
                <DeleteOutline/>
            </IconButton>
{/*
            <Button onClickHandler={props.removeTodoList} title={"x"}
                    active={false}/>
*/}
        </h3>
        </div>
    );
});

export default TodoListHeader;