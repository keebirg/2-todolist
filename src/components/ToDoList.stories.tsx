import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {ToDoLists} from "./ToDoLists";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";
import {FilterTypes} from "./ToDoLists";
import {TaskType} from "../state/tasks-reducer";
import {ToDoList} from "./ToDoList";

const meta: Meta<typeof ToDoList> = {
    title: 'ToDoList',
    component: ToDoList,

    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],

    args: {
        listTitle: 'string',
        filterClick: action('filterClick'),
        idList: 'string',
        filter: 'All',
        delList: action('delList'),
        updateListTitle: action('updateListTitle'),
        toDoListsTasks: [{id: '1', title: 'css', isCheck: false}],
    }

};

export default meta;

type Story = StoryObj<typeof ToDoList>;

export const ToDoListStory: Story = {};