import React from 'react';

import UserProfileCard from '../components/UserProfileCard'
import MayaProfile from '../public/assets/images/profile-maya.png'

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
    profileImage: MayaProfile
  }
}
export const Large = Template.bind({});
Large.args = {
  user: {
    name: 'Maya Whalley',
    role: 'Teacher Leader',
    profileImage: MayaProfile
  },
  large: true
}
