import React from 'react';
import { Icon } from '../components/ui'

export default {
  title: 'UI/Icon',
  component: Icon,
  argTypes: {
    type: {
      options: ['user', 'check'],
      control: {type: 'select'}
    },
  },
};

const Template = (args) => <Icon {...args} />

export const Default = Template.bind({});
Default.args = {
  type: 'user'
}
