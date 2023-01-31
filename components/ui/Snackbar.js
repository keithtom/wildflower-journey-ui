import { default as MaterialSnackbar } from "@mui/material/Snackbar";
import { styled, css } from "@mui/material/styles";

import Typography from "./Typography";

const CustomSnackbar = styled(MaterialSnackbar)``;

const Alert = ({ children, open, onClose, ...props }) => {
  return (
    <CustomSnackbar open={open} onClose={onClose} {...props}>
      {children}
    </CustomSnackbar>
  );
};

export default Alert;
