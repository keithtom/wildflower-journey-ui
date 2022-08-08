import { InputBase } from "@mui/material";
import { styled, css } from "@mui/material/styles";

const StyledInput = styled(InputBase)`
  border: 1px solid ${({ theme }) => theme.color.neutral.main};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.util.buffer * 2}px
    ${({ theme }) => theme.util.buffer * 3}px;
  font-size: ${({ theme }) => theme.typography.bodyRegular.fontSize};
  min-height: ${({ theme }) => theme.util.buffer * 12}px;
`;

const Input = ({ inputRef, ...props }) => {
  return <StyledInput ref={inputRef} {...props} />;
};

export default Input;
