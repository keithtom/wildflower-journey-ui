import React from 'react';

import UserProfileCard from '../components/UserProfileCard'

export default {
  title: 'Feature/UserProfileCard',
  component: UserProfileCard,
};

const Template = (args) => (
  <UserProfileCard
    {...args}
  />
)

export const Default = Template.bind({});
Default.args = {
  user: {
    name: 'Maya Whalley',
    role: 'Teacher Leader',
    profileRoute: '/user-profile',
    profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'
  }
}
export const Large = Template.bind({});
Large.args = {
  user: {
    name: 'Maya Whalley',
    role: 'Teacher Leader',
    profileRoute: '/user-profile',
    profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'
  },
  large: true
}
