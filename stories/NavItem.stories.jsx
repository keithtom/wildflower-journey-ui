import React from 'react';

import NavItem from '../components/NavItem'

export default {
  title: 'Feature/NavItem',
  component: NavItem,
};

const Template = (args) => (
  <NavItem
    {...args}
  />
)

export const Default = Template.bind({});
Default.args = {
  route: '/',
  icon: 'layout',
  name: 'Dashboard'
}
export const Active = Template.bind({});
Active.args = {
  route: '/',
  icon: 'layout',
  name: 'Dashboard',
  active: true
}
