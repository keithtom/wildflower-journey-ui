import React from 'react';

import SchoolProfileCard from '../components/SchoolProfileCard'
import BHMImage from '../public/assets/images/brooklyn-heights-montessori.png'

export default {
  title: 'Feature/SchoolProfileCard',
  component: SchoolProfileCard,
};

const Template = (args) => (
  <SchoolProfileCard
    {...args}
  />
)

export const Default = Template.bind({});
Default.args = {
  schoolName: 'Brooklyn Heights Montessori',
  subtitle: 'www.brooklynheightsmontessori.com',
  address: '123 Test Avenue',
  schoolLink: '/school-profile',
  schoolImage: BHMImage
}
export const Large = Template.bind({});
Large.args = {
  schoolName: 'Brooklyn Heights Montessori',
  subtitle: 'www.brooklynheightsmontessori.com',
  address: '123 Test Avenue',
  schoolLink: '/school-profile',
  schoolImage: BHMImage,
  large: true
}
