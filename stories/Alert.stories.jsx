import React from 'react';
import Alert from '../components/ui/Alert'

export default {
  title: 'UI/Alert',
  component: Alert,
};

const Template = (args) => <Alert {...args} />

export const Error = Template.bind({});
Error.args = {
  severity: "error",
  children: "This is an error alert."
}
export const Warning = Template.bind({});
Warning.args = {
  severity: "warning",
  children: "This is a warning alert."
}
export const Success = Template.bind({});
Success.args = {
  severity: "success",
  children: "This is a success alert."
}
