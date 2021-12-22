import React from 'react';
import { Button } from '../components/ui'

export default {
  title: 'UI/Button',
  component: Button,
};

const Template = (args) => <Button {...args}>I'm a button!</Button>

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  primary: true
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};
