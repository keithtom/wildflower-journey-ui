import React from "react";
import Milestone from "../../components/Milestone";
import ssj_categories from "@lib/ssj/categories"

export default {
  title: "Feature/Milestone",
  component: Milestone,
  argTypes: {
    status: {
      options: ["to do", "up next", "done"],
      control: { type: "select" },
    },
    phase: {
      options: ["Discovery", "Visioning", "Planning", "Startup"],
      control: { type: "select" },
    },
    category: {
      options: Object.values(ssj_categories),
      control: { type: "select" },
    },
    assignee: {
      control: "boolean",
    },
  },
};

const Template = (args) => <Milestone {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Name your school",
  phase: "Planning",
  category: "Governance & Compliance",
  status: "to do",
};
