import { default as MaterialPopover } from "@mui/material/Popover";
import { styled, css } from "@mui/material/styles";

const CustomPopover = styled(MaterialPopover)`
  .MuiPaper-root {
    border-radius: ${({ theme }) => theme.radius.md}px;
    border: 1px solid ${({ theme }) => theme.color.neutral.main};
  }
`;

const Popover = ({ children, ...props }) => {
  return <CustomPopover {...props}>{children}</CustomPopover>;
};

export default Popover;
