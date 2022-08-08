import React, { useState } from "react";
import TextField from "../components/ui/TextField";

export default {
  title: "UI/TextField",
  component: TextField,
};

const Template = (args) => {
  const [decisionTitle, setDecisionTitle] = useState("");
  const handleDecisionTitleChange = (event) => {
    setDecisionTitle(event.target.value);
  };
  return (
    <TextField
      {...args}
      value={decisionTitle}
      charCount={args.charLimit && decisionTitle.length}
      onChange={handleDecisionTitleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Textfield placeholder",
  label: "Textfield label",
};
export const CharacterLimit = Template.bind({});
CharacterLimit.args = {
  charLimit: 140,
  placeholder: "Textfield placeholder",
  label: "Textfield label",
};
