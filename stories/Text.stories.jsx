import React from 'react';
import { Text } from '../components/ui'

export default {
  title: 'UI/Text',
  component: Text
};

const Template = (args) => (
  <>
    <div>
      <Text {...args} title headline>Title Headline</Text>
    </div>
    <div>
      <Text {...args} title large>Title Large</Text>
    </div>
    <div>
      <Text {...args} title regular>Title Regular</Text>
    </div>
    <div>
      <Text {...args} title small>Title Small</Text>
    </div>
    <br />
    <div>
      <Text {...args} body large>Body Large</Text>
    </div>
    <div>
      <Text {...args} body regular>Body Regular</Text>
    </div>
    <div>
      <Text {...args} body small>Body Small</Text>
    </div>
    <div>
      <Text {...args} body mini>Body Mini</Text>
    </div>
  </>
)

export const Default = Template.bind({});
Default.args = {
  bold: false,
  lightened: false,
  light: false,
}
