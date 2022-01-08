import React from 'react';
import { Button } from '../components/ui'

export default {
  title: 'UI/Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Button content</Button>

export const Default = Template.bind({});
Default.args = {
  full: false
}

export const Lightened = Template.bind({});
Lightened.args = {
  lightened: true,
  full: false
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  full: false
}

