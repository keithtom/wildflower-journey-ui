import React from "react";
import Icon from "../components/ui/Icon";

export default {
  title: "UI/Icon",
  component: Icon,
  argTypes: {
    type: {
      options: [
        "chevronRight",
        "moreVert",
        "arrowForward",
        "close",
        "expandMore",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["default", "small", "large"],
      control: { type: "select" },
    },
    variant: {
      options: ["default", "primary", "lightened", "light"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {};
