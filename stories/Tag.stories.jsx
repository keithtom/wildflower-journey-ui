import React from 'react';
import { Tag } from '../components/ui'

export default {
  title: 'UI/Tag',
  component: Tag
};

const Template = (args) => <Tag {...args}>Tag content</Tag>

export const Default = Template.bind({});
Default.args = {}
