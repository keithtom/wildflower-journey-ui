import { default as MaterialAppBar } from "@mui/material/AppBar";
import { styled, css } from "@mui/material/styles";

const CustomAppBar = styled(MaterialAppBar, {
  shouldForwardProp: (prop) => prop !== "isAdmin" && prop !== "env",
})`
  outline: 1px solid ${({ theme }) => theme.color.neutral.main};
  border: none;
  background: white;
  margin: 0;
  position: fixed;
  height: ${({ theme }) => theme.util.appBarHeight}px;
  z-index: 2;
  padding: 0 ${({ theme }) => theme.util.buffer * 4}px;
  justify-content: center;
  display: flex;
  ${(props) =>
    props.isAdmin &&
    css`
      background: ${props.theme.color.neutral.dark};
    `}
  ${(props) =>
    props.env === "dev" &&
    css`
      background: red;
    `}
  ${(props) =>
    props.env === "STAGING" &&
    css`
      background: blue;
    `}
`;

const AppBar = ({ children, ...props }) => {
  return <CustomAppBar {...props}>{children}</CustomAppBar>;
};
export default AppBar;
