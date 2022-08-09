import React from "react";
import Card from "../components/ui/Card";

export default {
  title: "UI/Card",
  component: Card,
  argTypes: {
    size: {
      options: ["default", "small", "large"],
      control: { type: "select" },
    },
    elevated: {
      control: "boolean",
    },
    hoverable: {
      control: "boolean",
    },
    noPadding: {
      control: "boolean",
    },
  },
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Card content",
};
export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Card content",
};
export const Lightened = Template.bind({});
Lightened.args = {
  variant: "lightened",
  children: "Card content",
};
export const PrimaryLightened = Template.bind({});
PrimaryLightened.args = {
  variant: "primaryLightened",
  children: "Card content",
};
