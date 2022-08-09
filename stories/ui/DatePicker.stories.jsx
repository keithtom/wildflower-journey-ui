import React from "react";
import DatePicker from "../../components/ui/DatePicker";

export default {
  title: "UI/DatePicker",
  component: DatePicker,
};

const Template = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {};
