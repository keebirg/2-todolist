import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

const meta: Meta<typeof Task> = {
    title: 'Task',
    component: Task,

    tags: ['autodocs'],

    args: {
        task: {id:'1', title:'css', isCheck:false},
        idList: 'id List',
        onChangeCheckBox: action('Status changed inside Task'),
        updateTaskTitle:action('Title changed inside Task'),
        delTask:action('Remove Button clicked changed inside Task')
    },
};

export default meta;

type Story = StoryObj<typeof Task>;

export const TaskStory: Story = {
    args: {
        // task: {id:'1', title:'css', isCheck:false},
    },
};
