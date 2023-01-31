import { default as MaterialIconButton } from "@mui/material/IconButton";
import { styled, css } from "@mui/material/styles";

const CustomIconButton = styled(MaterialIconButton)``;

export default function IconButton({ children, ...props }) {
  return <CustomIconButton {...props}>{children}</CustomIconButton>;
}
