import React, { useState } from "react";
import Select from "../../components/ui/Select";

import { languages } from "../../lib/utils/fake-data";

export default {
  title: "UI/Select",
  component: Select,
};

const Template = (args) => {
  const [language, setLanguage] = useState("");
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <Select
      {...args}
      value={language}
      label="Preferred Language"
      placeholder="Your preferred language"
      onChange={handleLanguageChange}
      options={languages}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
