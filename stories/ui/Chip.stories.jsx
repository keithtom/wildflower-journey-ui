import React from "react";
import Chip from "../../components/ui/Chip";

export default {
  title: "UI/Chip",
  component: Chip,
  argTypes: {
    size: {
      options: ["default", "small", "large"],
      control: { type: "select" },
    },
    bgColor: {
      control: { type: "color" },
    },
  },
};

const Template = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Chip content",
};
export const Filled = Template.bind({});
Filled.args = {
  variant: "filled",
  label: "Chip content",
};
export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: "Chip content",
};
