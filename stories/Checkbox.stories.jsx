import React from "react";
import Checkbox from "../components/ui/Checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {};
