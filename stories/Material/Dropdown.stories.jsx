import { useState } from 'react';
import { Dropdown, DropdownItem } from '../../components/ui/Material/Dropdown'

export default {
  title: 'Material/Dropdown',
  component: Dropdown,
};

const Template = ({ args }) => {
  const [value, setValue] = useState('')

  return (
    <Dropdown
      id="numbers-label"
      value={value}
      onChange={setValue}
      placeholder="Choose a number..."
      {...args}
    >
      <DropdownItem value={1}>One</DropdownItem>
      <DropdownItem value={2}>Two</DropdownItem>
      <DropdownItem value={3}>Three</DropdownItem>
    </Dropdown>
  )
}

export const Default = Template.bind({});
// export const Disabled = Template.bind({});
// Disabled.args = {
//   disabled: true
// }
