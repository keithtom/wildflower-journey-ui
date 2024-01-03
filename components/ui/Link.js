// import { default as MaterialLink } from "@mui/material/Link";
import { styled, css } from "@mui/material/styles";

import { default as NextLink } from "next/link";

// NOTE: This is not included in storybook
const CustomLink = styled(NextLink)`
  text-decoration: none;
`;

const Link = ({ children, ...props }) => {
  return <CustomLink {...props}>{children}</CustomLink>;
};

export default Link;
