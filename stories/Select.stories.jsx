import React, { useState } from 'react';
import { Select } from '../components/ui'

export default {
  title: 'UI/Select',
  component: Select
};

const Template = (args) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioChecked, setRadioChecked] = useState(false)

  return (
    <>
      <div>
        <Select
          {...args}
          checkbox
          label="This is a checkbox label"
          checked={checkboxChecked}
          onClick={() => setCheckboxChecked(!checkboxChecked)}
        />
      </div>
      <div>
        <Select
          {...args}
          radio
          label="This is a radio label"
          checked={radioChecked}
          onClick={() => setRadioChecked(!radioChecked)}
        />
      </div>
    </>
  )
}

export const Default = Template.bind({});
Default.args = {
  disabled: false
}
