import React from 'react';
import { Avatar } from '../components/ui'
import mayaAvatar from '../public/assets/images/profile-maya.png'

export default {
  title: 'UI/Avatar',
  component: Avatar,
};

const Template = (args) => <Avatar img={mayaAvatar} {...args} />

export const Default = Template.bind({});

export const Small = Template.bind({});
Small.args = {
  small: true
}
export const Large = Template.bind({});
Large.args = {
  large: true
}
