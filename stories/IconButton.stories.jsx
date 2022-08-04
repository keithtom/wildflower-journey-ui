import React from "react";
import IconButton from "../components/ui/IconButton";
import Icon from "../components/ui/Icon";

export default {
  title: "UI/IconButton",
  component: IconButton,
};

const Template = (args) => (
  <IconButton {...args}>
    <Icon type="moreVert" />
  </IconButton>
);

export const Default = Template.bind({});
Default.args = {};
