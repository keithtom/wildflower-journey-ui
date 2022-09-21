import React from "react";
import Milestone from "../../components/Milestone";

export default {
  title: "Feature/Milestone",
  component: Milestone,
  argTypes: {
    status: {
      options: ["to do", "up next", "done"],
      control: { type: "select" },
    },
    effort: {
      options: ["Small", "Medium", "Large"],
      control: { type: "select" },
    },
    phase: {
      options: ["Discovery", "Visioning", "Planning", "Startup"],
      control: { type: "select" },
    },
    category: {
      options: [
        "Finance",
        "Facilities",
        "Governance & Compliance",
        "Human Resources",
        "Community & Family Engagement",
        "Classroom & Program Practices",
        "Album Advice & Affiliation",
        "WF Community & Culture",
      ],
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
  effort: "small",
  phase: "Planning",
  category: "Governance & Compliance",
  status: "to do",
};
