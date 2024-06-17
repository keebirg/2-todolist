import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../stories/decorators/ReduxStoreProviderDecorator";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "../../api/toDoLists-api";

const meta: Meta<typeof Task> = {
    title: 'Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],

    tags: ['autodocs'],

    args: {
        task: {todoListId: "idToDoList2", id: v1(), title: "js", status: TaskStatus.Completed, addedDate:'', deadline:'', order:0, startDate:'', description:'', priority:TaskPriority.Low, disabled:false },
        idList: 'id List',
        // onChangeCheckBox: action('Status changed inside Task'),
        // updateTaskTitle:action('Title changed inside Task'),
        // delTask:action('Remove Button clicked changed inside Task')
    },
};

export default meta;

type Story = StoryObj<typeof Task>;

export const TaskStory: Story = {
    args: {
        // task: {id:'1', title:'css', isCheck:false},
    },
};
