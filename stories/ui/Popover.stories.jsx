import React, { useState } from "react";
import Popover from "../../components/ui/Popover";
import Button from "../../components/ui/Button";

export default {
  title: "UI/Popover",
  component: Popover,
};

const Template = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="text">
        Open Popover
      </Button>
      <Popover
        {...args}
        open={open}
        anchorEl={open}
        onClose={() => setOpen(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div>Unstyled popover children</div>
      </Popover>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
