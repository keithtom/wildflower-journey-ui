import { default as MaterialDivider } from "@mui/material/Divider";
import { styled, css } from "@mui/material/styles";

const CustomDivider = styled(MaterialDivider)`
  border-bottom: 1px solid ${({ theme }) => theme.color.neutral.main};
`;

const Divider = ({ children, ...props }) => {
  return <CustomDivider {...props}>{children}</CustomDivider>;
};

export default Divider;
