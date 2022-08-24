import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import TodolistsList from '../features/TodolistsList/TodolistsList';
import {useAppSelector} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

type AppWithReduxPropsType = {
    demo?: boolean
}

const AppWithRedux: React.FC<AppWithReduxPropsType> = ({demo = false}) => {

    // const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const status = useAppSelector(state => state.app.status)

    // GUI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant="outlined">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default AppWithRedux;
