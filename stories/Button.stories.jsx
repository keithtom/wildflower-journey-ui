import React from 'react';
import { Button } from '../components/ui'

export default {
  title: 'UI/Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Button content</Button>

export const Default = Template.bind({});
export const Lightened = Template.bind({});
export const Disabled = Template.bind({});

Default.args = {
  full: false
}
Lightened.args = {
  lightened: true,
  full: false
}
Disabled.args = {
  disabled: true,
  full: false
}
