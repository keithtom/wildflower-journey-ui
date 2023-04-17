import { default as MaterialLink } from "@mui/material/Link";
import { styled, css } from "@mui/material/styles";

// NOTE: This is not included in storybook
const CustomLink = styled(MaterialLink)`
  text-decoration: none;
`;

const Link = ({ children, ...props }) => {
  return <CustomLink {...props}>{children}</CustomLink>;
};

export default Link;
