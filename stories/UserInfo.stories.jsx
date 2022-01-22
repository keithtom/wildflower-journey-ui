import React from 'react';

import UserInfo from '../components/UserInfo'
const ProfileMaya = 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'

export default {
  title: 'Feature/UserInfo',
  component: UserInfo,
};

const Template = (args) => (
  <UserInfo
    {...args}
  />
)

export const Default = Template.bind({});
Default.args = {
  name: 'Maya Whalley',
  role: 'Teacher Leader',
  profileImage: ProfileMaya,
}
export const Contactable = Template.bind({});
Contactable.args = {
  name: 'Maya Whalley',
  role: 'Teacher Leader',
  profileImage: ProfileMaya,
  phoneNumber: '917-123-4567'
}
export const Large = Template.bind({});
Large.args = {
  name: 'Maya Whalley',
  role: 'Teacher Leader',
  profileImage: ProfileMaya,
  large: true
}
export const FoundationLeader = Template.bind({});
FoundationLeader.args = {
  name: 'Maya Whalley',
  role: 'Teacher Leader',
  profileImage: ProfileMaya,
  isFoundationLeader: true,
  large: false
}
