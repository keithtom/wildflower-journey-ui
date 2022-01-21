import React from 'react';

import UserInfo from '../components/UserInfo'
import ProfileMaya from '../public/assets/images/profile-maya.png'

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
