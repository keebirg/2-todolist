import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { InputAddItem } from './InputAddItem';

const meta: Meta<typeof InputAddItem> = {
    title: 'InputAddItem',
    component: InputAddItem,

    tags: ['autodocs'],

    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;

type Story = StoryObj<typeof InputAddItem>;

export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside form')
    },
};