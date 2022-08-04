import React from "react";
import Switch from "../components/ui/Switch";

export default {
  title: "UI/Switch",
  component: Switch,
};

const Template = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Switch label",
};
