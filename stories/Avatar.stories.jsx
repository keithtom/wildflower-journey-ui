import React from 'react';
import Avatar from '../components/ui/Avatar'

export default {
  title: 'UI/Avatar',
  component: Avatar,
};

const placeholder = 'https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'

const Template = (args) => <Avatar src={placeholder} {...args} />

export const Small = Template.bind({});
Small.args = {
  size: "sm"
}
export const Medium = Template.bind({});
Medium.args = {
  size: "md"
}
export const Large = Template.bind({});
Large.args = {
  size: "lg"
}
