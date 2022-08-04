import React, { useState } from "react";
import MultiSelect from "../components/ui/MultiSelect";

export default {
  title: "UI/MultiSelect",
  component: MultiSelect,
};

const Template = (args) => {
  const userSkills = ["Governance", "Finance", "Facilities"];
  const [skills, setSkills] = useState(userSkills);
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <MultiSelect
      {...args}
      options={userSkills}
      value={skills}
      label="Skills"
      onChange={handleSkillsChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
