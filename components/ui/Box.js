import { default as MaterialBox } from "@mui/material/Box";
import { styled, css } from "@mui/material/styles";

// NOTE: This is not included in storybook

const CustomBox = styled(MaterialBox)``;

const Box = ({ children, ...props }) => {
  return <CustomBox {...props}>{children}</CustomBox>;
};

export default Box;
