import React, { useState } from "react";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

export default {
  title: "UI/Modal",
  component: Modal,
};

const Template = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button variant="text" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal {...args} open={open} toggle={() => setOpen(!open)}></Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Modal title",
  noPadding: false,
};
