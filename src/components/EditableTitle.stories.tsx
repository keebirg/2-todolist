import type {Meta, StoryObj} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {EditableTitle} from "./EditableTitle";

const meta: Meta<typeof EditableTitle> = {
    title: 'EditableTitle',
    component: EditableTitle,

    tags: ['autodocs'],

    args: {
        title:'title',
        updateTitle:action('updateTitle')
    },
};

export default meta;

type Story = StoryObj<typeof EditableTitle>;

export const EditableTitleStory: Story = {
    args: {
        //updateTitle: action('Value EditableSpan changed')
    },
};