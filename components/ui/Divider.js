import { default as MaterialDivider } from "@mui/material/Divider";
import { styled, css } from "@mui/material/styles";

const CustomDivider = styled(MaterialDivider)``;

const Divider = ({ children, ...props }) => {
  return <CustomDivider {...props}>{children}</CustomDivider>;
};

export default Divider;
