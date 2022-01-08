import React from 'react';
import { Select } from '../components/ui'

export default {
  title: 'UI/Select',
  component: Select
};

const Template = (args) => <Select {...args} />

export const Default = Template.bind({});
Default.args = {
  checkbox: true,
  radio: false,
}
