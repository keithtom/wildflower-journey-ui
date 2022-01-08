import React from 'react';
import { Select } from '../components/ui'

export default {
  title: 'UI/Select',
  component: Select
};

const Template = (args) => (
  <>
    <div>
      <Select {...args} checkbox/>
    </div>
    <div>
      <Select {...args} radio/>
    </div>
  </>
)

export const Default = Template.bind({});
Default.args = {
}
