import React from 'react';

import Nav from '../components/Nav'

export default {
  title: 'Feature/Nav',
  component: Nav,
};

const Template = (args) => (
  <Nav
    {...args}
  />
)

export const Default = Template.bind({});
Default.args = {
}
