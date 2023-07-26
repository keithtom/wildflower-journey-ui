import React from "react";
import { InputBase } from "@mui/material";
import { styled, css } from "@mui/material/styles";

const StyledInput = styled(InputBase)`
  border: 1px solid ${({ theme }) => theme.color.neutral.main};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.util.buffer * 2}px
    ${({ theme }) => theme.util.buffer * 3}px;
  font-size: ${({ theme }) => theme.typography.bodyRegular.fontSize};
  min-height: ${({ theme }) => theme.util.buffer * 12}px;
  margin-top: 0 !important;
  /* error */
  ${(props) =>
    props.error &&
    css`
      border: 1px solid ${props.theme.color.error.medium};
    `}
`;

const Input = React.forwardRef(({ error, ...props }, ref) => {
  return <StyledInput ref={ref} error={error} {...props} />;
});

export default Input;
