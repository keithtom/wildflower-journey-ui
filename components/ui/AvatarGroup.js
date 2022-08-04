import { default as MaterialAvatarGroup } from "@mui/material/AvatarGroup";
import { styled, css } from "@mui/material/styles";

const CustomAvatarGroup = styled(MaterialAvatarGroup)``;

const AvatarGroup = ({ children, ...props }) => {
  return <CustomAvatarGroup {...props}>{children}</CustomAvatarGroup>;
};

export default AvatarGroup;
