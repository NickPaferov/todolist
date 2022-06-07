import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import TaskWithRedux from "../TaskWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {TaskType} from "../AppWithRedux";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolists/TaskWithRedux',
    component: TaskWithRedux,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof TaskWithRedux>;

const TaskWithReduxContainer = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    return <TaskWithRedux task={task} todoListID={'todolistId1'}
    />
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskWithReduxContainer> = (args) => {
    return <TaskWithReduxContainer/>
};

export const TaskWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskWithReduxStory.args = {};