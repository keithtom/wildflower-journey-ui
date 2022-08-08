import { default as MaterialPaper } from "@mui/material/Paper";
import { styled, css } from "@mui/material/styles";

const CustomPaper = styled(MaterialPaper)``;

export default function Paper({ children, ...props }) {
  return <CustomPaper {...props}>{children}</CustomPaper>;
}
