import type {Meta, StoryObj} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../../stories/decorators/ReduxStoreProviderDecorator";
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "../../api/toDoLists-api";

const meta: Meta<typeof ToDoList> = {
    title: 'ToDoList',
    component: ToDoList,

    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],

    args: {
        listTitle: 'string',
        // filterClick: action('filterClick'),
        idList: 'string',
        filter: 'All',
        // delList: action('delList'),
        // updateListTitle: action('updateListTitle'),
        toDoListsTasks: [{todoListId: "idToDoList1", id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false }],
    }

};

export default meta;

type Story = StoryObj<typeof ToDoList>;

export const ToDoListStory: Story = {};