import { default as MaterialCircularProgress } from "@mui/material/CircularProgress";
import { styled, css } from "@mui/material/styles";

const CustomSpinner = styled(MaterialCircularProgress)`
  color: ${({ theme }) => theme.color.primary.main};
  background: transparent;
`;

export default function CircularIndeterminate({ ...props }) {
  return <CustomSpinner {...props} />;
}
