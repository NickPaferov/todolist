import React from 'react';

type TodoListHeaderPropsType = {
    title: string
    removeTodoList: () => void
}

const TodoListHeader: React.FC<TodoListHeaderPropsType> = ({title, ...props}) => {
    return <h3>
        {title}
        <button onClick={props.removeTodoList}>x</button>
    </h3>;
};

export default TodoListHeader;