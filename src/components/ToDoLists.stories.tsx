import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {ToDoLists} from "./ToDoLists";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";
import {FilterTypes} from "./ToDoLists";
import {TaskType} from "../state/tasks-reducer";

const meta: Meta<typeof ToDoLists> = {
    title: 'ToDoLists',
    component: ToDoLists,

    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],

};

export default meta;

type Story = StoryObj<typeof ToDoLists>;

export const ToDoListsStory: Story = {};