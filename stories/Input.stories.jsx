import React from 'react';
import { Input } from '../components/ui'

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    icon: {
      options: ['user', 'check'],
      control: {type: 'select'}
    },
  },
};

const Template = (args) => <Input {...args}>Input content</Input>

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder content'
}

export const WithIcon = Template.bind({});
WithIcon.args = {
  placeholder: 'Placeholder content',
  icon: 'user'
}

