import React from "react";
import Milestone from "../../components/Milestone";

export default {
  title: "Feature/Milestone",
  component: Milestone,
};

const Template = (args) => <Milestone {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Name your school",
  effort: "small",
  category: "Governance & Compliance",
  isComplete: false,
  isUpNext: false,
};
export const Complete = Template.bind({});
Complete.args = {
  title: "Name your school",
  effort: "small",
  category: "Governance & Compliance",
  isComplete: true,
  isUpNext: false,
};
export const UpNext = Template.bind({});
UpNext.args = {
  title: "Name your school",
  effort: "small",
  category: "Governance & Compliance",
  isComplete: false,
  isUpNext: true,
};
