import { default as MaterialAvatar } from "@mui/material/Avatar";
import { styled, css } from "@mui/material/styles";

const CustomAvatar = styled(MaterialAvatar)`
  width: ${({ theme }) => theme.util.buffer * 12}px;
  height: ${({ theme }) => theme.util.buffer * 12}px;

  /* mini */
  ${(props) =>
    props.size === "mini" &&
    css`
      width: ${props.theme.util.buffer * 6}px;
      height: ${props.theme.util.buffer * 6}px;
    `}

  /* sm */
  ${(props) =>
    props.size === "sm" &&
    css`
      width: ${props.theme.util.buffer * 8}px;
      height: ${props.theme.util.buffer * 8}px;
    `}

  /* md */
  ${(props) =>
    props.size === "md" &&
    css`
      width: ${props.theme.util.buffer * 12}px;
      height: ${props.theme.util.buffer * 12}px;
    `}

  /* lg */
  ${(props) =>
    props.size === "lg" &&
    css`
      width: ${props.theme.util.buffer * 32}px;
      height: ${props.theme.util.buffer * 32}px;
    `}
`;

const Avatar = ({ ...props }) => {
  return <CustomAvatar {...props} />;
};

export default Avatar;
