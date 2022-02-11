import React from 'react';
import Button from '../../components/ui/Material/Button'

export default {
  title: 'Material/Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Click me!</Button>

export const Default = Template.bind({});
Default.args = {
  outline: false,
  primary: true
}
