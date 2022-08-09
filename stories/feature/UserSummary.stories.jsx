import React from "react";
import UserSummary from "../../components/UserSummary";

export default {
  title: "Feature/UserSummary",
  component: UserSummary,
};

const Template = (args) => <UserSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatar: "url",
  firstName: "Maya",
  lastName: "Walley",
  roles: ["asdf"],
  skills: ["asdfasdf"],
};
