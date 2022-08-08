import React from "react";
import Button from "../components/ui/Button";

export default {
  title: "UI/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button Text",
  disabled: false,
  small: false,
  full: false,
};
export const Text = Template.bind({});
Text.args = {
  variant: "text",
  children: "Button Text",
  disabled: false,
  small: false,
  full: false,
};
export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Button Text",
  disabled: false,
  small: false,
  full: false,
};
