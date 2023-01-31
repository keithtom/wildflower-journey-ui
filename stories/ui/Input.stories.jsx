import React, { useState } from "react";
import Input from "../../components/ui/Input";

import { languages } from "../../lib/utils/fake-data";

export default {
  title: "UI/Input",
  component: Input,
};

const Template = (args) => {
  return <Input {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
