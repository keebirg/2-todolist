import type {Meta, StoryObj} from '@storybook/react';
import {ToDoLists} from "./ToDoLists";
import {ReduxStoreProviderDecorator} from "../../stories/decorators/ReduxStoreProviderDecorator";

const meta: Meta<typeof ToDoLists> = {
    title: 'ToDoLists',
    component: ToDoLists,

    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],

};

export default meta;

type Story = StoryObj<typeof ToDoLists>;

export const ToDoListsStory: Story = {};