import { default as MaterialAvatar } from "@mui/material/Avatar";
import { styled, css } from "@mui/material/styles";

const CustomAvatar = styled(MaterialAvatar, {
  shouldForwardProp: (prop) => prop !== "hoverable",
})`
  width: ${({ theme }) => theme.util.buffer * 12}px;
  height: ${({ theme }) => theme.util.buffer * 12}px;
  background: ${({ theme }) => theme.color.neutral.lightest};

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
  /* xl */
  ${(props) =>
    props.size === "xl" &&
    css`
      width: ${props.theme.util.buffer * 64}px;
      height: ${props.theme.util.buffer * 64}px;
    `}

  /* hoverable */
  ${(props) =>
    props.hoverable &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`;

const Avatar = ({ ...props }) => {
  const fallback = "/assets/images/avatar-fallback.svg";
  return (
    <CustomAvatar {...props}>
      <img src={fallback} style={{ width: "100%" }} />
    </CustomAvatar>
  );
};

export default Avatar;
