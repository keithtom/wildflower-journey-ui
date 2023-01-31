import { default as MaterialAlert } from "@mui/material/Alert";
import { styled, css } from "@mui/material/styles";

import Typography from "./Typography";

const CustomAlert = styled(MaterialAlert)`
  border: none;
  border-radius: ${({ theme }) => theme.radius.md}px;

  /* Error */
  ${(props) =>
    props.severity === "error" &&
    css`
      background: ${props.theme.color.error.lightest};
    `}

  /* Warning */
  ${(props) =>
    props.severity === "warning" &&
    css`
      background: ${props.theme.color.warning.lightest};
    `}

  /* Success */
  ${(props) =>
    props.severity === "success" &&
    css`
      background: ${props.theme.color.success.lightest};
    `}
`;

const Alert = ({ children, ...props }) => {
  return (
    <CustomAlert {...props}>
      <Typography
        variant="bodyRegular"
        error={props.severity === "error"}
        warning={props.severity === "warning"}
        success={props.severity === "success"}
      >
        {children}
      </Typography>
    </CustomAlert>
  );
};

export default Alert;
