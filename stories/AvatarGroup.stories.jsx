import React from "react";
import AvatarGroup from "../components/ui/AvatarGroup";
import Avatar from "../components/ui/Avatar";

export default {
  title: "UI/AvatarGroup",
  component: AvatarGroup,
};

const userAvatars = [
  "https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2360&q=80",
  "https://images.unsplash.com/photo-1616325629936-99a9013c29c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
];

const Template = (args) => {
  return (
    <AvatarGroup {...args}>
      {userAvatars.map((u, i) => (
        <Avatar src={u} key={i} />
      ))}
    </AvatarGroup>
  );
};

export const Default = Template.bind({});
