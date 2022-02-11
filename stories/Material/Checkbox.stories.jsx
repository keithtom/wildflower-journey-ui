import React from 'react';
import Checkbox from '../../components/ui/Material/Checkbox'

export default {
  title: 'Material/Checkbox',
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />

export const Default = Template.bind({});
Default.args = {
  primary: false
}
