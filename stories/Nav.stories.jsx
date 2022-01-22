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
  user: {
    name: 'Maya Whalley',
    role: 'Teacher Leader',
    phoneNumber: '917-123-4567',
    profileRoute: '/user-profile',
    profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'
  }
}
