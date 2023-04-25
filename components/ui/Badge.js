import { default as MaterialBadge } from "@mui/material/Badge";
import { styled, css } from "@mui/material/styles";

const CustomBadge = styled(MaterialBadge)``;

export default function Badge({ children, badgeContent, ...props }) {
  return (
    <CustomBadge badgeContent={badgeContent} {...props}>
      {children}
    </CustomBadge>
  );
}
