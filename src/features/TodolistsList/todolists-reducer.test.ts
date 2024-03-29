import {
    addTodolistTC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC, changeTodoListTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../../api/todolist-api";
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    startState = [
        {id: todolistId1, title: "What to learn", addedDate: '', order: 0, filter: "all", entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", addedDate: '', order: 0, filter: "all", entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistTC.fulfilled({todolistId: todolistId1}, "requestId", {todolistId: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let todolist: TodolistType = {
        id: "some id",
        order: 0,
        title: "New Todolist",
        addedDate: ""
    };

    const endState = todolistsReducer(startState, addTodolistTC.fulfilled({todolist: todolist}, "requestId", {title: todolist.title}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTodoListTitleTC.fulfilled({
        todolistId: todolistId2,
        title: newTodolistTitle
    }, "requestId", {todolistId: todolistId2, title: newTodolistTitle});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC({todolistId: todolistId2, filter: newFilter});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be setted to the state', () => {

    const action = fetchTodolistsTC.fulfilled({todolists: startState}, "requestId");

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";

    const action = changeTodolistEntityStatusAC({todolistId: todolistId2, entityStatus: newStatus});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});