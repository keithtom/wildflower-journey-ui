import { default as MaterialStack } from "@mui/material/Stack";
import { styled, css } from "@mui/material/styles";

// NOTE: This is not included in storybook

const CustomStack = styled(MaterialStack)``;

const Stack = ({ children, ...props }) => {
  return <CustomStack {...props}>{children}</CustomStack>;
};

export default Stack;
